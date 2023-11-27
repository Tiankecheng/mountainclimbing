import { SavePointEvent } from "../../Prefabs/Bonfire/Script/SavePoint"
import { IClimbHeightElement } from "../../config/ClimbHeight"
import { IFallHeightElement } from "../../config/FallHeight"
import { GameConfig } from "../../config/GameConfig"
import { GlobalVas } from "../../const/GlobalDefine"
import { EmEvent } from "../../const/GlobalEnum"
import { globalLanguage, LanguageIndex } from "../../const/GlobleLanguage"
import { ClientEvents } from "../../const/LocalEvents"
import DeathTip_Generate from "../../ui-generate/game/DeathTip_generate"
import Tips from "../../ui/Tips"
import { scheduler } from "../../util/Scheduler"
import { Utils } from "../../util/Utils"
import { BagModule_Clinet } from "../commonModules/bagModule/BagModule_Clinet"
import { P_BagMain } from "../commonModules/bagModule/P_Bag"
import { GameModule_Client } from "../gameModule/GameModule_Client"
import { Climber } from "./actor/Climber"
import { EventManager_C } from "./event/EventManager_C"
import { PlayData } from "./PlayData"
import { PlayModule_Server } from "./PlayModule_Server"

export class PlayModule_Client extends ModuleC<PlayModule_Server, PlayData>{
    /**登山者属性 */
    public climber: Climber
    private _fallHeightCfg: IFallHeightElement[] = []
    private _climbHeightCfg: IClimbHeightElement[] = []
    onStart(): void {
        Player.asyncGetLocalPlayer().then((player) => {
            player.character.collisionWithOtherCharacterEnabled = false
            this.climber = new Climber(player);
            this.climber.init()
        })
        this.eventInit();
        this._fallHeightCfg = GameConfig.FallHeight.getAllElement();
        this._climbHeightCfg = GameConfig.ClimbHeight.getAllElement();
    }

