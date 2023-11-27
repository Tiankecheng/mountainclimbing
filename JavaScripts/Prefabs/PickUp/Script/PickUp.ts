import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-10-31 10:54:32
 * @FilePath     : \ilovethemountains\Prefabs\PickUp\Script\PickUp.ts
 * @Description  : 
 */
export namespace PickUpEvent {
    /**进入触发器 */
    export let PU_OnEnterTrriger: string = "PU_OnEnterTrriger";
    /**离开触发器 */
    export let PU_OnLeaveTrriger: string = "PU_OnLeaveTrriger";
}

@Component
export default class PickUp extends mw.Script {

    @mw.Property({ displayName: "插旗后获得的金币" })
    gold: number = 1
    @mw.Property({ displayName: "插旗后旗子的坐标" })
    flagPos: mw.Vector = mw.Vector.zero
    @mw.Property({ displayName: "插旗后旗子的旋转" })
    flagRot: mw.Vector = mw.Vector.zero
    @mw.Property({ displayName: "插旗后旗子的大小" })
    flagSca: mw.Vector = mw.Vector.zero
    @mw.Property({ displayName: "代表的物品ID" })
    itemId: number = 7;
    @mw.Property({ displayName: "如果背包里有该物品是否能交互" })
    isCheck: boolean = true;
    @mw.Property({ displayName: "交互后隐藏的场景物guid" })
    destroyGuid: string = "";
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
        this._trigger.onEnter.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                Event.dispatchToLocal(PickUpEvent.PU_OnEnterTrriger, [this.itemId, this.destroyGuid, this.gold, this.flagPos, this.flagRot, this.flagSca, this.isCheck])
            }
        })
        this._trigger.onLeave.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                Event.dispatchToLocal(PickUpEvent.PU_OnLeaveTrriger)
            }
        })
    }
}
