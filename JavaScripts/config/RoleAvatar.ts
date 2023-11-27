import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","mainType","type","name","desc","sortValue","body","bodyupper","bodylower","hairfront","hairlate","head","gloves","shoe","effectGuid","matGuid","socket","posOffset","scale","rotate","icon","priceIcon","priceType","price"],["","","","Language","","","","","","","","","","","","","","","","","","","",""],[1,0,0,"RoleAvater_name_1",null,0,null,"74113","63594","92724","63595","76619","63890","65009",null,null,0,null,null,null,39817,0,0,0],[2,0,1,"RoleAvater_name_1",null,0,null,"63593",null,null,null,null,null,null,null,null,0,null,null,null,105072,106872,1,500],[3,0,1,"RoleAvater_name_2",null,0,null,"64542",null,null,null,null,null,null,null,null,0,null,null,null,105061,106872,1,1500],[4,0,1,"RoleAvater_name_3",null,0,null,"74680",null,null,null,null,null,null,null,null,0,null,null,null,105062,106872,1,2000],[5,0,1,"RoleAvater_name_4",null,0,null,"65614",null,null,null,null,null,null,null,null,0,null,null,null,105067,106872,1,500],[6,0,1,"RoleAvater_name_5",null,0,null,"66696",null,null,null,null,null,null,null,null,0,null,null,null,105063,106872,1,700],[7,0,1,"RoleAvater_name_6",null,0,null,"63686",null,null,null,null,null,null,null,null,0,null,null,null,105107,106872,1,300],[8,0,1,"RoleAvater_name_7",null,0,null,"63674",null,null,null,null,null,null,null,null,0,null,null,null,105110,106872,1,800],[9,0,1,"RoleAvater_name_8",null,0,null,"95543",null,null,null,null,null,null,null,null,0,null,null,null,105064,106872,1,3000],[10,0,1,"RoleAvater_name_9",null,0,null,"65006",null,null,null,null,null,null,null,null,0,null,null,null,105102,106872,1,1000],[11,0,2,"RoleAvater_name_10",null,0,null,null,"64997",null,null,null,null,null,null,null,0,null,null,null,105059,106872,1,300],[12,0,2,"RoleAvater_name_11",null,0,null,null,"64723",null,null,null,null,null,null,null,0,null,null,null,105071,106872,1,300],[13,0,2,"RoleAvater_name_12",null,0,null,null,"64554",null,null,null,null,null,null,null,0,null,null,null,105066,106872,1,800],[14,0,2,"RoleAvater_name_13",null,0,null,null,"64553",null,null,null,null,null,null,null,0,null,null,null,105101,106872,1,500],[15,0,2,"RoleAvater_name_14",null,0,null,null,"63681",null,null,null,null,null,null,null,0,null,null,null,105091,106872,1,800],[16,0,4,"RoleAvater_name_15",null,0,null,null,null,null,null,null,null,"75658",null,null,0,null,null,null,105051,106872,1,300],[17,0,4,"RoleAvater_name_16",null,0,null,null,null,null,null,null,null,"63596",null,null,0,null,null,null,105089,106872,1,500],[18,0,4,"RoleAvater_name_17",null,0,null,null,null,null,null,null,null,"64548",null,null,0,null,null,null,105076,106872,1,1500],[19,0,4,"RoleAvater_name_18",null,0,null,null,null,null,null,null,null,"63885",null,null,0,null,null,null,105118,106872,1,800],[20,0,3,"RoleAvater_name_19",null,0,null,null,null,"null","63887",null,null,null,null,null,0,null,null,null,105120,106872,1,3000],[21,0,3,"RoleAvater_name_20",null,0,null,null,null,"null","94781",null,null,null,null,null,0,null,null,null,105055,106872,1,3000]];
export interface IRoleAvatarElement extends IElementBase{
 	/**id*/
	ID:number
	/**主分类(0=外观 ，>=7挂件类)*/
	mainType:number
	/**分类(显示用标签)*/
	type:number
	/**名字*/
	name:string
	/**简介*/
	desc:string
	/**排序权重越大越靠前*/
	sortValue:number
	/**身体数据，捏脸必填，设置上半身的时候会设置*/
	body:string
	/**上半身*/
	bodyupper:string
	/**下半身*/
	bodylower:string
	/**前发*/
	hairfront:string
	/**后发*/
	hairlate:string
	/**脸部*/
	head:string
	/**手*/
	gloves:string
	/**脚*/
	shoe:string
	/**挂件*/
	effectGuid:string
	/**材质*/
	matGuid:string
	/**挂点*/
	socket:number
	/**相对位置*/
	posOffset:Array<number>
	/**相对缩放*/
	scale:Array<number>
	/**相对旋转*/
	rotate:Array<number>
	/**装备图标*/
	icon:number
	/**价格图标*/
	priceIcon:number
	/**价格类型*/
	priceType:number
	/**价格*/
	price:number
 } 
export class RoleAvatarConfig extends ConfigBase<IRoleAvatarElement>{
	constructor(){
		super(EXCELDATA);
	}

}