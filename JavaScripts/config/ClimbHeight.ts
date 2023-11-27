import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","height","staminaDown"],["","",""],[1,0,0.3],[2,6300,1],[3,10200,1.5],[4,16000,2.5]];
export interface IClimbHeightElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**爬山高度*/
	height:number
	/**每次掉多少体力*/
	staminaDown:number
 } 
export class ClimbHeightConfig extends ConfigBase<IClimbHeightElement>{
	constructor(){
		super(EXCELDATA);
	}

}