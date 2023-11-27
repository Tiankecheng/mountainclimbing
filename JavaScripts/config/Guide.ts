import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Uiname","Event1","Event2","Event3","Event4","Event5","Event6","Event7","Event8","Event9"],["","","","","","","","","","",""],[1,"P_GameStart","1","startBtn",null,null,null,null,null,null,null],[2,"P_LoginUI","1","mGuide1",null,null,null,null,null,null,null],[3,"P_LobbyUI","1","mHpGuideImg","mStaminaGuideImg","1","mGuideImg","1",null,null,null],[4,"P_PickUp","1","-15073.57|1345.52|987.75","1","mPickup","1","-15018.57|1665.52|987.75","1","mPickup","1"],[5,"P_BagMain","1","mGuideImg1","1","mUseBtn","1",null,null,null,null],[6,"P_EventUI","1","-16428.29|255.78|957.7","1","mGuideImg",null,null,null,null,null],[7,"P_EventDecUI","1","mBtn",null,null,null,null,null,null,null],[8,"P_LobbyUI","1","-15018.57|1465.52|987.75","-12307.63|-7537.22|930","1",null,null,null,null,null]];
export interface IGuideElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**引导的UI名字*/
	Uiname:string
	/**触发事件1*/
	Event1:string
	/**触发事件2*/
	Event2:string
	/**触发事件3*/
	Event3:string
	/**触发事件4*/
	Event4:string
	/**触发事件5*/
	Event5:string
	/**触发事件6*/
	Event6:string
	/**触发事件7*/
	Event7:string
	/**触发事件8*/
	Event8:string
	/**触发事件9*/
	Event9:string
 } 
export class GuideConfig extends ConfigBase<IGuideElement>{
	constructor(){
		super(EXCELDATA);
	}

}