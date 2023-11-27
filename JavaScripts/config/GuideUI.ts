import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Text","Text_c","TextSize","TextPos","StartEvent","EndEvent","IsShowTip"],["","Language","","","","","",""],[1,"GuideUI_text_1","点击开始进入游戏",30,[400,484],[1,1],[2,1],false],[2,"GuideUI_text_2","欢迎来到登山训练营！你可以在这里选择你喜欢的旗帜进行爬山挑战！",35,[0,-4],[2,1],[2,2],false],[3,"GuideUI_text_3","这是你的生命值，从高处跌落会损失生命值，生命值为0时你将会死亡，救援队会带你回到这里并重新开始挑战。 ",35,[0,164],[3,1],[3,2],true],[4,"GuideUI_text_4","这是你的体力，你在移动时会损失体力",35,[304,76],[3,2],[3,3],true],[5,"GuideUI_text_5","靠近篝火可以恢复体力，使用物品可以恢复体力和生命值",30,[0,164],[3,3],[3,4],false],[6,"GuideUI_text_6","当你没有体力的时候会开始损失生命值！",30,[0,164],[3,4],[3,5],true],[7,"GuideUI_text_7","你现在的体力和血量很不健康！现在快去拾取桌子上的物品！",30,[0,164],[3,5],[4,4],false],[8,"GuideUI_text_8","快使用你刚刚捡到的绷带和罐头进行恢复吧！ ",30,[0,164],[4,8],[5,4],false],[9,"GuideUI_text_9","靠近篝火会恢复体力，同时可以进行存档，在你迷路的时候找找篝火和火把，它们会带你走出困境！",30,[0,164],[6,1],[6,2],false],[10,"GuideUI_text_10","你碰到了挑战中随机事件！进行对你有利的选择吧！",30,[0,164],[6,2],[6,4],0],[11,"GuideUI_text_11","刚刚你做出了你的第一个选择，回到帐篷进行物品补给，我们要开始爬山挑战了！",30,[68,52],[8,1],[8,2],false],[12,"GuideUI_text_14","相信你已经准备好了！现在我们前往第一个营地！",30,[68,52],[8,2],[8,3],false]];
export interface IGuideUIElement extends IElementBase{
 	/**q_id*/
	ID:number
	/**UI英文*/
	Text:string
	/**UI中文*/
	Text_c:string
	/**字体大小*/
	TextSize:number
	/**字体位置*/
	TextPos:Array<number>
	/**触发事件*/
	StartEvent:Array<number>
	/**结束事件*/
	EndEvent:Array<number>
	/**是否显示下一步提示*/
	IsShowTip:boolean
 } 
export class GuideUIConfig extends ConfigBase<IGuideUIElement>{
	constructor(){
		super(EXCELDATA);
	}

}