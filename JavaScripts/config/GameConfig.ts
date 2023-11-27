import {ConfigBase, IElementBase} from "./ConfigBase";
import {AudioConfig} from "./Audio";
import {BuffConfig} from "./Buff";
import {ClimbHeightConfig} from "./ClimbHeight";
import {EffectConfig} from "./Effect";
import {EventConfig} from "./Event";
import {FallHeightConfig} from "./FallHeight";
import {FlagConfig} from "./Flag";
import {GuideConfig} from "./Guide";
import {GuideUIConfig} from "./GuideUI";
import {ItemsConfig} from "./Items";
import {LanguageConfig} from "./Language";
import {PlayerConfigConfig} from "./PlayerConfig";
import {RoleAvatarConfig} from "./RoleAvatar";
import {TimeConfig} from "./Time";
import {WorldUIConfig} from "./WorldUI";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Audio():AudioConfig{ return this.getConfig(AudioConfig) };
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get ClimbHeight():ClimbHeightConfig{ return this.getConfig(ClimbHeightConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get Event():EventConfig{ return this.getConfig(EventConfig) };
	public static get FallHeight():FallHeightConfig{ return this.getConfig(FallHeightConfig) };
	public static get Flag():FlagConfig{ return this.getConfig(FlagConfig) };
	public static get Guide():GuideConfig{ return this.getConfig(GuideConfig) };
	public static get GuideUI():GuideUIConfig{ return this.getConfig(GuideUIConfig) };
	public static get Items():ItemsConfig{ return this.getConfig(ItemsConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get PlayerConfig():PlayerConfigConfig{ return this.getConfig(PlayerConfigConfig) };
	public static get RoleAvatar():RoleAvatarConfig{ return this.getConfig(RoleAvatarConfig) };
	public static get Time():TimeConfig{ return this.getConfig(TimeConfig) };
	public static get WorldUI():WorldUIConfig{ return this.getConfig(WorldUIConfig) };
}