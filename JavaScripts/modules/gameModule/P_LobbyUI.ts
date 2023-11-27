import ScoreMgr from "../../Prefabs/PlayerScore/Script/ScoreMgr";
import { GameConfig } from "../../config/GameConfig";
import { globalLanguage, LanguageIndex } from "../../const/GlobleLanguage";
import { ClientEvents } from "../../const/LocalEvents";
import Lobby_Generate from "../../ui-generate/game/Lobby_generate";
import RankingItem_Generate from "../../ui-generate/game/RankingItem_generate";
import { P_SetUp_UI } from "../../ui/P_SetUpUI";
import { Utils } from "../../util/Utils";
import { P_BagMain } from "../commonModules/bagModule/P_Bag";
import { FacadModuleC } from "../commonModules/dress/FacadModule";
import { GameData } from "./GameData";

export default class P_LobbyUI extends Lobby_Generate {

    onStart() {
        DataCenterC.getData(GameData).OnGoldNumChange.add((goldnum: number) => this.mGoldCnt.text = goldnum.toString())

        this.mJumpBtn.onPressed.add(() => {
            Utils.playSound(19)
            let player = Player.localPlayer;
            player.character.jump();
            Utils.uploadMGS("ts_action_click", "玩家点击跳跃按钮", { button: "jump" });
        })

        this.shopBtn.onClicked.add(() => {
            Utils.playSound(16)
            ModuleService.getModule(FacadModuleC).openFacad();
            Utils.uploadMGS("ts_action_click", "点击商店入口按钮", { button: "shop" });
        });

        this.mEmergency.onClicked.add(() => {
            Utils.playSound(16)
            Event.dispatchToLocal(ClientEvents.Ev_ReturnBornPoint);
            Utils.uploadMGS("ts_action_click", "玩家点击重生按钮", { button: "back" });

        })

        this.mSetUp.onClicked.add(() => {
            Utils.playSound(16)
            mw.UIService.show(P_SetUp_UI)
            mw.UIService.hide(P_BagMain)
            this.visible = false
        });
        this.registerEvents();
    }

    private registerEvents(): void {
        Event.addLocalListener(ClientEvents.Ev_RefreshRank_Client, () => this.refreshRank());
        Event.addLocalListener(ClientEvents.Ev_RefreshProperty, (param: any[]) => {
            let prePercent = this.hpProgressBar.percent
            this.strProgressBar.percent = (param[0] / GameConfig.PlayerConfig.getElement(1).MaxStamina);
            this.hpProgressBar.percent = (param[1] / GameConfig.PlayerConfig.getElement(1).MaxHP);

            let strTxt: string = param[0] == 100 ? param[0].toFixed(0) : param[0].toFixed(1);
            let hpTxt: string = param[1] == 100 ? param[1].toFixed(0) : param[1].toFixed(1);

            this.strTxt.text = (strTxt + "/" + GameConfig.PlayerConfig.getElement(1).MaxStamina.toString());
            this.hpTxt.text = (hpTxt + "/" + GameConfig.PlayerConfig.getElement(1).MaxHP.toString());

            let aftPercent = this.hpProgressBar.percent
            if (aftPercent < prePercent) {
                this.onHurt();
            }
        });
        Event.addLocalListener(ClientEvents.EV_ResetGame, () => {
            this.mEmergency.onClicked.clear();
            this.mCSTXT.text = globalLanguage.getLanguage("Setup_Title_text_2")
            this.mEmergency.onClicked.add(() => {
                Utils.playSound(16)
                Event.dispatchToLocal(ClientEvents.Ev_ReturnBornPoint)
            })
        });
        Event.addLocalListener(ClientEvents.EV_ClearGame, () => {
            this.mEmergency.onClicked.clear();
            this.mCSTXT.text = globalLanguage.getLanguage(LanguageIndex.返回大本营)
            this.mEmergency.onClicked.add(() => {
                Utils.playSound(16)
                Event.dispatchToLocal(ClientEvents.Ev_ReturnCamp);
                Event.dispatchToLocal(ClientEvents.EV_ResetGame);
            })
        });
        Event.addLocalListener(ClientEvents.EV_EnterGuide, () => {
            this.mRankPanel.visibility = mw.SlateVisibility.Collapsed
            this.mSetUp.visibility = mw.SlateVisibility.Collapsed
            this.mSZTxt.visibility = mw.SlateVisibility.Collapsed
            this.mCSTXT.visibility = mw.SlateVisibility.Collapsed
            this.mCSTXT_1.visibility = mw.SlateVisibility.Collapsed
            this.mEmergency.visibility = mw.SlateVisibility.Collapsed
            this.shopBtn.visibility = mw.SlateVisibility.Collapsed
        })

        Event.addLocalListener(ClientEvents.EV_ExitGuide, () => {
            this.mRankPanel.visibility = mw.SlateVisibility.Visible
            this.mSetUp.visibility = mw.SlateVisibility.Visible
            this.mSZTxt.visibility = mw.SlateVisibility.Visible
            this.mCSTXT.visibility = mw.SlateVisibility.Visible
            this.mCSTXT_1.visibility = mw.SlateVisibility.Visible
            this.mEmergency.visibility = mw.SlateVisibility.Visible
            this.shopBtn.visibility = mw.SlateVisibility.Visible
        })

    }

