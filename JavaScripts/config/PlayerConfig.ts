import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","CameraHight","CameraRotation","climbTime","hpDown","HeightDie","HeightDown","MaxStamina","MaxHP","MaxLife"],["","","","","","","","","",""],[1,new mw.Vector(0,0,0),new mw.Vector(0,-4.5,0),1,1,1000,20,100,100,1]];
export interface IPlayerConfigElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**开始菜单相机偏移*/
	CameraHight:mw.Vector
	/**开始菜单摄像机旋转*/
	CameraRotation:mw.Vector
	/**过多长时间掉体力（血）一次*/
	climbTime:number
	/**因为没体力每次掉多少血*/
	hpDown:number
	/**在多少高度时会直接传送回去*/
	HeightDie:number
	/**传送回去时掉多少血*/
	HeightDown:number
	/**玩家体力上限 */
	MaxStamina:number
	/**玩家血量上限 */
	MaxHP:number
	/**玩家生命上限 */
	MaxLife:number
 } 
export class PlayerConfigConfig extends ConfigBase<IPlayerConfigElement>{
	constructor(){
		super(EXCELDATA);
	}

}