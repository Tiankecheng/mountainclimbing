import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","ResGUID","LifeTime","IsLoop"],["","","","",""],[1,"玩家恢复体力特效","89096",1,true],[2,"玩家使用回血道具特效","106133",2,false]];
export interface IEffectElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**名字*/
	Name:string
	/**特效资源*/
	ResGUID:string
	/**多少秒后消失*/
	LifeTime:number
	/**是否循环播放*/
	IsLoop:boolean
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}