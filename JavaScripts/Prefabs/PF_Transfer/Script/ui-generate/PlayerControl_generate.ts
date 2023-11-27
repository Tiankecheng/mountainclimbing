/**
 * @Author       : 田可成
 * @Date         : 2023-01-03 09:28:51
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 13:16:20
 * @FilePath     : \ilovethemountains\Prefabs\PF_Transfer\Script\ui-generate\PlayerControl_generate.ts
 * @Description  : 
 */

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 维纟丶酱
 * UI: Prefabs/PF_Transfer/UI/PlayerControl.ui
 * TIME: 2022.12.29-12.37.59
 */



@UIBind('Prefabs/PF_Transfer/UI/PlayerControl.ui')
export default class PlayerControl_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mBtnTransfer')
	public mBtnTransfer: mw.Button = undefined;
	@UIWidgetBind('RootCanvas/mBtnJump')
	public mBtnJump: mw.Button = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击

		//按钮添加点击

		this.mBtnTransfer.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick", "mBtnTransfer");
		})
		this.mBtnTransfer.touchMethod = (mw.ButtonTouchMethod.PreciseTap);


		this.mBtnJump.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick", "mBtnJump");
		})
		this.mBtnJump.touchMethod = (mw.ButtonTouchMethod.PreciseTap);



		//按钮多语言

		//文本多语言

		//文本多语言

		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mBtnTransfer/TextBlock_1") as any);



	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
