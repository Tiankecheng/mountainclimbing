import { FacadItemRender, FacadModuleBaseC, FacadModuleBaseS, FacadScript, FacadUIBase, FacadUICfg, FacadUtil, IRoleAvatarCfg } from "module_facad";
import { GameConfig } from "../../../config/GameConfig";
import { IRoleAvatarElement } from "../../../config/RoleAvatar";
import { LanguageIndex, globalLanguage } from "../../../const/GlobleLanguage";
import FacadItem_Generate from "../../../ui-generate/facad/FacadItem_generate";
import FacadMain_Generate from "../../../ui-generate/facad/FacadMain_generate";
import Tips from "../../../ui/Tips";
import { Utils } from "../../../util/Utils";
import { GameData } from "../../gameModule/GameData";
import { GameModule_Server } from "../../gameModule/GameModule_Server";
import P_LobbyUI from "../../gameModule/P_LobbyUI";
import { BagModule_Clinet } from "../bagModule/BagModule_Clinet";
import { P_BagMain } from "../bagModule/P_Bag";

@Component
export default class FacadScriptExt extends FacadScript {
	//属性同步的时候配置表还没注册
	getCfg(id: number): IRoleAvatarCfg {
		return GameConfig.RoleAvatar.getElement(id);
	}
}

export class FacadModuleC extends FacadModuleBaseC<FacadModuleS> {
	onFacadReady(): void {
		
	}
	getListenServerAIBasicStanceAndAnimation(): string[] {
		return []
	}
	onCameraComplete(): void {

	}
	getLookObjGuid(): string {
		return "99E1C7D6";
	}
	getFacadClass() {
		return mw.Script.spawnScript(FacadScriptExt);
	}
	getTargetArmLength(): number {
		return 220;
	}
	getRotationSpeed(): number {
		return -20;
	}
	onStart(): void {
		Camera.currentCamera.positionLagSpeed = 0;
		FacadUtil.addCfg(GameConfig.RoleAvatar.getAllElement());
	}
	onNoticeNeedBuy(cfgIds: number[]) {
		Tips.show(globalLanguage.getLanguage(LanguageIndex["当前装扮包含未拥有套装，请购买后再保存"]))
	}
	getDefaultCfgId(): number {
		return GameConfig.RoleAvatar.getAllElement()[0].ID;
	}
	getHumanGuid(): string {
		return "EB905295"
	}
	getFacadCfg(cfgId: number): IRoleAvatarElement {
		return GameConfig.RoleAvatar.getElement(cfgId);
	}
	getItemIdsByType(type: number): IRoleAvatarElement[] {
		let ret = GameConfig.RoleAvatar.getAllElement().filter(t => {
			return t.type == type;
		})
		return ret;
	}
	isSameType(cfgId: number, type: number): boolean {
		let cfg = this.getFacadCfg(cfgId);
		return cfg.type == type;
	}
	//测试用例================================

	reqBuySuit(cfgId: number) {
		Utils.uploadMGS("ts_action_click", "点击皮肤购买按钮", { button: "store_buy" });
		super.reqBuySuit(cfgId)
	}
	openFacad() {
		super.openFacad(P_FacadMainUI);
		mw.UIService.hide(P_LobbyUI)
		mw.UIService.hide(P_BagMain)
	}

	closeFacad(): void {
		super.closeFacad();
		mw.UIService.hide(P_FacadMainUI)
		mw.UIService.show(P_LobbyUI)
		ModuleService.getModule(BagModule_Clinet).openBag();
	}

}

export class FacadModuleS extends FacadModuleBaseS<FacadModuleC> {

	async onPlayerJoined(player: mw.Player): Promise<void> {
		await super.onPlayerJoined(player);

		let data = this.getPlayerData(player);
		FacadUtil.foreach(cfg => {
			if (cfg.price == 0) {
				data.addSuit(cfg.ID);
			}
		})
	}

	getAutoEquipPartIds(player: mw.Player): number[] {
		return null;// return [41, 43]
	}

	getFacadClass() {
		return mw.Script.spawnScript(FacadScriptExt);
	}

	onStart(): void {
		FacadUtil.addCfg(GameConfig.RoleAvatar.getAllElement());
	}

	checkBuyConditon(player: mw.Player, cfg: IRoleAvatarElement): boolean {
		
		let gamedata = DataCenterS.getData(player, GameData)

		if (gamedata.GetGoldNum() >= cfg.price) {
			ModuleService.getModule(GameModule_Server).net_AddGold(-cfg.price);
			return true
		} else {
			Tips.show(globalLanguage.getLanguage(LanguageIndex.您的钱不够))
			// oTrace("not enough money");
		}
	}

	//测试接口================================
	getFacadCfg(cfgId: number): IRoleAvatarElement {
		return GameConfig.RoleAvatar.getElement(cfgId);
	}

	getDefaultCfgId(player: mw.Player): number {
		//这里可以根据其他条件返回,比如性别什么的
		return GameConfig.RoleAvatar.getAllElement()[0].ID;
	}
}

class FacadItemRenderExt extends FacadItemRender<FacadItem_Generate> {
	constructor() {
		super(FacadItem_Generate, new mw.Vector2(230, 290));
	}

	getModule(): FacadModuleBaseC<any> {
		return ModuleService.getModule(FacadModuleC);
	}
}

export class P_FacadMainUI extends FacadUIBase<FacadMain_Generate> {

	constructor() {
		super(FacadMain_Generate, ModuleService.getModule(FacadModuleC), FacadItemRenderExt);
	}


	protected initUICfg(cfg: FacadUICfg): void {
		//滑动组件
		cfg.scrollBox = this.view.mScrollBox;
		//滑动组件下装格子的容器
		cfg.scrollContent = this.view.mContent;
		//单个格子的渲染大小
		cfg.renderItemSize = new mw.Vector2(230, 290);
		//格子水平垂直间距
		cfg.horAndVerSpace = new mw.Vector2(40, 40);
		cfg.btnLeft = this.view.btnLeft;
		cfg.btnRight = this.view.btnRight;
		cfg.btnSave = this.view.mBtnSave;
		cfg.btnRevert = this.view.btnReset;
		cfg.mTouch = this.view.mTouch;
		cfg.mPosImg = this.view.mPos;

		DataCenterC.getData(GameData).OnGoldNumChange.add((goldnum: number) => this.view.mGoldCnt.text = goldnum.toString())
		this.view.mBtnClose.onClicked.add(() => {
			ModuleService.getModule(FacadModuleC).closeFacad();
		})

		//添加三个按钮，并关联三种类型,第一个默认选中

		this.addTabs(this.view.btn1, 1, true);
		this.addTabs(this.view.btn2, 2, false);
		this.addTabs(this.view.btn3, 3, false);
		this.addTabs(this.view.btn4, 4, false);
		this.addTabs(this.view.btn5, 5, false);
		this.addTabs(this.view.btn6, 6, false);
		this.addTabs(this.view.btn7, 7, false);
	}

	protected onShow(): void {
		super.onShow()
		this.view.mGoldCnt.text = DataCenterC.getData(GameData).GetGoldNum().toString()
	}

	/**
	 * 类型按钮切换回调
	 * @param btn 某个按钮
	 * @param isSelect 是否选中
	 */
	protected onTabBtnStateChangeCallBack(btn: mw.StaleButton, isSelect: boolean) {
		isSelect ? btn.normalImageColor = mw.LinearColor.colorHexToLinearColor("#ffff05ff") : btn.normalImageColor = mw.LinearColor.colorHexToLinearColor("#ffffffff")
	}

} 