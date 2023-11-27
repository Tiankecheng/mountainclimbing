import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import { GameConfig } from "../../../config/GameConfig"
import { EmEvent } from "../../../const/GlobalEnum"
import { ClientEvents } from "../../../const/LocalEvents"
import { scheduler } from "../../../util/Scheduler"
import { BagModule_Clinet } from "../../commonModules/bagModule/BagModule_Clinet"
import { GameModule_Client } from "../../gameModule/GameModule_Client"
import { PlayModule_Client } from "../PlayModule_Client"

/**
 * @Author       : 田可成
 * @Date         : 2022-08-21 03:34:09
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-28 18:52:35
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\actor\Property.ts
 * @Description  : 
 */
export default class Property {
    /**体力 */
    private _stamina: number
    set stamina(stamina: number) {
        if (stamina > 0) {
            if (stamina < GameConfig.PlayerConfig.getElement(1).MaxStamina && stamina > this._stamina)
                GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Effect.getElement(1).ResGUID, Player.localPlayer, mw.HumanoidSlotType.Root, 1)
            this._stamina = Math.min(stamina, GameConfig.PlayerConfig.getElement(1).MaxStamina)
        }
        else {
            this._stamina = Math.max(stamina, 0)
            this.hp -= GameConfig.PlayerConfig.getElement(1).hpDown
        }
    }
    get stamina() {
        return this._stamina;
    }
    /**血量 */
    private _hp: number
    set hp(hp: number) {
        if (hp > 0) {
            this._hp = Math.min(hp, GameConfig.PlayerConfig.getElement(1).MaxHP)
        }
        else {
            this._hp = Math.max(hp, 0)
            this.life -= 1;
        }
    }
    get hp() {
        return this._hp;
    }
    /**生命值 */
    private _life: number
    set life(life: number) {
        if (life > 0) {
            this._life = Math.min(life, GameConfig.PlayerConfig.getElement(1).MaxLife)
        }
        else {
            Event.dispatchToLocal(ClientEvents.Ev_DeathToCamp)
        }
    }
    get life() {
        return this._life;
    }
    /**持续性事件 */
    event: Map<number, EmEvent> = new Map()
    /**游玩时长 */
    playTime: number
    /**持续恢复/减少体力Buff */
    staminaBuff: number = 0

    constructor() {
        this.playTime = 0
        this._stamina = GameConfig.PlayerConfig.getElement(1).MaxStamina
        this._hp = GameConfig.PlayerConfig.getElement(1).MaxHP
        this._life = GameConfig.PlayerConfig.getElement(1).MaxLife
    }

    /**计算Buff附加属性 */
    applyBuff(BuffID: number[], value?: number[]) {
        for (let i = 0; i < BuffID.length; i++) {
            if (BuffID[i] == 0) continue;
            let cfg = GameConfig.Buff.getElement(BuffID[i]);
            let buffType = cfg.EffectType
            if (buffType == BuffType.RealtimeBuff) {
                switch (cfg.ID) {
                    case 1:
                        this.stamina += value[i]
                        break;
                    case 2:
                        GeneralManager.rpcPlayEffectOnPlayer(GameConfig.Effect.getElement(2).ResGUID, Player.localPlayer, mw.HumanoidSlotType.Root, 1)
                        this.hp += value[i]
                        break;
                    case 3:
                        this.life += value[i]
                        break;
                    case 4:
                        ModuleService.getModule(GameModule_Client).addGold(value[i]);
                        break;
                }
            }
            if (buffType == BuffType.ContinuityBuff) {
                switch (cfg.ID) {
                    case 5:
                        this.staminaBuff = value[i]
                        scheduler.timeStart(() => {
                            this.staminaBuff = 0
                        }, value[i + 1])
                        break;
                    case 6:
                        // this.stamina += value[i]
                        break;
                }
            }
            if (buffType == BuffType.EventBuff) {
                switch (cfg.ID) {
                    case 7:
                        Event.dispatchToLocal(ClientEvents.Ev_ReturnBornPoint)
                        break;
                    case 8:
                        Event.dispatchToLocal(ClientEvents.Ev_ReturnCamp)
                        break;
                    case 9:
                        ModuleService.getModule(BagModule_Clinet).addItemByCfg(value[i])
                        break;
                    case 10:
                        ModuleService.getModule(BagModule_Clinet).deleteItemByNum(value[i])
                        break;
                }
            }
        }
        ModuleService.getModule(PlayModule_Client).refreshUI();
    }

    reset() {
        this.playTime = 0
        this._stamina = GameConfig.PlayerConfig.getElement(1).MaxStamina
        this._hp = GameConfig.PlayerConfig.getElement(1).MaxHP
        this._life = GameConfig.PlayerConfig.getElement(1).MaxLife
        this.event.clear()
    }
}

export enum BuffType {
    /**即时性buff */
    RealtimeBuff = 1,
    /**持续性buff */
    ContinuityBuff,
    /**事件性buff */
    EventBuff,
}