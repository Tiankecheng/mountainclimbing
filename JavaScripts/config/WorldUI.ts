import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Text","Text_C","Color","Pos","Scale","Rotate"],["","Language","","","","",""],[1,"U3DUI_text_1","凯尔特山","57DEFFFF",new mw.Vector(-11072.55,-8125.21,1845.86),new mw.Vector(5,5,5),new mw.Vector(0,0,170)],[2,"U3DUI_text_2","好运桥","F9FF13FF",new mw.Vector(-2539.35,-10587.76,7734.89),new mw.Vector(5,5,5),new mw.Vector(0,0,-180)],[3,"U3DUI_text_3","地心湖","2426FFFF",new mw.Vector(2939.85,-5400.72,1137.53),new mw.Vector(5,5,5),new mw.Vector(0,0,-60)],[4,"U3DUI_text_4","蒙特尔高峰","30FF40FF",new mw.Vector(12580.57,874.44,13296.31),new mw.Vector(5,5,5),new mw.Vector(0,0,160)],[5,"U3DUI_text_5","极端裂缝","FF0009FF",new mw.Vector(3838.71,5191.28,5247.9),new mw.Vector(5,5,5),new mw.Vector(0,0,30)],[6,"U3DUI_text_6","巨龙顶端","A39400FF",new mw.Vector(-2530.05,12046.18,24776.17),new mw.Vector(5,5,5),new mw.Vector(0,0,-70)],[7,"U3DUI_text_7","插旗点","FFE803FF",new mw.Vector(-510.24,10246.83,24276.81),new mw.Vector(1,1,1),new mw.Vector(0,0,-100)],[8,"U3DUI_text_8","由此向上","FFFA3AFF",new mw.Vector(-11072.55,-8125.21,1480.86),new mw.Vector(4,4,4),new mw.Vector(0,0,170)],[9,"U3DUI_text_9","由此向下","4775FFFF",new mw.Vector(4013.55,-9299.39,4359.54),new mw.Vector(2,2,2),new mw.Vector(0,0,-70)]];
export interface IWorldUIElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**UI文本*/
	Text:string
	/**UI文本（中文）*/
	Text_C:string
	/**文本颜色*/
	Color:string
	/**世界坐标*/
	Pos:mw.Vector
	/**绝对缩放*/
	Scale:mw.Vector
	/**绝对旋转*/
	Rotate:mw.Vector
 } 
export class WorldUIConfig extends ConfigBase<IWorldUIElement>{
	constructor(){
		super(EXCELDATA);
	}

}