import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Time","SkyBoxBright","Horizon","CloudOpen","SunOpen","MoonOpen","StarOpen"],["","","","","","","",""],[1,180,0.8,2,true,false,false,true],[2,360,0.15,10,true,false,true,true],[3,540,3,2.5,true,false,false,false]];
export interface ITimeElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**时间段(秒)*/
	Time:number
	/**天空球亮度*/
	SkyBoxBright:number
	/**地平线渐出*/
	Horizon:number
	/**是否开启云*/
	CloudOpen:boolean
	/**是否开启太阳*/
	SunOpen:boolean
	/**是否开启月亮*/
	MoonOpen:boolean
	/**是否开启星星*/
	StarOpen:boolean
 } 
export class TimeConfig extends ConfigBase<ITimeElement>{
	constructor(){
		super(EXCELDATA);
	}

}