    eventInit() {
        Event.addLocalListener(ClientEvents.Ev_ReturnBornPoint, () => {
            this.server.net_PlayerReborn(GlobalVas.bornFirePoint)
            this.refreshUI();
        })

        Event.addLocalListener(ClientEvents.Ev_ReturnCamp, () => {
            this.server.net_PlayerReborn(GlobalVas.bornPoint)
            this.refreshUI();
        })

        Event.addLocalListener(ClientEvents.Ev_DeathToBornPoint, () => {
            Utils.playSound(12);
            this.climber.onFall();
            this.originZ = GlobalVas.bornFirePoint.clone()
            scheduler.timeStart(async () => {
                Utils.playSound(17);
                this.server.net_PlayerReborn(GlobalVas.bornFirePoint)
                await Utils.waitForSeconds(0.5)
                this.climber.onReturn();
                this.refreshUI();
            }, 2)
        })

        Event.addLocalListener(ClientEvents.Ev_DeathToCamp, () => {
            Utils.playSound(12);
            this.climber.onDead();
            this.originZ = GlobalVas.bornPoint.clone()
            let deathtip = mw.UIService.show(DeathTip_Generate)
            mw.UIService.hide(P_BagMain)
            deathtip.mBtn.onClicked.clear()
            deathtip.mBtn.onClicked.add(async () => {
                Utils.playSound(17);
                this.server.net_PlayerReborn(GlobalVas.bornPoint)
                this.climber.rebirthCount++;
                Utils.uploadMGS("ts_action_dead", "玩家爱心到0，在初始营地重生时", { rebirth_num: this.climber.rebirthCount });
                Event.dispatchToLocal(ClientEvents.EV_ResetGame)
                mw.UIService.hideUI(deathtip)
                ModuleService.getModule(BagModule_Clinet).openBag()
                await Utils.waitForSeconds(0.5)
                this.climber.onPlay();
                this.refreshUI();
            })
        })

        Event.addLocalListener(SavePointEvent.SP_EnterSavePoint, (params: any) => {
            let savePointID = params[0]
            let gold = params[1]
            this.enterSavePoint(savePointID)
            GlobalVas.bornFirePoint = params[2];
            if (this.climber.savePointID < savePointID) {
                Utils.uploadMGS("ts_game_over", "玩家进入存档点时", { scene_id: savePointID });
                Event.dispatchToLocal(ClientEvents.EV_RefreshSavePoint)
                this.server.net_RefreshSavePoint(savePointID);
                Tips.show(globalLanguage.getLanguage(LanguageIndex["进入休息区，存档点已更新"]));
                this.climber.savePointID = savePointID
                Utils.playSound(14)
                //额外补给事件
                this.climber.property.hp += this.climber.property.event.has(43) ? GameConfig.Event.getElement(43).EffectNum[0] : 0
                if (gold != 0) {
                    if (savePointID == 23) {
                        console.log("savePointID + " + savePointID);
                        Tips.show(globalLanguage.getLanguage(LanguageIndex["恭喜你！登顶成功！"]))
                        this.server.net_AddTopCount();
                        gold += this.climber.property.event.has(44) ? GameConfig.Event.getElement(44).EffectNum[0] : 0
                    }
                    let str = Utils.formatString(globalLanguage.getLanguage(LanguageIndex["增加{0}金币"]), gold)
                    Tips.show(str);
                    ModuleService.getModule(GameModule_Client).addGold(gold);
                }
            }
        });

        Event.addLocalListener(ClientEvents.Ev_UseItem, (cfgId: number) => {
            let item = GameConfig.Items.getElement(cfgId);
            //前六个音效刚好对应Items表
            Utils.playSound(item.ID);
            Utils.uploadMGS("ts_action_use_item", "玩家使用物品" + cfgId + "时", { item_id: cfgId });

            //自救良方事件
            this.climber.property.hp += this.climber.property.event.has(45) ? GameConfig.Event.getElement(45).EffectNum[0] : 0
            //便携式加热器事件
            this.climber.property.stamina += this.climber.property.event.has(46) ? GameConfig.Event.getElement(46).EffectNum[0] : 0
            this.climber.property.applyBuff(item.BuffID, item.EffectNum)
        })

        Event.addLocalListener(ClientEvents.Ev_TrrigerEvent, (cfgId: number) => {
            let event = GameConfig.Event.getElement(cfgId)
            if (event.EventType == 1 || event.EventType == 2) {
                this.climber.property.applyBuff(event.BuffID, event.EffectNum)
            }
            if (event.EventType == 3) {
                EventManager_C.instance.eventBuff.push(event.ID)
                this.climber.property.event.set(event.ID, event.ID)
                if (event.ID == 41) this.climber.property.event.set(41, EmEvent.LightTravel)//Done
                if (event.ID == 42) this.climber.property.event.set(42, EmEvent.SafeHelmet) //Done
                if (event.ID == 43) this.climber.property.event.set(43, EmEvent.ExtraSupply)//Done
                if (event.ID == 44) this.climber.property.event.set(44, EmEvent.BountyHunter)//Done
                if (event.ID == 45) this.climber.property.event.set(45, EmEvent.SaveOneself)//Done
                if (event.ID == 46) this.climber.property.event.set(46, EmEvent.PortableHeater) //Done
            }
        })
        Event.addLocalListener(ClientEvents.EV_EnterGuide, () => { GlobalVas.g_GameIsGuide = true; })
        Event.addLocalListener(ClientEvents.EV_ExitGuide, () => { GlobalVas.g_GameIsGuide = false; })
        Event.addLocalListener(ClientEvents.EV_ResetGame, () => {
            mw.SoundService.stopBGM()
            EventManager_C.instance.resetEventObj();
            this.climber.init()
            this.server.net_RefreshSavePoint(1);
            if (ModuleService.getModule(BagModule_Clinet).getItemCnt(7) == 0) ModuleService.getModule(BagModule_Clinet).addItemByCfg(7)
        })
    }

    /**
     * @description: 进入存档点
     * @param {number} savePointID
     * @return {*}
     */
    enterSavePoint(savePointID: number) {

        if (savePointID >= GlobalVas.NoAdsLevel) GlobalVas.g_AdsIsStart = true
        if (savePointID == 4 || savePointID == 11 || savePointID == 16 || savePointID == 6 || savePointID == 13) {
            Utils.playSound(10)
        }
        if (savePointID == 1) {
            Utils.playSound(7)
            Utils.uploadMGS("ts_coregameplay_start", "玩家进入初始营地时", {});
        }
        if (savePointID == 2) {
            Utils.uploadMGS("ts_coregameplay_end", "玩家进入初始营地之外的任意营地存档时", {});
        }
        if (savePointID == 6) {
            Utils.uploadMGS("ts_game_over", "玩家到达第一座山时打点,时长=" + Math.floor((Date.now() - this.climber.timer) / 1000), { round_length: 1 });
            this.climber.timer = Date.now()
        }
        if (savePointID == 16) {
            Utils.uploadMGS("ts_game_over", "玩家到达第二座山时打点,时长=" + Math.floor((Date.now() - this.climber.timer) / 1000), { round_length: 2 });
            this.climber.timer = Date.now()
        }
        if (savePointID == 21) {
            mw.SoundService.playBGM(GameConfig.Audio.getElement(11).ResGUID)
        }
        if (savePointID == 23) {
            mw.SoundService.playBGM(GameConfig.Audio.getElement(21).ResGUID)
            Utils.uploadMGS("ts_game_over", "玩家登顶时打点,时长=" + Math.floor((Date.now() - this.climber.timer) / 1000), { round_length: 3 });
            this.climber.timer = Date.now()
            Event.dispatchToLocal(ClientEvents.EV_ClearGame)
        }
    }

