/**
 * @Author       : 田可成
 * @Date         : 2022-12-27 10:08:32
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:17:13
 * @FilePath     : \ilovethemountains\JavaScripts\ui\Tips.ts
 * @Description  : 
 */
import Tips_Generate from "../ui-generate/commonUI/Tips_generate";

/**
 * 系统提示
 * 一个顶一个向上跳动，然后消失，最多三条
 */
export default class Tips extends Tips_Generate {
    private static readonly Y_OVER = -150;
    private static readonly MOVE_SPEED = 500;
    private static readonly KEEP_TIME = 1;
    private static _instance: Tips;
    private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
    private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
    private contentArr: string[] = []
    private cellHeight = 150

    private static get instance(): Tips {
        if (this._instance == null) {
            this._instance = mw.UIService.create(Tips)
        }
        return this._instance;
    }

    onStart() {
        this.canUpdate = true
        this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];
        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = mw.SlateVisibility.Collapsed
        }
        Event.addServerListener("Event_ShowTips", (content: string) => {
            Tips.instance.showMsg(content);
        });
    }

    /**
     * 显示系统提示
     * @param msg 提示内容
     */
    public static show(msg: string) {
        mw.UIService.showUI(this.instance, mw.UILayerTop);
        if (msg.length > 0)
            Tips.instance.showMsg(msg);
    }

    /**
     * 在客户端显示
     * @param player 玩家
     * @param content 内容
     */
    public static showToClient(player: mw.Player, content: string) {
        Event.dispatchToClient(player, "Event_ShowTips", content);
    }

    private showMsg(content: string) {
        console.log("收到消息 + " + content)
        this.contentArr.push(content)
    }

    onUpdate(dt: number) {
        if (dt >= 0.1) return;
        if (this.contentArr.length > 0 && this.freeCellArr.length > 0) {
            let content: string = this.contentArr.shift()
            let cell: mw.Canvas = this.freeCellArr.shift()
            let text: mw.TextBlock = cell.findChildByPath('Content_txt') as mw.TextBlock;
            let bg: mw.Image = cell.findChildByPath('BG') as mw.Image
            text.position = mw.Vector2.zero
            bg.position = mw.Vector2.zero
            text.text = content
            cell["stopTime"] = 0;
            cell["text"] = text;
            cell["bg"] = bg
            cell.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.activeCellArr.push(cell)
        }

        let hide = false
        let targetY: number
        let curPos: mw.Vector2
        for (let i = 0; i < this.activeCellArr.length; i++) {
            let cell = this.activeCellArr[i];
            curPos = cell["text"].slot.position
            if (i == 0)
                targetY = Tips.Y_OVER
            else
                targetY = Tips.Y_OVER - this.cellHeight * i
            if (cell["text"].slot.position.y > targetY) {
                curPos.y -= Tips.MOVE_SPEED * dt
                cell["text"].slot.position = curPos
                cell["bg"].slot.position = curPos
            } else {
                if (i == 0) {
                    cell["stopTime"] += dt;
                    if (cell["stopTime"] >= Tips.KEEP_TIME) {
                        cell.visibility = mw.SlateVisibility.Collapsed
                        hide = true
                    }
                }
            }
        }
        if (hide) {
            let cell = this.activeCellArr.shift()
            this.freeCellArr.push(cell)
        }
    }
}