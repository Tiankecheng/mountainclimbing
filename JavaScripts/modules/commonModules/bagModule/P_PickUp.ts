/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 11:41:06
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\bagModule\P_PickUp.ts
 * @Description  : 
 */

import { globalLanguage, LanguageIndex } from "../../../const/GlobleLanguage";
import PickUp_Generate from "../../../ui-generate/bagModule/PickUp_generate";
import Tips from "../../../ui/Tips";
import { Utils } from "../../../util/Utils";
import { GameModule_Client } from "../../gameModule/GameModule_Client";
import { BagModule_Clinet } from "./BagModule_Clinet";

export default class P_PickUp extends PickUp_Generate {
	protected onShow(...param: any): void {
		let params = param[0]
		this.mPickup.onClicked.clear();
		let itemID = params[0];
		let destroyGuid = params[1]
		let gold = params[2]
		let flagPos = params[3]
		let flagRot = params[4]
		let flagSca = params[5]
		if (itemID == 7) {
			this.mPickup.text = globalLanguage.getLanguage(LanguageIndex.插上旗子)
			this.mPickup.onClicked.add(() => {
				Utils.playSound(16)
				//TODO:插旗子
				let str = Utils.formatString(globalLanguage.getLanguage(LanguageIndex["增加{0}金币"]), gold)
				Tips.show(str);
				ModuleService.getModule(GameModule_Client).addGold(gold);
				ModuleService.getModule(GameModule_Client).plugFlag(flagPos, flagRot, flagSca)
				ModuleService.getModule(BagModule_Clinet).deleteItemByCfg(7);
			})
		} else {
			this.mPickup.text = globalLanguage.getLanguage(LanguageIndex.拾取)
			this.mPickup.onClicked.add(() => {
				Utils.playSound(16)
				ModuleService.getModule(BagModule_Clinet).addItemByCfg(itemID);
				Utils.uploadMGS("ts_action_click", "玩家点击拾取按钮", { button: "item" });
			})
		}
		this.mPickup.onClicked.add(() => {
			if (destroyGuid) {
				GameObject.asyncFindGameObjectById(destroyGuid).then((obj) => {
					obj.setVisibility(mw.PropertyStatus.Off);
				})
			}
			this.visible = false
		})
	}
}
