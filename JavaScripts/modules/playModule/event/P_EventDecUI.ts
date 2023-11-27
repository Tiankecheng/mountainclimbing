import { GameConfig } from "../../../config/GameConfig";
import { GlobalVas } from "../../../const/GlobalDefine";
import { ClientEvents } from "../../../const/LocalEvents";
import EventDecUI_Generate from "../../../ui-generate/eventModule/EventDecUI_generate";
import GuideModule_Client from "../../commonModules/guide/GuideModule_Client";
import P_LobbyUI from "../../gameModule/P_LobbyUI";

/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:22:45
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\event\P_EventDecUI.ts
 * @Description  : 
 */
export default class P_EventDecUI extends EventDecUI_Generate {

    onStart(): void {

    }

    protected onShow(...params: any[]): void {
        let cfgId = params[0]
        this.mEventName.text = GameConfig.Event.getElement(cfgId).Name
        this.mEventDec.text = GameConfig.Event.getElement(cfgId).SecondDec
        this.mBtn.onClicked.clear()
        this.mBtn.onClicked.add(() => {
            GlobalVas.g_GameIsGuide ? ModuleService.getModule(GuideModule_Client).triggerGuide(8) : null;
            Event.dispatchToLocal(ClientEvents.Ev_TrrigerEvent, cfgId)
            mw.UIService.hide(P_EventDecUI)
        })
    }

    protected onHide(): void {
        GlobalVas.g_GameIsGuide = false
        Player.localPlayer.character.movementEnabled = true
        mw.UIService.show(P_LobbyUI)
    }
}