    public playerReborn(bornPoint: mw.Vector) {
        this.server.net_PlayerReborn(bornPoint);
    }

    refreshUI(dropDown: number = 0) {
        Event.dispatchToLocal(ClientEvents.Ev_RefreshProperty, [this.climber.property.stamina, this.climber.property.hp, this.climber.property.life, dropDown])
    }

    checkProperty(itemId: number) {
        let item = GameConfig.Items.getElement(itemId)
        for (let i = 0; i < item.BuffID.length; i++) {
            if (item.EffectNum[i] < 0) {
                //TODO:加无法使用的提示
                if (item.BuffID[i] == 1 && this.climber.property.stamina + item.EffectNum[i] < 0) return false;
                if (item.BuffID[i] == 2 && this.climber.property.hp + item.EffectNum[i] < 0) return false;
                if (item.BuffID[i] == 3 && this.climber.property.life + item.EffectNum[i] < 0) return false;
            }
        }
        return true
    }

    climbTime: number = 0
    bagStamina: number = 0
    staminaDown: number = 0
    originZ: mw.Vector = null;
    onUpdate(dt: number): void {
        if (GlobalVas.g_GameIsGuide || this.climber.dead || !GlobalVas.g_GameIsStart) return;
        this.climbTime += dt;
        if (this.climbTime >= GameConfig.PlayerConfig.getElement(1).climbTime) {
            this.staminaDown = 0
            for (let i = this._climbHeightCfg.length - 1; i >= 0; i--) {
                if (this.climber.character.worldTransform.position.z >= this._climbHeightCfg[i].height) {
                    this.staminaDown = this._climbHeightCfg[i].staminaDown;
                    break;
                }
            }
            this.climbTime = 0;
            if (GlobalVas.isInArea) {
                //轻装上阵
                this.climber.property.stamina -= this.staminaDown - (this.climber.property.event.has(41) ? this.bagStamina : 0) + this.climber.property.staminaBuff;
            } else {
                this.climber.property.stamina += GlobalVas.staminaRevert
            }
            this.refreshUI();
        }
        if (this.climber.character.isJumping && !this.originZ) {
            this.originZ = new mw.Vector(this.climber.character.worldTransform.position.x, this.climber.character.worldTransform.position.y, this.climber.character.worldTransform.position.z)
        }
        if (!this.climber.character.isJumping && this.originZ) {
            const dropDownZ = this.originZ.z - this.climber.character.worldTransform.position.z
            for (let i = this._fallHeightCfg.length - 1; i >= 0; i--) {
                if (dropDownZ >= this._fallHeightCfg[i].height) {
                    Utils.playSound(13);
                    //安全头盔事件
                    const hpDown = this._fallHeightCfg[i].hpDown - (this.climber.property.event.has(42) ? GameConfig.Event.getElement(42).EffectNum[0] : 0);
                    this.climber.property.hp -= hpDown
                    this.refreshUI(dropDownZ);
                    break;
                }
            }
            this.originZ = null;
        }
        if (this.originZ) {
            if (this.originZ.z - this.climber.character.worldTransform.position.z >= GameConfig.PlayerConfig.getElement(1).HeightDie) {
                if (this.climber.property.hp - GameConfig.PlayerConfig.getElement(1).HeightDown > 0)
                    Event.dispatchToLocal(ClientEvents.Ev_DeathToBornPoint, this.climber.savePointID)
                this.climber.property.hp -= GameConfig.PlayerConfig.getElement(1).HeightDown
                this.refreshUI();
                this.originZ = null;
            }
        }
    }
}