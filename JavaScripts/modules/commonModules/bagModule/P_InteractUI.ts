import { InteractiveEvent } from "../../../Prefabs/Interactive/Script/InteractiveObj";
import { globalLanguage, LanguageIndex } from "../../../const/GlobleLanguage";
import Interact_Generate from "../../../ui-generate/bagModule/Interact_generate";

/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-26 14:02:16
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\bagModule\P_InteractUI.ts
 * @Description  : 
 */
export default class P_InteractUI extends Interact_Generate {

	private isInteractive: boolean = false;

	protected onStart(): void {

		this.setTxt();
		this.interactBtn.onClicked.add(() => {
			Event.dispatchToLocal(InteractiveEvent.IE_Interact, this.isInteractive);
			this.isInteractive = !this.isInteractive;
			this.setTxt();
		});
	}

	private setTxt(): void {
		if (!this.isInteractive) {
			this.interactBtn.text = globalLanguage.getLanguage(LanguageIndex.坐下)
		} else if (this.isInteractive) {
			this.interactBtn.text = globalLanguage.getLanguage(LanguageIndex.出发)
		}
	}
}