    protected onShow(): void {
        Player.localPlayer.character.movementEnabled = true
        this.mVirtualJoystick.resetJoyStick()
        this.mGoldCnt.text = DataCenterC.getData(GameData).GetGoldNum().toString()
    }

    private scoreItemArr: RankingItem_Generate[] = new Array<RankingItem_Generate>();

    private refreshRank() {
        let srcPool = ScoreMgr.instance.srcPool;
        srcPool.sort((a, b) => {
            if (a.topCount == b.topCount) {
                return b.savePoint - a.savePoint
            } else {
                return b.topCount - a.topCount
            }
        });

        let count = 0;
        srcPool.forEach(src => {
            if (src.pid > 0) {
                // MAKER: 动态创建积分榜单元格并添加为排行榜画布子组件
                count++;
                let item: RankingItem_Generate;
                if (this.scoreItemArr.length >= count) {
                    item = this.scoreItemArr[count - 1];
                }
                else {
                    item = mw.UIService.create(RankingItem_Generate)
                    this.scoreItemArr.push(item);
                    this.rankCanvas.addChild(item.uiObject);
                    item.uiObject.size = itemSize
                }

                item.rankTxt.text = count.toString()
                item.nameTxt.text = src.nickName
                item.scoreTxt.text = src.savePoint.toString()
                item.numberTxt.text = src.topCount.toString()
                item.heightTxt.text = src.height.toFixed(2) + "m"

                if (item.uiObject.visibility == mw.SlateVisibility.Collapsed)
                    item.uiObject.visibility = mw.SlateVisibility.HitTestInvisible

                if (src.pid == Player.localPlayer.playerId) {
                    item.nameTxt.setFontColorByHex("2F2484FF")
                    item.rankTxt.fontColor = new mw.LinearColor(1, 1, 0)
                    item.scoreTxt.fontColor = new mw.LinearColor(1, 1, 0)
                    item.numberTxt.fontColor = new mw.LinearColor(1, 1, 0)
                    item.heightTxt.fontColor = new mw.LinearColor(1, 1, 0)

                } else {
                    item.rankTxt.fontColor = new mw.LinearColor(1, 1, 1)
                    item.nameTxt.fontColor = new mw.LinearColor(1, 1, 1)
                    item.scoreTxt.fontColor = new mw.LinearColor(1, 1, 1)
                    item.numberTxt.fontColor = new mw.LinearColor(1, 1, 1)
                    item.heightTxt.fontColor = new mw.LinearColor(1, 1, 1)
                }
            }
        });

        for (let i = count; i < this.scoreItemArr.length; i++) {
            this.scoreItemArr[i].uiObject.visibility = mw.SlateVisibility.Collapsed
        }

        this.rankCanvas.position = mw.Vector2.zero
        this.rankCanvas.size = new mw.Vector2(600, 40 * count + (count - 1) * 10)
    }

    public onHurt() {
        this.mHurt.renderOpacity = 0
        new mw.Tween({ a: 0 }).to({ a: 1 }, 200).onUpdate(v => {
            this.mHurt.renderOpacity = v.a
        }).onComplete(() => {
            new mw.Tween({ a: 1 }).to({ a: 0 }, 200).onUpdate(v => {
                this.mHurt.renderOpacity = v.a
            }).start()
        }).start()

    }

    private _countDown: number
    public startCountDown(countDown: number) {
        this._countDown = countDown
        this.canUpdate = true
        this.mFlyTime.visibility = mw.SlateVisibility.SelfHitTestInvisible
        this.mFlyTime.text = "飞行模式倒计时：" + this._countDown.toFixed(0)
    }

    protected onHide(): void {
        Player.localPlayer.character.movementEnabled = false
        this.mVirtualJoystick.resetJoyStick()
    }

    protected onUpdate(dt: number) {
        if (dt >= 0.1) return;
        this._countDown -= dt;
        if (this._countDown <= 0) {
            Player.localPlayer.character.switchToWalking()
            this.mFlyTime.visibility = mw.SlateVisibility.Collapsed
            this.canUpdate = false
        } else {
            this.mFlyTime.text = "飞行模式倒计时：" + this._countDown.toFixed(0)
        }
    }
}
const itemSize = new mw.Vector2(600, 40);