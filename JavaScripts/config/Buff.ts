import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","EffectType","Description"],["","",""],[1,1,"恢复/减少体力值"],[2,1,"恢复/减少HP值"],[3,1,"恢复/减少生命"],[4,1,"获得/丢失金币"],[5,2,"持续恢复/减少体力值"],[6,2,"持续恢复/减少HP值"],[7,3,"返回上个小营地"],[8,3,"返回上个大营地"],[9,3,"增加一个物品"],[10,3,"失去一个物品"]];
export interface IBuffElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**效果类型*/
	EffectType:number
	/**buff描述*/
	Description:string
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}