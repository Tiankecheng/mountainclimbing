/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 11:43:35
 * @FilePath     : \ilovethemountains\JavaScripts\modules\gameModule\P_LoginUI.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import { globalLanguage, LanguageIndex } from "../../const/GlobleLanguage";
import login_Generate from "../../ui-generate/game/login_generate";
import Tips from "../../ui/Tips";
import { Utils } from "../../util/Utils";
import { GameModule_Client } from "./GameModule_Client";

export default class P_LoginUI extends login_Generate {

	currentFlag: number = 1
	protected onStart(): void {
		this.confirmBtn.onClicked.add(() => {
			Utils.playSound(16)
			ModuleService.getModule(GameModule_Client).cameraMotion(this.currentFlag);
			Utils.uploadMGS("ts_coregameplay_start", "玩家点击选择国旗按钮", {});
			this.visible = false;
		});

		this.leftBtn.onClicked.add(() => {
			Utils.playSound(16)
			if (this.currentFlag == 1) {
				Tips.show(globalLanguage.getLanguage(LanguageIndex.没有更多了));
				return;
			}
			ModuleService.getModule(GameModule_Client).showFlag(this.currentFlag--, this.currentFlag);
		});

		this.rightBtn.onClicked.add(() => {
			Utils.playSound(16)
			if (this.currentFlag == GameConfig.Flag.getAllElement().length) {
				Tips.show(globalLanguage.getLanguage(LanguageIndex.没有更多了));
				return;
			}
			ModuleService.getModule(GameModule_Client).showFlag(this.currentFlag++, this.currentFlag);
		});
	}

	protected onShow(...params: any[]): void {
		ModuleService.getModule(GameModule_Client).showFlag(this.currentFlag, this.currentFlag);
	}
}
