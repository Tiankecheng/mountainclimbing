import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
﻿/**
 * @Author       : 田可成
 * @Date         : 2022-09-21 11:28:09
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:17:27
 * @FilePath     : \ilovethemountains\JavaScripts\Prefabs\EventTrr\Script\EventTrr.ts
 * @Description  : 
 */
export namespace TrrEvent {
	/**进入触发器 */
	export let Trr_OnEnterTrriger: string = "Trr_OnEnterTrriger";
}
import { ClientEvents } from "../../../../JavaScripts/const/LocalEvents";
@Component
export default class EventTrr extends mw.Script {

	@mw.Property({ displayName: "触发事件ID" })
	eventID: number = 1
	@mw.Property({ displayName: "刷新事件类型" })
	eventType: string = "1"
	@mw.Property({ displayName: "刷新事件数量" })
	eventCount: number = 1
	@mw.Property({ displayName: "交互后隐藏的场景物guid" })
	destroyGuid: string = "";
	@mw.Property({ displayName: "是否是用于引导的事件" })
	private _isGuide: boolean = false
	private _isEnter: boolean = false
	private _trigger: mw.Trigger

	protected onStart(): void {
		if (mw.SystemUtil.isClient()) {
			Event.addLocalListener(ClientEvents.EV_ResetGame, () => { this._isEnter = false })
			Event.addLocalListener(ClientEvents.EV_EnterGuide, () => { if (this._isGuide) this._isEnter = true })
			let id = setInterval(() => {
				this._trigger = this.gameObject.getChildByName("BP_BoxTrigger") as mw.Trigger
				if (this._trigger) {
					clearInterval(id);
					this.createEvent();
				}
			}, 30);
		}
	}

	private createEvent() {
		this._trigger.onEnter.add((other: mw.GameObject) => {
			if (PlayerManagerExtesion.isCharacter(other) && Player.localPlayer.character.gameObjectId == other.gameObjectId) {
				if (!this._isEnter) {
					this._isEnter = true
					Event.dispatchToLocal(TrrEvent.Trr_OnEnterTrriger, [this.eventID, this.eventType, this.eventCount, this.destroyGuid])
				}
			}
		})
	}
}
