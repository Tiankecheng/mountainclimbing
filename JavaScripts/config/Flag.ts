import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","PosOffset","Scale","Rotate","Guid"],["","","","","",""],[1,"红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"0D0AB59B"],[2,"蓝色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"D71B6F70"],[3,"黄色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"6D94EF57"],[4,"波纹",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"90A763EF"],[5,"绿色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"12DA84DD"],[6,"黑色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"811C5E60"],[7,"橙色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"7C3536F9"],[8,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"BFB77888"],[9,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"5917B000"],[10,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"F2188DA3"],[11,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"03532579"],[12,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"CB5978A2"],[13,"粉红色",new mw.Vector(0,0,-120),new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,-30),"F518413F"]];
export interface IFlagElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**旗帜名字*/
	Name:string
	/**相对位置*/
	PosOffset:mw.Vector
	/**相对缩放*/
	Scale:mw.Vector
	/**相对旋转*/
	Rotate:mw.Vector
	/**场景中旗帜物体guid*/
	Guid:string
 } 
export class FlagConfig extends ConfigBase<IFlagElement>{
	constructor(){
		super(EXCELDATA);
	}

}