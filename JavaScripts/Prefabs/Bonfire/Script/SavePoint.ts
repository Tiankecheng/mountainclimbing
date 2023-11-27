import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { ClientEvents } from "../../../../JavaScripts/const/LocalEvents";
import { PlayModule_Client } from "../../../../JavaScripts/modules/playModule/PlayModule_Client";

/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:19:44
 * @FilePath     : \ilovethemountains\JavaScripts\Prefabs\Bonfire\Script\SavePoint.ts
 * @Description  : 
 */
export namespace SavePointEvent {
    /**进入存档点 */
    export let SP_EnterSavePoint: string = "SP_EnterSavePoint";
    /**进入触发器 */
    export let SP_OnEnterTrriger: string = "SP_OnEnterTrriger";
    /**离开触发器 */
    export let SP_OnLeaveTrriger: string = "SP_OnLeaveTrriger";
}
@Component
export default class SavePoint extends mw.Script {
    @mw.Property({ displayName: "复活点" })
    rebornPoint = mw.Vector.zero
    @mw.Property({ displayName: "体力回复值" })
    staminaRevert = 5
    @mw.Property({ displayName: "是否存档" })
    isSavePoint = true
    @mw.Property({ displayName: "存档点ID" })
    savePointID = 1;
    @mw.Property({ displayName: "增加金币" })
    addGold = 0;
    private _trigger: mw.Trigger

    protected onStart(): void {
        if (mw.SystemUtil.isClient()) {
            let id = setInterval(() => {
                this._trigger = this.gameObject.getChildByName("BP_BoxTrigger") as mw.Trigger
                if (this._trigger) {
                    clearInterval(id);
                    this.createEvent();
                }
            }, 30);
        }
    }

    private createEvent() {
        Event.addLocalListener(ClientEvents.EV_Portal, (pointNum) => {
            if (pointNum == this.savePointID)
                ModuleService.getModule(PlayModule_Client).playerReborn(this.rebornPoint)
        })
        this._trigger.onEnter.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                Event.dispatchToLocal(SavePointEvent.SP_OnEnterTrriger, [this.staminaRevert])
                if (this.isSavePoint) {
                    Event.dispatchToLocal(SavePointEvent.SP_EnterSavePoint, [this.savePointID, this.addGold, this.rebornPoint])
                }
            }
        })
        this._trigger.onLeave.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                Event.dispatchToLocal(SavePointEvent.SP_OnLeaveTrriger, [this.savePointID, this.addGold, this.rebornPoint])
            }
        })
    }
}
