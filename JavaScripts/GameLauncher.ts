import { GuideModuleC, GuideModuleS } from "module_guide";
import { GameConfig } from "./config/GameConfig";
import { GameAssets } from "./const/GameAssets";
import { GlobalVas } from "./const/GlobalDefine";
import IAADataInfo from "./modules/IAAModule/IAAData";
import { IAAModuleC } from "./modules/IAAModule/IAAModuleC";
import { IAAModuleS } from "./modules/IAAModule/IAAModuleS";
import { BagInfo } from "./modules/commonModules/bagModule/BagData";
import { BagModule_Clinet } from "./modules/commonModules/bagModule/BagModule_Clinet";
import { BagModule_Server } from "./modules/commonModules/bagModule/BagModule_Server";
import { FacadInfo } from "./modules/commonModules/dress/FacadData";
import { FacadModuleC, FacadModuleS } from "./modules/commonModules/dress/FacadModule";
import { GMManager } from "./modules/commonModules/gm/GMManager";
import { GuideSrcData } from "./modules/commonModules/guide/GuideData";
import GuideModule_Client from "./modules/commonModules/guide/GuideModule_Client";
import GuideModule_Server from "./modules/commonModules/guide/GuideModule_Server";
import { GameData } from "./modules/gameModule/GameData";
import { GameModule_Client } from "./modules/gameModule/GameModule_Client";
import { GameModule_Server } from "./modules/gameModule/GameModule_Server";
import { PlayData } from "./modules/playModule/PlayData";
import { PlayModule_Client } from "./modules/playModule/PlayModule_Client";
import { PlayModule_Server } from "./modules/playModule/PlayModule_Server";
import { scheduler } from "./util/Scheduler";
declare global {
	var UE: any;
	var puerts: any;
}
@Component
export default class GameLauncher extends mw.Script {
	//预加载的资源guid
	// @mw.Property()
	// private preloadAssets = "7697,13587,21638,113,16037,0FE2C75D4A9CF9687EBCCFA32ED0C634,7200D7AF4F9BDDC89E751596D882C09B,493F8E254D93FB85EC0A1CA0849C651C,235712E44C2366BFE6B5729A2070AC45,A8DBA08A4F9682A8E38A85A29C5044C3,46467B4C4C0D1CC1B77F398FE55A69B5,22D22E6E44A42587EE293590C6B819F7,DDD2127D4AC3B0546C729DA62199C5E3,E354022F4662EC54259D4FAE1DBB3337,106879,106878,106872,108107,106877,106870,106873,39317,74113,63594,92724,63595,76619,63890,65009,39817,63593,105072,64542,105061,74680,105062,65614,105067,66696,105063,63686,105107,63674,105110,95543,105064,65006,105102,64997,105059,64723,105071,64554,105066,64553,105101,63681,105091,75658,105051,63596,105089,64548,105076,63885,105118,63887,105120,94781,105055,89096,106133,107603,107607,107600,107605,107606,107604,107609,20495,107602,107601,12721,19641,107608,13873,21076,39349,13827,27856,19634";
	/**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
	@mw.Property({ displayName: "选择语言", selectOptions: { "系统": "-1", "英语": "0", "汉语": "1", "日语": "2", "德语": "3" } })
	private selectedLanguage: string = "-1"
	@mw.Property()
	isOnline: boolean = false; //设置存储环境
	@mw.Property({ displayName: "是否打开GM" })
	isGM: boolean = false;
	@mw.Property({ displayName: "是否开启广告" })
	isAdd: boolean = false;

	private getPreLoadIds(): string[] {
		let ret: any[] = [];

		Object.values(GameAssets).forEach((value) => {
			ret = ret.concat(value)
		})

		GameConfig.Items.getAllElement().forEach((item) => {
			ret.push(Number(item.Resource))
		})

		GameConfig.RoleAvatar.getAllElement().forEach((item) => {
			ret.push(Number(item.bodyupper))
			ret.push(Number(item.bodylower))
			ret.push(Number(item.hairfront))
			ret.push(Number(item.hairlate))
			ret.push(Number(item.head))
			ret.push(Number(item.gloves))
			ret.push(Number(item.shoe))
			ret.push(Number(item.icon))
		})

		GameConfig.Effect.getAllElement().forEach((item) => {
			ret.push(Number(item.ResGUID))
		})

		GameConfig.Audio.getAllElement().forEach((item) => {
			ret.push(Number(item.ResGUID))
		})

		let New: string[] = [];
		ret.forEach(ele => {
			if (ele)
				if (New.indexOf(ele) == -1) {
					New.push(ele);
				}
		});
		console.log(New)
		return New;
	}

	/**
	 * 游戏开始启动
	 */
	onStart(): void {
		this.useUpdate = true
		GlobalVas.g_IsOnline = this.isOnline;
		DataStorage.setTemporaryStorage(!this.isOnline);
		GameConfig.initLanguage(Number(this.selectedLanguage), (idOrKey) => {
			let ele = GameConfig.Language.getElement(idOrKey);
			if (ele == null) return "";
			return ele.Value;
		});
		//初始化表格语言
		mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
			let key: string = ui.text;
			if (key) {
				let lan = GameConfig.Language.getElement(key);
				if (lan) {
					ui.text = lan.Value;
				}
			}
		});
		this.onRegisterModule()
	}

	/**
	 * 帧更新
	 * @param dt s
	 */
	onUpdate(dt: number): void {
		if (!GlobalVas.g_GameIsPause) {
			if (mw.SystemUtil.isClient() && dt >= 0.1) return;
			super.onUpdate(dt);
			scheduler.tick(dt);
			mw.TweenUtil.TWEEN.update()
		}
	}

	//当注册模块
	onRegisterModule(): void {
		ModuleService.registerModule(GameModule_Server, GameModule_Client, GameData);
		ModuleService.registerModule(PlayModule_Server, PlayModule_Client, PlayData);
		ModuleService.registerModule(BagModule_Server, BagModule_Clinet, BagInfo);
		ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideSrcData);
		ModuleService.registerModule(GuideModule_Server, GuideModule_Client, GuideSrcData);
		ModuleService.registerModule(FacadModuleS, FacadModuleC, FacadInfo)
		if (this.isAdd) ModuleService.registerModule(IAAModuleS, IAAModuleC, IAADataInfo)
		//gm模块
		if (this.isGM) GMManager.instance.isShow = true;
	}

	/**下载并加载所有用到的资源 */
	public async downLoadAllAsset(assets: string[]) {
		if (!assets || assets.length <= 0) {
			return;
		}
		let arr = []
		let count = 0
		for (let i = 0; i < assets.length; i++) {
			const guid = assets[i];
			if (!mw.AssetUtil.assetLoaded(guid)) {
				arr.push(mw.AssetUtil.asyncDownloadAsset(guid))
				count++
			}
			if (count >= 5 || i >= assets.length - 1) {
				await Promise.all(arr)
				arr.length = 0
				count = 0
			}
		}
	}
}