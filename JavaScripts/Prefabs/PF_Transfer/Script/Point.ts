import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import PlayerControl_Generate from "./ui-generate/PlayerControl_generate"

/**
 * @Author       : 田可成
 * @Date         : 2022-12-28 11:50:34
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:19:20
 * @FilePath     : \ilovethemountains\JavaScripts\Prefabs\PF_Transfer\Script\Point.ts
 * @Description  : 
 */
@Component
export default class Point extends mw.Script {
    @mw.Property({ displayName: "传送点ID" }) /** */
    public pointID: number = 1
    @mw.Property({ displayName: "可传送ID" }) /** */
    public transPointID: number = 2

    public widget: mw.UIWidget
    public flagEff: mw.Effect
    public trriger: mw.Trigger
    public location: mw.Vector

    protected onStart(): void {
        this.location = this.gameObject.worldTransform.position
        this.widget = this.gameObject.getChildByName("worldUI") as mw.UIWidget
        this.widget.setVisibility(mw.PropertyStatus.Off)
        this.flagEff = this.gameObject.getChildByName("effect") as mw.Effect
        this.flagEff.loop = true
        this.flagEff.setVisibility(mw.PropertyStatus.Off)
        this.trriger = this.gameObject.getChildByName("trriger") as mw.Trigger
        this.trriger.onEnter.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                let ui = mw.UIService.show(PlayerControl_Generate)
                ui.mBtnTransfer.onClicked.add(() => {
                    Event.dispatchToLocal("CC_CableCarStart", other.gameObjectId, this.transPointID)
                })
            }
        });
        this.trriger.onLeave.add((other: mw.GameObject) => {
            if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
                let ui = mw.UIService.hide(PlayerControl_Generate)
                ui.mBtnTransfer.onClicked.clear()
            }
        });
    }

    public init() {
        setTimeout(() => {
            this.flagEff.setVisibility(mw.PropertyStatus.On)
            this.widget.setVisibility(mw.PropertyStatus.On)
            this.flagEff.play()
        }, 10);
    }
}