/**
 * @Author       : 田可成
 * @Date         : 2022-10-31 10:11:50
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-29 13:59:29
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\gm\GMManager.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import { ClientEvents } from "../../../const/LocalEvents";
import { UIGM } from "../../../ui/UIGM";
import { EventManager_C } from "../../playModule/event/EventManager_C";
import { PlayModule_Client } from "../../playModule/PlayModule_Client";
import { BagModule_Clinet } from "../bagModule/BagModule_Clinet";

export class GMManager {
    private static _instance: GMManager

    public static get instance() {
        if (!this._instance)
            this._instance = new GMManager();
        return this._instance;
    }
    isShow: boolean = false

    show() {
        if (this.isShow) {
            AddGMCommand("增加道具", (player: mw.Player, value: string) => {
                ModuleService.getModule(BagModule_Clinet).addItemByCfg(Number(value))
            });
            AddGMCommand("触发事件", (player: mw.Player, value: string) => {
                EventManager_C.instance.executeEvent(Number(value), "1", 1)
            });
            AddGMCommand("控制体力", (player: mw.Player, value: string) => {
                ModuleService.getModule(PlayModule_Client).climber.property.stamina += Number(value);
                ModuleService.getModule(PlayModule_Client).refreshUI();
            });
            AddGMCommand("控制血量", (player: mw.Player, value: string) => {
                ModuleService.getModule(PlayModule_Client).climber.property.hp += Number(value);
                ModuleService.getModule(PlayModule_Client).refreshUI();
            });
            AddGMCommand("重生到营地", (player: mw.Player, value: string) => {
                Event.dispatchToLocal(ClientEvents.Ev_ReturnCamp)
            });
            AddGMCommand("重生到篝火处", (player: mw.Player, value: string) => {
                Event.dispatchToLocal(ClientEvents.Ev_ReturnBornPoint)
            });
            AddGMCommand("重置游戏", (player: mw.Player, value: string) => {
                Event.dispatchToLocal(ClientEvents.EV_ResetGame)
            });
            AddGMCommand("传送到存档点", (player: mw.Player, value: string) => {
                Event.dispatchToLocal(ClientEvents.EV_Portal, Number(value))
            });

            new UIGM().show()
            let ui = new UIGM()
            ui.show()
        }
    }
}