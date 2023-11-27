/**
 * @Author       : 田可成
 * @Date         : 2022-09-20 19:16:29
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-26 09:51:22
 * @FilePath     : \ilovethemountains\Prefabs\PlayerScore\Script\PlayerScore.ts
 * @Description  : 
 */
import { ClientEvents } from "../../../../JavaScripts/const/LocalEvents";
import ScoreMgr, { IPlayerScore } from "./ScoreMgr";

@Component
export default class PlayerScore extends mw.Script implements IPlayerScore {
	enble_S = false

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	pid = 0;

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	nickName = "";

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	savePoint = 0;

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	topCount = 0;

	@mw.Property({ replicated: true, onChanged: "onRepProp" })
	height = 0;

	init(pid: number, nickName: string, topCount: number) {
		this.enble_S = true;
		this.savePoint = 1;
		this.height = 1000;
		this.pid = pid
		this.nickName = nickName;
		this.topCount = topCount;
	}

	protected onStart(): void {
		if (mw.SystemUtil.isClient())
			ScoreMgr.instance.onPlayerRegiser(this)
	}

	onRepProp() {
		if (mw.SystemUtil.isClient()) {
			Event.dispatchToLocal(ClientEvents.Ev_RefreshRank_Client);
		}
	}
}
