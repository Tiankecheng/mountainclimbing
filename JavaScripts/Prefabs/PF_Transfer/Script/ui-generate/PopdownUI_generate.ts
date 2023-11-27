/**
 * @Author       : 田可成
 * @Date         : 2022-12-29 12:37:59
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 13:16:31
 * @FilePath     : \ilovethemountains\Prefabs\PF_Transfer\Script\ui-generate\PopdownUI_generate.ts
 * @Description  : 
 */

/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 维纟丶酱
 * UI: Prefabs/PF_Transfer/UI/PopdownUI.ui
 * TIME: 2022.12.29-12.37.59
 */



@UIBind('Prefabs/PF_Transfer/UI/PopdownUI.ui')
export default class PopdownUI_Generate extends mw.UIScript {
	@UIWidgetBind('RootCanvas/mTransfer')
	public mTransfer: mw.StaleButton = undefined;



	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击

		this.mTransfer.onClicked.add(() => {
			Event.dispatchToLocal("PlayButtonClick", "mTransfer");
		})
		this.mTransfer.touchMethod = (mw.ButtonTouchMethod.PreciseTap);

		let id = setInterval(() => {
			this.initLanguage(this.mTransfer);
			if (this.mTransfer.text != "avd_text_2") {
				clearInterval(id);
			}
		}, 30);

		//按钮添加点击


		//按钮多语言

		//文本多语言

		//文本多语言


	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
		let call = mw.UIScript.getBehavior("lan");
		if (call && ui) {
			call(ui);
		}
	}
}
