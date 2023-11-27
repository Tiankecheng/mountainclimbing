import { GameConfig } from "../../../config/GameConfig";
import { GlobalVas } from "../../../const/GlobalDefine";
import EventItem_Generate from "../../../ui-generate/eventModule/EventItem_generate";
import EventUI_Generate from "../../../ui-generate/eventModule/EventUI_generate";
import { Utils } from "../../../util/Utils";
import GuideModule_Client from "../../commonModules/guide/GuideModule_Client";
import { GameData } from "../../gameModule/GameData";
import P_LobbyUI from "../../gameModule/P_LobbyUI";
import P_EventDecUI from "./P_EventDecUI";


/**
 * @Author       : 田可成
 * @Date         : 2022-08-23 17:37:56
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-09-23 18:42:27
 * @FilePath     : \JavaScripts\playModule\event\P_EventUI.ts
 * @Description  : 
 */
export default class P_EventUI extends EventUI_Generate {

    private eventItemArr: EventItem_Generate[] = []
    onStart(): void {
        DataCenterC.getData(GameData).OnGoldNumChange.add((goldnum: number) => this.mGoldCnt.text = goldnum.toString())
        for (let i = 0; i < 3; i++) {
            let item: EventItem_Generate = mw.UIService.create(EventItem_Generate)
            this.mEventCanvas.addChild(item.uiObject)
            item.uiObject.size = itemSize
            item.uiObject.visibility = mw.SlateVisibility.Collapsed
            this.eventItemArr.push(item)
        }
    }

    protected onShow(...params: any[]): void {
        this.mGoldCnt.text = DataCenterC.getData(GameData).GetGoldNum().toString()
        Utils.playSound(15)
        let events: number[] = params[0];
        for (let i = 0; i < events.length; i++) {
            if (!GameConfig.Event.getElement(events[i])) continue
            this.eventItemArr[i].mDesc.text = GameConfig.Event.getElement(events[i]).Dec
            this.eventItemArr[i].mEventName.text = GameConfig.Event.getElement(events[i]).Name
            this.eventItemArr[i].mBtn.onClicked.clear();
            this.eventItemArr[i].mBtn.onClicked.add(() => {
                Utils.playSound(16)
                GlobalVas.g_GameIsGuide ? ModuleService.getModule(GuideModule_Client).triggerGuide(7) : null;
                Utils.uploadMGS("ts_action_click", "玩家点击事件选择按钮", { button: "event" });
                mw.UIService.hide(P_EventUI)
                mw.UIService.show(P_EventDecUI, events[i])
            })
            this.eventItemArr[i].uiObject.visibility = mw.SlateVisibility.Visible
        }
        mw.UIService.hide(P_LobbyUI)
        Player.localPlayer.character.movementEnabled = false
    }

    protected onHide(): void {
        for (let i = 0; i < this.eventItemArr.length; i++) {
            this.eventItemArr[i].uiObject.visibility = mw.SlateVisibility.Collapsed
        }
    }
}
const itemSize: mw.Vector2 = new mw.Vector2(420, 526)