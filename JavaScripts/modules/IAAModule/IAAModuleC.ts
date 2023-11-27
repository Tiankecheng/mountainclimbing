import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
/**
 * @Author       : 田可成
 * @Date         : 2022-12-27 10:08:32
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:39:03
 * @FilePath     : \ilovethemountains\JavaScripts\modules\IAAModule\IAAModuleC.ts
 * @Description  : 
 */
import { GlobalVas } from "../../const/GlobalDefine";
import { ClientEvents } from "../../const/LocalEvents";
import Tips from "../../ui/Tips";
import { Utils } from "../../util/Utils";
import { BagModule_Clinet } from "../commonModules/bagModule/BagModule_Clinet";
import P_LobbyUI from "../gameModule/P_LobbyUI";
import { PlayModule_Client } from "../playModule/PlayModule_Client";
import { AdvUI } from "./AdvUI";
import IAADataInfo, { IAAPos } from "./IAAData";
import { IAAModuleS } from "./IAAModuleS";

export class IAAModuleC extends ModuleC<IAAModuleS, IAADataInfo>{
    /**广告经过时间 */
    private _adsTime: number = 0;
    /**关卡死亡次数 */
    private _actorDeathCount: number = 0

    onStart(): void {

        mw.UIService.getUI(P_LobbyUI).mAdv.visibility = mw.SlateVisibility.Visible
        mw.UIService.getUI(P_LobbyUI).mAdv.onClicked.add(() => {
            mw.UIService.show(AdvUI, IAAPos.Item, ModuleService.getModule(PlayModule_Client).climber.savePointID + 23)
        })

        Event.addLocalListener(ClientEvents.EV_RefreshSavePoint, () => {
            this._actorDeathCount = 0
        })

        Event.addLocalListener(ClientEvents.Ev_DeathToBornPoint, (savePointID) => {
            this._actorDeathCount++
            if (this._actorDeathCount >= GlobalVas.FlyAdsDeathCount) {
                this._actorDeathCount = 0
                setTimeout(() => {
                    mw.UIService.show(AdvUI, IAAPos.Fly, savePointID)
                }, 2500);
            }
        })

        Event.addLocalListener(ClientEvents.EV_EnterGuide, () => {
            mw.UIService.getUI(P_LobbyUI).mAdv.visibility = mw.SlateVisibility.Collapsed
        })

        Event.addLocalListener(ClientEvents.EV_ExitGuide, () => {
            mw.UIService.getUI(P_LobbyUI).mAdv.visibility = mw.SlateVisibility.Visible
        })
        this.resetData()
    }

    /**
     * @description: 播放插入广告
     * @return {*}
     */
    public net_ShowInterstitialAd() {
        if (!mw.AdsService.isActive(mw.AdsType.Interstitial)) return
        mw.AdsService.isReady(mw.AdsType.Interstitial, isReady => {
            if (isReady) {
                GeneralManager.modifyShowAd(mw.AdsType.Interstitial, isSuccess => {
                    if (isSuccess == mw.AdsState.Fail) {
                        GlobalVas.g_AdsIsStart = true
                        this._adsTime = 0
                    } else if (isSuccess == mw.AdsState.Close) {
                        GlobalVas.g_AdsIsStart = true
                        this._adsTime = 0
                    }
                });
            } else {
                GlobalVas.g_AdsIsStart = true
                this._adsTime = 0
            }
        });
    }

    /**
    * 播放激励广告
    * @param pos 
    */
    public net_ShowRewardAd(pos: IAAPos, ownData?: { [key: string]: number | string }) {
        if (!mw.AdsService.isActive(mw.AdsType.Reward)) return
        if (this.data.hasCount(pos) > 0) {
            mw.AdsService.isReady(mw.AdsType.Reward, isReady => {
                if (isReady) {
                    GeneralManager.modifyShowAd(mw.AdsType.Reward, state => {
                        if (state == mw.AdsState.Reward) {
                            console.log("广告播放成功！！！")
                            this.onRewardAdSuccess(pos, ownData);
                        } else if (state == mw.AdsState.Fail) {
                            console.log("播放广告失败")
                            this.onRewardAdFail(pos);
                            // TipsUI.show(globalLanguage.getLanguage(LanguageIndex.广告播放失败));
                        }
                    });
                } else {
                    console.log("广告还没准备好")
                }
            });
        } else {
            console.log("次数不足")
            // TipsUI.show(globalLanguage.getLanguage(LanguageIndex.已达到今日上限));
        }
    }

    private onRewardAdSuccess = (pos: IAAPos, ownData?: { [key: string]: number | string }) => {
        this.server.net_onPlaySuccess(pos, ownData);
        switch (pos) {
            case IAAPos.Fly:
                Tips.show("我会飞了！");
                Utils.uploadMGS("ts_action_ad", "飞行激励播放完成", { ad_type: 999000000, result: "successfly" });
                this.localPlayer.character.switchToFlying()
                mw.UIService.getUI(P_LobbyUI).startCountDown(GlobalVas.FlyTime)
                break;
            case IAAPos.Item:
                Utils.uploadMGS("ts_action_ad", "常驻激励播放完成", { ad_type: 999000001, result: "success" });
                ModuleService.getModule(BagModule_Clinet).addItemByCfg(0)
                break;

        }
    }

    private onRewardAdFail = (pos: IAAPos) => {
        switch (pos) {
            case IAAPos.Fly:
                Utils.uploadMGS("ts_action_ad", "飞行激励未播放完成", { ad_type: 999000000, result: "failfly" });
                break;
            case IAAPos.Item:
                Utils.uploadMGS("ts_action_ad", "常驻激励未播放完成", { ad_type: 999000001, result: "fail" });
                break;
        }
    }

    private resetData() {
        this.server.net_resetDate();
    }

    onUpdate(dt: number): void {
        if (!GlobalVas.g_AdsIsStart) return
        this._adsTime += dt;
        let countDown = this._adsTime + ModuleService.getModule(PlayModule_Client).climber.savePointID * GlobalVas.AdsLevelTime
        if (countDown > GlobalVas.AdsTime) {
            GlobalVas.g_AdsIsStart = false
            this.net_ShowInterstitialAd()
        }
    }
}