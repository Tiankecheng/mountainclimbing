import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Name_c","ItemType","Resource","BuffID","EffectNum","Weight","Dec","Dec_c"],["","Language","","","","","","","Language",""],[1,"Item_name_1","无菌绷带",1,"106879",[2],[30],10,"Item_Dec_1","恢复30点生命值"],[2,"Item_name_2","牛肉罐头",1,"106878",[1],[30],10,"Item_Dec_2","恢复30点体力值"],[3,"Item_name_3","钞票",1,"106872",[4],[100],10,"Item_Dec_3","获得100点钞票"],[4,"Item_name_4","手术包",2,"108107",[1,2],[-30,50],10,"Item_Dec_4","减少30点体力，恢复50点生命值"],[5,"Item_name_5","信号弹",1,"106877",[2,7],[30],10,"Item_Dec_5","恢复30点生命值并立即返回上个存档点"],[6,"Item_name_6","急救包",1,"106870",[2,1],[20,20],10,"Item_Dec_6","恢复20点生命与20点体力"],[7,"Item_name_7","旗帜",3,"106873",[0],[0],0,"Item_Dec_7","携带它登顶获得额外钞票"]];
export interface IItemsElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**宝物名称*/
	Name:string
	/**宝物名称*/
	Name_c:string
	/**道具类型*/
	ItemType:number
	/**美术资源(ICON)*/
	Resource:string
	/**对应buff表ID*/
	BuffID:Array<number>
	/**效果数值*/
	EffectNum:Array<number>
	/**权重*/
	Weight:number
	/**描述文案*/
	Dec:string
	/**描述文案*/
	Dec_c:string
 } 
export class ItemsConfig extends ConfigBase<IItemsElement>{
	constructor(){
		super(EXCELDATA);
	}

}