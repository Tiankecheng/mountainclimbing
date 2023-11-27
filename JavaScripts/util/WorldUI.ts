import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
/**
 * @Author       : 田可成
 * @Date         : 2022-08-31 18:14:43
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:16:34
 * @FilePath     : \ilovethemountains\JavaScripts\util\WorldUI.ts
 * @Description  : 
 */
import { GameAssets } from "../const/GameAssets";

export class WorldUI {
    static addWorldUI(location: mw.Vector, rotate: mw.Vector, scale: mw.Vector, text: string, color: string) {
        SpawnManager.asyncSpawn({ guid: GameAssets.WORLD_UI }).then((obj) => {
            let widget = obj as mw.UIWidget
            widget.widgetSpace = mw.WidgetSpaceMode.World
            widget.pivot = new mw.Vector2(0.5, 0.5)
            widget.setUIbyID("7D7482244BFD204497B6C7BAAAA109C4")
            widget.drawSize = new mw.Vector2(500, 150);
            widget.worldTransform.position = location
            widget.worldTransform.rotation = new mw.Rotation(rotate)
            widget.worldTransform.scale = scale
            let _text = widget.getTargetUIWidget().findChildByPath("Canvas/mText") as mw.TextBlock
            _text.text = text;
            _text.fontColor = new mw.LinearColor(mw.LinearColor.colorHexToLinearColor(color))
            widget.refresh()
        })

    }
} 