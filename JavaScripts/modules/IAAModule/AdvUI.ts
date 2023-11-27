/**
 * @Author       : 田可成
 * @Date         : 2022-12-26 19:12:34
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:40:22
 * @FilePath     : \ilovethemountains\JavaScripts\modules\IAAModule\AdvUI.ts
 * @Description  : 
 */
import AdvUI_Generate from "../../ui-generate/commercialize/AdvUI_generate";
import { Utils } from "../../util/Utils";
import { IAAPos } from "./IAAData";
import { IAAModuleC } from "./IAAModuleC";

export class AdvUI extends AdvUI_Generate {

    private _currentPos: IAAPos
    protected onStart(): void {
        this.mYes.onClicked.add(() => {
            Utils.uploadMGS("ts_action_click", "玩家点击看广告按钮时", { button: "reward" });
            ModuleService.getModule(IAAModuleC).net_ShowRewardAd(this._currentPos)
            mw.UIService.hideUI(this)
        })
        this.mNo.onClicked.add(() => {
            Utils.uploadMGS("ts_action_click", "玩家点击取消按钮时", { button: "cancel" });
            mw.UIService.hideUI(this)
        });
    }

    protected onShow(pos: IAAPos, savePointID: number): void {
        if (!this._currentPos) {
            this._currentPos = pos;
            if (this._currentPos == IAAPos.Item) {
                Utils.uploadMGS("ts_page", "激励广告弹窗出现时进行上报", { page_name: "rewardad", pre_page_name: savePointID });
                this.mMedical.visibility = mw.SlateVisibility.SelfHitTestInvisible
            } else if (this._currentPos == IAAPos.Fly) {
                Utils.uploadMGS("ts_page", "飞行广告弹窗出现时进行上报", { page_name: "fly", pre_page_name: savePointID });
                this.mboots.visibility = mw.SlateVisibility.SelfHitTestInvisible
            }
        }
    }

    protected onHide() {
        if (this._currentPos == IAAPos.Item) {
            this.mMedical.visibility = mw.SlateVisibility.Hidden
        } else if (this._currentPos == IAAPos.Fly) {
            this.mboots.visibility = mw.SlateVisibility.Hidden
        }
        this._currentPos = null;
    }
}