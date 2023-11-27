import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","height","hpDown"],["","",""],[1,550,5],[2,650,10],[3,800,15],[4,1000,20]];
export interface IFallHeightElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**掉落高度*/
	height:number
	/**掉多少HP*/
	hpDown:number
 } 
export class FallHeightConfig extends ConfigBase<IFallHeightElement>{
	constructor(){
		super(EXCELDATA);
	}

}