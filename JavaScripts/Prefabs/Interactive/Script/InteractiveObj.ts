import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
﻿
export namespace InteractiveEvent {
	/**背包开关 */
	export let IE_OpenBag: string = "IE_OpenBag";
	/**按钮执行交互逻辑 */
	export let IE_Interact: string = "IE_Interact";
	/**开关交互按钮 */
	export let IE_OpenInteractUI: string = "IE_OpenInteractUI";
}
@Component
export default class InteractiveObj extends mw.Script {
	@mw.Property({ displayName: "离开坐标" })
	exitLoc: mw.Vector = mw.Vector.zero;

	// MAKER: 声明触发器、交互物、角色变量
	private _trigger: mw.Trigger | undefined = undefined;
	private _interactor: mw.Interactor | undefined = undefined;
	private _gameChar: mw.Character | undefined;
	private isFull: boolean = false;

	protected onStart(): void {
		let id = setInterval(() => {
			this._trigger = this.gameObject.getChildByName("Box_Trigger") as mw.Trigger
			this._interactor = this.gameObject as mw.Interactor;
			if (this._trigger && this._interactor) {
				clearInterval(id);
				this.init();
			}
		}, 30);
	}

	private async init() {
		// MAKER: 角色进入触发器
		this._trigger.onEnter.add((other) => {
			if (!(PlayerManagerExtesion.isCharacter(other))) {
				return;
			}
			if (this.isFull) {
				return;
			}
			// MAKER: 获取进入触发器角色
			this._gameChar = <mw.Character>other;
			this.isFull = true;
			if (!mw.SystemUtil.isClient()) {
				return;
			}
			if (this._gameChar != Player.localPlayer.character) {
				return;
			}
			// MAKER: 打开交互UI
			Event.dispatchToLocal(InteractiveEvent.IE_OpenInteractUI, true)
		});
		// MAKER: 角色退出触发器
		this._trigger.onLeave.add((other) => {
			if (other != this._gameChar) {
				return;
			}

			if (mw.SystemUtil.isClient()) {
				if (this._gameChar == Player.localPlayer.character) {
					// MAKER: 关闭交互UI
					Event.dispatchToLocal(InteractiveEvent.IE_OpenInteractUI, false)
				}
			}

			// MAKER: 置空角色变量
			this._gameChar = undefined;
			this.isFull = false;
		});

		if (!mw.SystemUtil.isClient()) {
			return;
		}

		// MAKER: 事件监听，挂载交互物
		Event.addLocalListener(InteractiveEvent.IE_Interact, (flag) => {
			if (!this._interactor || !this._gameChar) {
				return;
			}
			// MAKER: 非交互状态
			if (!flag) {
				// MAKER: 激活交互物，将角色以设定动画姿态挂载到交互对象
				this._interactor.enter(this._gameChar)
				Event.dispatchToLocal(InteractiveEvent.IE_OpenBag, false)
			}
		});

		// MAKER: 事件监听，退出交互状态
		Event.addLocalListener(InteractiveEvent.IE_Interact, (flag) => {
			if (!this._interactor) {
				return;
			}
			// MAKER: 已交互状态
			if (flag) {
				// MAKER: 角色退出交互物
				GeneralManager.modifyExitInteractiveState(this._interactor, this._interactor.worldTransform.position.add(this.exitLoc));

				Event.dispatchToLocal(InteractiveEvent.IE_OpenBag, true)
			}
		});
	}
}