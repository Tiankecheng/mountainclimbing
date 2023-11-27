import GameStart_Generate from "../../ui-generate/game/GameStart_generate";
import { Utils } from "../../util/Utils";
import P_LoginUI from "./P_LoginUI";

/**
 * @Author       : 田可成
 * @Date         : 2022-08-25 20:05:54
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 11:43:28
 * @FilePath     : \ilovethemountains\JavaScripts\modules\gameModule\P_GameStart.ts
 * @Description  : 
 */
export default class P_GameStart extends GameStart_Generate {

	protected onStart(): void {
		this.startBtn.onClicked.add(() => {
			Utils.playSound(16)
			mw.UIService.show(P_LoginUI)
			this.visible = false;
		});
	}
}
