import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"Setup_Title_text_1","Settings","设置"],[2,"Setup_Title_text_2","Respawn","重生"],[3,"Setup_Title_text_3","Store","商店"],[4,"UIEvent_SelecBtn","Select","选择"],[5,"UIEvent_titleText","Event","事件"],[6,"Item_name_1","Sterile bandage","无菌绷带"],[7,"Item_name_2","Canned Beef","牛肉罐头"],[8,"Item_name_3","Banknote","钞票"],[9,"Item_name_4","Surgical Kits","手术包"],[10,"Item_name_5","Signal Flare","信号弹"],[11,"Item_name_6","First Aid Kit","急救包"],[12,"Item_name_7","Flag","旗帜"],[13,"UIItem_SelecBtn_1","Select","选择"],[14,"UIItem_SelecBtn_2","Discard","丢弃"],[15,"Item_Dec_1","Restore 30 HP","恢复30点生命值"],[16,"Item_Dec_2","Restore 30 Stamina","恢复30点体力值"],[17,"Item_Dec_3","Get 100 Gold","获得100点金钱"],[18,"Item_Dec_4","Lose 30 Stamina, Restore 50 HP","减少30点体力，恢复50点生命值"],[19,"Item_Dec_5","Restore 30 HP, Respawn at last checkpoint","恢复30点生命值并立即返回上个存档点"],[20,"Item_Dec_6","Restore 20 HP and 20 Stamina","恢复20点生命与20点体力"],[21,"Item_Dec_7","Can be raised on the summit, receive extra money when reaching summit. ","可以把它插在山顶上，携带它登顶获得额外钞票！"],[22,"Event_name_1","Supply Box","打开补给箱"],[23,"Event_name_2","Rescue Team","遇上救援队"],[24,"Event_name_3","A Helping Paw","生灵之助"],[25,"Event_name_4","Competition","参加运动大会"],[26,"Event_name_5","Treasure Hunt","寻宝探险"],[27,"Event_name_6","Blizzard","遭遇暴风雪"],[28,"Event_name_7","Vending machine","自动贩卖机"],[29,"Event_name_8","Aid climbers","援助登山者"],[30,"Event_name_9","what is this?","这是什么？"],[31,"Event_name_10","Treasure bag","百宝袋"],[32,"Event_name_11","Gold!","金币！"],[33,"Event_name_12","Banknotes","少许金币"],[34,"Event_name_13","Lots of banknotes","大量金币"],[35,"Event_name_14","Covered in Snow","银装素裹"],[36,"Event_name_15","Inner Potential","冲刺"],[37,"Event_name_16","A Relief","遗失的氧气瓶"],[38,"Event_name_17","A Friend in Need","路遇同伴"],[39,"Event_name_18","Take A Nap","安全吊床点"],[40,"Event_name_19","Special Picnic","野炊聚餐"],[41,"Event_name_20","Avalanche","雪崩"],[42,"Event_name_21","Sprained Ankle","崴伤"],[43,"Event_name_22","Frostbite","冻伤"],[44,"Event_name_23","Special Rescue","救助小动物"],[45,"Event_name_24","Fall into Ice Cave","落入冰窟"],[46,"Event_name_25","Worshiper","祭拜神龛"],[47,"Event_name_26","Travel Light","轻装上阵"],[48,"Event_name_27","Safety Helmet","安全头盔"],[49,"Event_name_28","Extra Supplies","额外补给"],[50,"Event_name_29","Bounty Hunter","赏金猎人"],[51,"Event_name_30","Self-help Remedy","自救良方"],[52,"Event_name_31","Portable Heater","便携加热器"],[53,"Event_Dec_1","There is a supply box in the camp! You opened the box and found a sterile bandage.","营地里有一个专门为了帮助探险家而准备的补给箱！你打开了箱子！"],[54,"Event_Dec_2","A group of medical rescue teams came to help those in need. Before leaving, they gave you a sterile bandage.","营地里面来了一群医疗救援队，他们是来这里救助那些出现危险的探险家。医生送了你一件物品，并提醒你要注意安全。\n"],[55,"Event_Dec_3","A fox suddenly broke into the camp! Before leaving, it leads you to a box containing canned beef that is in good condition!","营地里突然闯进了一只小动物！它领着你找到了一个箱子，箱子里面有一份完好且在保质期的牛肉罐头！当你正想要去感谢小动物时，却发现它已经消失不见了。"],[56,"Event_Dec_4","Explorers in the camp held a climbing competition! Time to show off your skills!","营地里面的探险家们举行了登山比赛，冠军有丰厚的奖金！你摩拳擦掌，是时候大展身手了！"],[57,"Event_Dec_5","You found an unknown cave near your camp that may hold treasures! You decided to explore the cave.","你在营地附近发现了一个可疑的洞窟，里面也许会有未知的宝藏！你做足了准备，向着这个未知的洞窟迈进。"],[58,"Event_Dec_6","A sudden blizzard left you lost, but luckily you found a flare.","突如其来的暴风雪让你迷失了方向，万幸的是你找到了一枚信号弹。"],[59,"Event_Dec_7","There is a vending machine in the camp where you can spend $100 to restore all HP and Stamina","营地里有一个自动贩卖机器，你可以花上100块钱来购买东西进行修整，将自己的状态恢复到最佳"],[60,"Event_Dec_8","A dying climber came to your camp. You used your items and managed to bring him back to life.","你的营地里来了一位奄奄一息的登山者，为了帮助他，你用掉了你的物品，成功让他缓了过来。为了对你表达感谢，他也给了你相应的报酬。"],[61,"Event_Dec_9","There's a tightly sealed supply box in the camp.It took you a while to open it, and there's only one item inside.","营地里有一个专门为了帮助探险家的补给箱！可是箱子封的很紧，看来你得花一番功夫才能把它打开，最后发现里面只有一个物品。"],[62,"Event_Dec_10","You found a bag with an item that could come in handy!","你在路途中发现了一个袋子，里面有一个物品可以派的上用场！"],[63,"Event_Dec_11","You found some banknotes. Was it accidentally lost or deliberately left?","你在这人迹罕至的路上发现了一些钞票。是过路人不小心遗失的，还是他故意赠送给有缘人的呢？\n"],[64,"Event_Dec_12","You found a few banknotes. Was it accidentally lost or deliberately left?","你在这人迹罕至的路上发现了少许钞票。是过路人不小心遗失的，还是他故意赠送给有缘人的呢？"],[65,"Event_Dec_13","You discovered a treasure buried in the mountain!","你发现了雪山上埋藏的宝藏！看着沉甸甸的金币袋子，你不由得笑出了声来。"],[66,"Event_Dec_14","Looking at the spectacular sight, you seem to forget all the pain and fatigue.","看着皑皑的雪山，你似乎忘记了身上的疼痛与疲惫。在如此美景面前，身上的这点小问题又能算的上什么呢？"],[67,"Event_Dec_15","You are exhausted. But thinking of the great scenery ahead and your dream to reach the top, your body is full of strength again.","现在的你经历了大量的运动，身心已然十分疲惫。但是想到眼前的高耸的雪山与登顶的志向，双腿便不由地继续迈动起来，身体也重新充满了力量。"],[68,"Event_Dec_16","You found an oxygen cylinder with little oxygen left. You took a deep breath and felt much better.","你在路边发现了一个氧气瓶，可惜的是里面仅剩一点点氧气。你用光了它，感觉舒服了不少。"],[69,"Event_Dec_17","Along the way, you met fellow expedition members. They helped you bandage your wounds.","你在途中遇到了和你一样的探险队员。他们对你伸出了援手，帮你包扎了伤口。"],[70,"Event_Dec_18","You found a possum that brought you a herb. Why is it here to help you?","你在路途中发现了一个不怕人的小动物。它向你衔来了一株草药。你感到非常诧异：为什么它要来这里帮助人类呢？"],[71,"Event_Dec_19","You found a safe spot to hang your sleeping bag and took a nap.","你发现这里岩石坚固，有一处可以悬挂吊床睡袋的安全点，于是决定小睡一会。"],[72,"Event_Dec_20","You met a group of expedition members who were having dinner, and they invited you to join them.","你在途中发现了一群正在进行集体聚餐的探险队员，他们盛情邀请了你去参加他们的聚会。你在聚会中大快朵颐，喜不自胜。"],[73,"Event_Dec_21","You were hit by an avalanche! You were only slightly injured, but must return to camp.","你遭遇了雪崩！不过你在发现迹象时就进行了躲避，所以仅仅是受了轻伤。但是现在你必须先返回营地好好修整一番。"],[74,"Event_Dec_22","The complex paths made you sprain your ankle.","雪山复杂艰险的路径让你不小心崴伤。\n"],[75,"Event_Dec_23","You examined yourself and found that you had frostbite. Better treat the wounds before you lose consciousness.","你检查了全身，发现自己身上出现了冻伤，看起来得在失去知觉前紧急处理一下身上的伤口。"],[76,"Event_Dec_24","There's an injured deer on the road! It took you some time to bandage its wounds. Before leaving, it glanced at you.Maybe it will return the favor?","路边有一个受伤的小动物！你花费了一番功夫，终于让它能够再度行走。走之前它特地回过头来向你看了一眼，也许会回来报恩？"],[77,"Event_Dec_25","You went into an avalanche! Fortunately, you ran away and finally escaped.","你遭遇了雪崩！不过幸好你离地比较远，于是你拔腿就跑，在一顿追逐后，终于逃离了雪崩的范围"],[78,"Event_Dec_26","You stepped into an ice cave! Stamina consumption has greatly increased.","你一不小心踩进了冰窟中！现在的你全身湿透，体力消耗大幅增加。"],[79,"Event_Dec_27","You are in a blizzard! Maybe you can go back to the campfire and wait for the blizzard to pass?","你遭遇了暴风雪！现在的你不得不在极为严酷的环境下继续前行了！或者你也可以暂避锋芒，回到篝火旁等待暴风雪过去？"],[80,"Event_Dec_28","You found a small shrine made of stones and a flag. You bowed to this shrine, maybe something good will happen.","你在路边发现了一个用石头堆成的小塔，上面还有旗帜在随风飘动。你对着这个小巧而简陋的神龛拜了一拜，也许会有好事发生？"],[81,"Event_Dec_29","Too many items slowed you down!","过多的物品反而拖累了你的攀登！"],[82,"Event_Dec_30","There is a safety helmet in the camp, you put it on.","营地中有一副安全头盔，你戴上了它。"],[83,"Event_Dec_31","Other climbers brought extra medical supplies to your camp","你的营地在其他探险队员的帮助下多出部分医疗用品。"],[84,"Event_Dec_32","You've found a sign near the camp. Everyone is looking for an explorer like you.","你在营地旁边发现了一张告示，大家都在寻找你这样的无畏探险家！"],[85,"Event_Dec_33","You found a self-rescue book, now you can make better use of your items.","你在营地中找到了一本登山自救求生知识的书，现在，你可以更好地利用你的物品了。"],[86,"Event_Dec_34","You found a portable heater in the camp. Now you can have hot meals even on mountains!","你在营地中找到了一个便携的加热器。现在的你，即使是在雪山上都可以吃到热腾腾的饭菜了！"],[87,"GuideUI_text_1","Tap to start","点击开始进入游戏"],[88,"GuideUI_text_2","Welcome to the climbing camp! Your goal is to reach the summit! Choose your flag and start your adventure!","欢迎来到登山训练营！你的目标是爬上最高的山峰！在这里选择你喜欢的旗帜进行爬山挑战！"],[89,"GuideUI_text_3","This is your HP, you will lose HP when falling and die when HP is reduced to 0","这是你的生命值，从高处跌落会损失生命值，生命值为0时你将会死亡，救援队会带你回到这里并重新开始挑战。 "],[90,"GuideUI_text_4","This is your stamina, moving will cost stamina","这是你的体力，你在移动时会损失体力"],[91,"GuideUI_text_5","Getting close to a campfire can restore stamina, and using items can restore stamina and HP","靠近篝火可以恢复体力，使用物品可以恢复体力和生命值"],[92,"GuideUI_text_6","You will lose HP when out of stamina!","当你没有体力的时候会开始损失生命值！"],[93,"GuideUI_text_7","You are in terrible condition! Pick up the items on the table!","你现在的体力和血量很不健康！现在快去拾取桌子上的物品！"],[94,"GuideUI_text_8","Use the items you just got to recover!","快使用你刚刚捡到的绷带和罐头进行恢复吧！ "],[95,"GuideUI_text_9","Getting close to a campfire can restore stamina and save your game. Try to find campfires and torches when you are lost, they will guide you!","靠近篝火会恢复体力，同时可以进行存档，在你迷路的时候找找篝火和火把，它们会带你走出困境！"],[96,"GuideUI_text_10","You have encountered a random event! Make your choice!","你碰到了挑战中的随机事件！进行对你有利的选择吧！"],[97,"GuideUI_text_11","You just made your first choice, now go back to the camp to resupply, we are about to start climbing!","刚刚你做出了你的第一个选择，可以回到帐篷进行物品补给，我们要开始爬山挑战了！"],[98,"RoleAvater_name_1","Hip Hop T-Shirt","嘻哈T恤"],[99,"RoleAvater_name_2","Tribute","致敬经典"],[100,"RoleAvater_name_3","Tuxedo","小丑"],[101,"RoleAvater_name_4","Sports T-shirt","运动短袖"],[102,"RoleAvater_name_5","Suit","绅士服"],[103,"RoleAvater_name_6","Short Sleeves","普通短袖"],[104,"RoleAvater_name_7","Workwear","韩式工装"],[105,"RoleAvater_name_8","Mecha","运动机甲"],[106,"RoleAvater_name_9","Hoodie","运动卫衣"],[107,"RoleAvater_name_10","Striped Pants","条纹裤"],[108,"RoleAvater_name_11","Jeans","牛仔裤"],[109,"RoleAvater_name_12","Tribute","致敬经典"],[110,"RoleAvater_name_13","Printed Shorts","印花短裤"],[111,"RoleAvater_name_14","Work Pants","工作裤"],[112,"RoleAvater_name_15","Sneakers","运动鞋"],[113,"RoleAvater_name_16","Running Shoes","跑鞋"],[114,"RoleAvater_name_17","Mecha","运动机甲"],[115,"RoleAvater_name_18","Lightweight Shoes","轻便跑鞋"],[116,"RoleAvater_name_19","Mecha Mask","机甲面罩"],[117,"RoleAvater_name_20","Bat mask","蝙蝠面具"],[118,"Text_1","Jump","跳跃"],[119,"Text_2","I LOVE MOUNTAINS","我爱爬山"],[120,"Text_3","START","开始游戏"],[121,"Text_4","Take","拾取"],[122,"Text_5","Checkpoint Activated","进入休息区，存档点已更新"],[123,"Text_6","Rest","休息"],[124,"Text_7","Go","出发"],[125,"Text_8","+ ${0}","增加{0}金币"],[126,"Text_9","Plant The Flag","插上旗子"],[127,"Text_10","Return to Base Camp","返回大本营"],[128,"Text_11","You Reached The Summit!","恭喜你！登顶成功！"],[129,"U3DUI_text_1","Celtic Peak","凯尔特山"],[130,"U3DUI_text_2","Lucky Bridge","好运桥"],[131,"U3DUI_text_3","Geocentric Lake","地心湖"],[132,"U3DUI_text_4","Montel Peak","蒙特尔高峰"],[133,"U3DUI_text_5","Great Crack","极端裂缝"],[134,"U3DUI_text_6","Dragon's Top","巨龙顶端"],[135,"Event_results_1","Sterile Bandage: Restore 30 HP","获得无菌绷带：使用后恢复30点生命值"],[136,"Event_results_2","Canned Beef: Restore 30 Stamina","获得牛肉罐头：使用后恢复30点体力值"],[137,"Event_results_3","Banknote: Get $100 after use","获得钞票：使用后获得100钞票"],[138,"Event_results_4","Surgery Kit: Lose 30 Stamina, Restore 50 HP","获得手术包：使用后减少30点体力，恢复50点生命值"],[139,"Event_results_5","Signal Flare: Restore 30 HP and respawn at last checkpoint","获得信号弹：使用后恢复30点生命值并立即返回上个存档点"],[140,"Event_results_6","First Aid Kit: Restore 20 HP & Stamina","获得急救包：使用后恢复20点生命与20点体力"],[141,"Event_results_7","You spent $100 and restored all HP and Stamina","花费100钞票，回满生命值与体力值"],[142,"Event_results_8","You discarded an item for banknotes","失去一个物品，获得钞票"],[143,"Event_results_9","You got a random item","获得随机物品"],[144,"Event_results_10","You got $100","获得100钞票"],[145,"Event_results_11","You got $200","获得200钞票"],[146,"Event_results_12","You restored 30 HP & Stamina","恢复30点生命值与体力值"],[147,"Event_results_13","You restored 30 HP","恢复30点生命值"],[148,"Event_results_14","You restored 30 Stamina","恢复了30点体力"],[149,"Event_results_15","You lost 10 HP and returned to camp","损失了10点生命值并返回营地"],[150,"Event_results_16","You lost 10 HP","损失了10点生命值"],[151,"Event_results_17","You lost 10 Stamina","损失了10点体力值"],[152,"Event_results_18","Lose Stamina over time for 10s","体力每秒消耗增加2点，持续10秒"],[153,"Event_results_19","You didn't find anything of value...","可惜的是，你在经历了一番探索后并没有发现什么值钱的东西。"],[154,"Event_results_20","Stamina cost is reduced by 0.5 when you have no items","当你的物品栏没有物品时，体力每次消耗降低0.5点"],[155,"Event_results_21","Reduce HP loss from falling by 10","降低每次失足跌落的生命值损失5点"],[156,"Event_results_22","Restore 10 HP when you reach a new camp","每次到达新营地时恢复5点生命值"],[157,"Event_results_23","Get an extra $150 when reach the summit","当你登上山顶时，会额外获得150块钱"],[158,"Event_results_24","Restore 10 HP when using items","你每次使用物品都会恢复10点生命值"],[159,"Event_results_25","Restore 10 Stamina when using items","在每次使用物品时额外恢复10点体力。"],[160,"Event_results_26","Nothing Happened...","无事发生"],[161,"U3DUI_text_7","Flag Point","插旗点"],[162,"Text_12","Sleep","睡觉"],[163,"UIItem_SelecBtn_3","Use","使用"],[164,"Text_13","Volume","声音"],[165,"Text_14","Resume","继续游戏"],[166,"Btn_1","Confirm","确认"],[167,"Role_text_1","Top","上装"],[168,"Role_text_2","Bottom","下装"],[169,"Role_text_3","Headwear","头饰"],[170,"Role_text_4","Shoes","鞋子"],[171,"Role_text_5","Reset","重置"],[172,"Role_text_6","Back","返回"],[173,"Role_text_7","Save","保存装扮"],[174,"GuideUI_text_12","You have acquired the basic skills of a beginner climber, start climbing now!","恭喜你已经具备了一个初级登山者的基本能力，现在开始攀登吧！"],[175,"GuideUI_text_13","Now you're prepared! Get out of the camp and reach the first campfire","现在你已经准备好了！尝试走出营地到达第一个篝火吧"],[176,"List_text_1","Rank","排名"],[177,"List_text_2","Name","昵称"],[178,"List_text_3","Score","篝火点"],[179,"List_text_4","Summit","登顶数"],[180,"List_text_5","Altitude","当前海拔"],[181,"Text_15","Insufficient Money","您的钱不够"],[182,"Text_16","Costume Not Owned","当前装扮包含未拥有套装，请购买后再保存"],[183,"Text_17","No More Costumes","没有更多了"],[184,"Text_18","Bag","背包"],[185,"U3DUI_text_8","Go Up","由此向上"],[186,"U3DUI_text_9","Go Down","由此向下"],[187,"Text_19","Insufficient Capacity","背包已满，无法获得物品"],[188,"GuideUI_text_14","I believe you are ready! Now let's go to the first camp!","相信你已经准备好了！现在我们前往第一个营地！"],[189,"Text_20","Failed…","你失败了"],[190,"Text_21","Rescue team is on the way......","救援队正在路上......"],[191,"Text_22","Retry","再来一次"],[192,"Text_23","Next","下一步"],[193,"Text_24","Skip","跳过"],[194,"Text_25","Congratulations on getting {0}!","恭喜获得{0}!"],[195,"avd_text_1","Cable car down","乘坐下山缆车"],[196,"avd_text_2","Cable car up","乘坐上山缆车"],[197,"avd_text_3","Terminal","终点"],[198,"avd_text_4","Need","我很需要"],[199,"avd_text_5","No","我能坚持"],[200,"avd_text_6","I can keep watching ads to get high-end hiking boots, experience the joy of flying, and climb one step faster!","观看广告获得高级登山靴，体验飞一般的快乐，登山快人一步！"],[201,"avd_text_7","Watch ads to get supplies from the rescue team and get a random item!","观看广告获得救援队补给，随机获得一件物品！"],[202,"avd_text_8","Point me to supply","点我补给"],[203,"avd_text_9","I can fly!","我会飞了！"],[204,"avd_text_10","Ride","乘坐缆车"]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名字索引*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**设置*/
	get Setup_Title_text_1():ILanguageElement{return this.getElement(1)};
	/**重生*/
	get Setup_Title_text_2():ILanguageElement{return this.getElement(2)};
	/**商店*/
	get Setup_Title_text_3():ILanguageElement{return this.getElement(3)};
	/**选择*/
	get UIEvent_SelecBtn():ILanguageElement{return this.getElement(4)};
	/**事件*/
	get UIEvent_titleText():ILanguageElement{return this.getElement(5)};
	/**无菌绷带*/
	get Item_name_1():ILanguageElement{return this.getElement(6)};
	/**牛肉罐头*/
	get Item_name_2():ILanguageElement{return this.getElement(7)};
	/**钞票*/
	get Item_name_3():ILanguageElement{return this.getElement(8)};
	/**手术包*/
	get Item_name_4():ILanguageElement{return this.getElement(9)};
	/**信号弹*/
	get Item_name_5():ILanguageElement{return this.getElement(10)};
	/**急救包*/
	get Item_name_6():ILanguageElement{return this.getElement(11)};
	/**旗帜*/
	get Item_name_7():ILanguageElement{return this.getElement(12)};
	/**选择*/
	get UIItem_SelecBtn_1():ILanguageElement{return this.getElement(13)};
	/**丢弃*/
	get UIItem_SelecBtn_2():ILanguageElement{return this.getElement(14)};
	/**恢复30点生命值*/
	get Item_Dec_1():ILanguageElement{return this.getElement(15)};
	/**恢复30点体力值*/
	get Item_Dec_2():ILanguageElement{return this.getElement(16)};
	/**获得100点金钱*/
	get Item_Dec_3():ILanguageElement{return this.getElement(17)};
	/**减少30点体力，恢复50点生命值*/
	get Item_Dec_4():ILanguageElement{return this.getElement(18)};
	/**恢复30点生命值并立即返回上个存档点*/
	get Item_Dec_5():ILanguageElement{return this.getElement(19)};
	/**恢复20点生命与20点体力*/
	get Item_Dec_6():ILanguageElement{return this.getElement(20)};
	/**可以把它插在山顶上，携带它登顶获得额外钞票！*/
	get Item_Dec_7():ILanguageElement{return this.getElement(21)};
	/**打开补给箱*/
	get Event_name_1():ILanguageElement{return this.getElement(22)};
	/**遇上救援队*/
	get Event_name_2():ILanguageElement{return this.getElement(23)};
	/**生灵之助*/
	get Event_name_3():ILanguageElement{return this.getElement(24)};
	/**参加运动大会*/
	get Event_name_4():ILanguageElement{return this.getElement(25)};
	/**寻宝探险*/
	get Event_name_5():ILanguageElement{return this.getElement(26)};
	/**遭遇暴风雪*/
	get Event_name_6():ILanguageElement{return this.getElement(27)};
	/**自动贩卖机*/
	get Event_name_7():ILanguageElement{return this.getElement(28)};
	/**援助登山者*/
	get Event_name_8():ILanguageElement{return this.getElement(29)};
	/**这是什么？*/
	get Event_name_9():ILanguageElement{return this.getElement(30)};
	/**百宝袋*/
	get Event_name_10():ILanguageElement{return this.getElement(31)};
	/**金币！*/
	get Event_name_11():ILanguageElement{return this.getElement(32)};
	/**少许金币*/
	get Event_name_12():ILanguageElement{return this.getElement(33)};
	/**大量金币*/
	get Event_name_13():ILanguageElement{return this.getElement(34)};
	/**银装素裹*/
	get Event_name_14():ILanguageElement{return this.getElement(35)};
	/**冲刺*/
	get Event_name_15():ILanguageElement{return this.getElement(36)};
	/**遗失的氧气瓶*/
	get Event_name_16():ILanguageElement{return this.getElement(37)};
	/**路遇同伴*/
	get Event_name_17():ILanguageElement{return this.getElement(38)};
	/**安全吊床点*/
	get Event_name_18():ILanguageElement{return this.getElement(39)};
	/**野炊聚餐*/
	get Event_name_19():ILanguageElement{return this.getElement(40)};
	/**雪崩*/
	get Event_name_20():ILanguageElement{return this.getElement(41)};
	/**崴伤*/
	get Event_name_21():ILanguageElement{return this.getElement(42)};
	/**冻伤*/
	get Event_name_22():ILanguageElement{return this.getElement(43)};
	/**救助小动物*/
	get Event_name_23():ILanguageElement{return this.getElement(44)};
	/**落入冰窟*/
	get Event_name_24():ILanguageElement{return this.getElement(45)};
	/**祭拜神龛*/
	get Event_name_25():ILanguageElement{return this.getElement(46)};
	/**轻装上阵*/
	get Event_name_26():ILanguageElement{return this.getElement(47)};
	/**安全头盔*/
	get Event_name_27():ILanguageElement{return this.getElement(48)};
	/**额外补给*/
	get Event_name_28():ILanguageElement{return this.getElement(49)};
	/**赏金猎人*/
	get Event_name_29():ILanguageElement{return this.getElement(50)};
	/**自救良方*/
	get Event_name_30():ILanguageElement{return this.getElement(51)};
	/**便携加热器*/
	get Event_name_31():ILanguageElement{return this.getElement(52)};
	/**营地里有一个专门为了帮助探险家而准备的补给箱！你打开了箱子！*/
	get Event_Dec_1():ILanguageElement{return this.getElement(53)};
	/**营地里面来了一群医疗救援队，他们是来这里救助那些出现危险的探险家。医生送了你一件物品，并提醒你要注意安全。
*/
	get Event_Dec_2():ILanguageElement{return this.getElement(54)};
	/**营地里突然闯进了一只小动物！它领着你找到了一个箱子，箱子里面有一份完好且在保质期的牛肉罐头！当你正想要去感谢小动物时，却发现它已经消失不见了。*/
	get Event_Dec_3():ILanguageElement{return this.getElement(55)};
	/**营地里面的探险家们举行了登山比赛，冠军有丰厚的奖金！你摩拳擦掌，是时候大展身手了！*/
	get Event_Dec_4():ILanguageElement{return this.getElement(56)};
	/**你在营地附近发现了一个可疑的洞窟，里面也许会有未知的宝藏！你做足了准备，向着这个未知的洞窟迈进。*/
	get Event_Dec_5():ILanguageElement{return this.getElement(57)};
	/**突如其来的暴风雪让你迷失了方向，万幸的是你找到了一枚信号弹。*/
	get Event_Dec_6():ILanguageElement{return this.getElement(58)};
	/**营地里有一个自动贩卖机器，你可以花上100块钱来购买东西进行修整，将自己的状态恢复到最佳*/
	get Event_Dec_7():ILanguageElement{return this.getElement(59)};
	/**你的营地里来了一位奄奄一息的登山者，为了帮助他，你用掉了你的物品，成功让他缓了过来。为了对你表达感谢，他也给了你相应的报酬。*/
	get Event_Dec_8():ILanguageElement{return this.getElement(60)};
	/**营地里有一个专门为了帮助探险家的补给箱！可是箱子封的很紧，看来你得花一番功夫才能把它打开，最后发现里面只有一个物品。*/
	get Event_Dec_9():ILanguageElement{return this.getElement(61)};
	/**你在路途中发现了一个袋子，里面有一个物品可以派的上用场！*/
	get Event_Dec_10():ILanguageElement{return this.getElement(62)};
	/**你在这人迹罕至的路上发现了一些钞票。是过路人不小心遗失的，还是他故意赠送给有缘人的呢？
*/
	get Event_Dec_11():ILanguageElement{return this.getElement(63)};
	/**你在这人迹罕至的路上发现了少许钞票。是过路人不小心遗失的，还是他故意赠送给有缘人的呢？*/
	get Event_Dec_12():ILanguageElement{return this.getElement(64)};
	/**你发现了雪山上埋藏的宝藏！看着沉甸甸的金币袋子，你不由得笑出了声来。*/
	get Event_Dec_13():ILanguageElement{return this.getElement(65)};
	/**看着皑皑的雪山，你似乎忘记了身上的疼痛与疲惫。在如此美景面前，身上的这点小问题又能算的上什么呢？*/
	get Event_Dec_14():ILanguageElement{return this.getElement(66)};
	/**现在的你经历了大量的运动，身心已然十分疲惫。但是想到眼前的高耸的雪山与登顶的志向，双腿便不由地继续迈动起来，身体也重新充满了力量。*/
	get Event_Dec_15():ILanguageElement{return this.getElement(67)};
	/**你在路边发现了一个氧气瓶，可惜的是里面仅剩一点点氧气。你用光了它，感觉舒服了不少。*/
	get Event_Dec_16():ILanguageElement{return this.getElement(68)};
	/**你在途中遇到了和你一样的探险队员。他们对你伸出了援手，帮你包扎了伤口。*/
	get Event_Dec_17():ILanguageElement{return this.getElement(69)};
	/**你在路途中发现了一个不怕人的小动物。它向你衔来了一株草药。你感到非常诧异：为什么它要来这里帮助人类呢？*/
	get Event_Dec_18():ILanguageElement{return this.getElement(70)};
	/**你发现这里岩石坚固，有一处可以悬挂吊床睡袋的安全点，于是决定小睡一会。*/
	get Event_Dec_19():ILanguageElement{return this.getElement(71)};
	/**你在途中发现了一群正在进行集体聚餐的探险队员，他们盛情邀请了你去参加他们的聚会。你在聚会中大快朵颐，喜不自胜。*/
	get Event_Dec_20():ILanguageElement{return this.getElement(72)};
	/**你遭遇了雪崩！不过你在发现迹象时就进行了躲避，所以仅仅是受了轻伤。但是现在你必须先返回营地好好修整一番。*/
	get Event_Dec_21():ILanguageElement{return this.getElement(73)};
	/**雪山复杂艰险的路径让你不小心崴伤。
*/
	get Event_Dec_22():ILanguageElement{return this.getElement(74)};
	/**你检查了全身，发现自己身上出现了冻伤，看起来得在失去知觉前紧急处理一下身上的伤口。*/
	get Event_Dec_23():ILanguageElement{return this.getElement(75)};
	/**路边有一个受伤的小动物！你花费了一番功夫，终于让它能够再度行走。走之前它特地回过头来向你看了一眼，也许会回来报恩？*/
	get Event_Dec_24():ILanguageElement{return this.getElement(76)};
	/**你遭遇了雪崩！不过幸好你离地比较远，于是你拔腿就跑，在一顿追逐后，终于逃离了雪崩的范围*/
	get Event_Dec_25():ILanguageElement{return this.getElement(77)};
	/**你一不小心踩进了冰窟中！现在的你全身湿透，体力消耗大幅增加。*/
	get Event_Dec_26():ILanguageElement{return this.getElement(78)};
	/**你遭遇了暴风雪！现在的你不得不在极为严酷的环境下继续前行了！或者你也可以暂避锋芒，回到篝火旁等待暴风雪过去？*/
	get Event_Dec_27():ILanguageElement{return this.getElement(79)};
	/**你在路边发现了一个用石头堆成的小塔，上面还有旗帜在随风飘动。你对着这个小巧而简陋的神龛拜了一拜，也许会有好事发生？*/
	get Event_Dec_28():ILanguageElement{return this.getElement(80)};
	/**过多的物品反而拖累了你的攀登！*/
	get Event_Dec_29():ILanguageElement{return this.getElement(81)};
	/**营地中有一副安全头盔，你戴上了它。*/
	get Event_Dec_30():ILanguageElement{return this.getElement(82)};
	/**你的营地在其他探险队员的帮助下多出部分医疗用品。*/
	get Event_Dec_31():ILanguageElement{return this.getElement(83)};
	/**你在营地旁边发现了一张告示，大家都在寻找你这样的无畏探险家！*/
	get Event_Dec_32():ILanguageElement{return this.getElement(84)};
	/**你在营地中找到了一本登山自救求生知识的书，现在，你可以更好地利用你的物品了。*/
	get Event_Dec_33():ILanguageElement{return this.getElement(85)};
	/**你在营地中找到了一个便携的加热器。现在的你，即使是在雪山上都可以吃到热腾腾的饭菜了！*/
	get Event_Dec_34():ILanguageElement{return this.getElement(86)};
	/**点击开始进入游戏*/
	get GuideUI_text_1():ILanguageElement{return this.getElement(87)};
	/**欢迎来到登山训练营！你的目标是爬上最高的山峰！在这里选择你喜欢的旗帜进行爬山挑战！*/
	get GuideUI_text_2():ILanguageElement{return this.getElement(88)};
	/**这是你的生命值，从高处跌落会损失生命值，生命值为0时你将会死亡，救援队会带你回到这里并重新开始挑战。 */
	get GuideUI_text_3():ILanguageElement{return this.getElement(89)};
	/**这是你的体力，你在移动时会损失体力*/
	get GuideUI_text_4():ILanguageElement{return this.getElement(90)};
	/**靠近篝火可以恢复体力，使用物品可以恢复体力和生命值*/
	get GuideUI_text_5():ILanguageElement{return this.getElement(91)};
	/**当你没有体力的时候会开始损失生命值！*/
	get GuideUI_text_6():ILanguageElement{return this.getElement(92)};
	/**你现在的体力和血量很不健康！现在快去拾取桌子上的物品！*/
	get GuideUI_text_7():ILanguageElement{return this.getElement(93)};
	/**快使用你刚刚捡到的绷带和罐头进行恢复吧！ */
	get GuideUI_text_8():ILanguageElement{return this.getElement(94)};
	/**靠近篝火会恢复体力，同时可以进行存档，在你迷路的时候找找篝火和火把，它们会带你走出困境！*/
	get GuideUI_text_9():ILanguageElement{return this.getElement(95)};
	/**你碰到了挑战中的随机事件！进行对你有利的选择吧！*/
	get GuideUI_text_10():ILanguageElement{return this.getElement(96)};
	/**刚刚你做出了你的第一个选择，可以回到帐篷进行物品补给，我们要开始爬山挑战了！*/
	get GuideUI_text_11():ILanguageElement{return this.getElement(97)};
	/**嘻哈T恤*/
	get RoleAvater_name_1():ILanguageElement{return this.getElement(98)};
	/**致敬经典*/
	get RoleAvater_name_2():ILanguageElement{return this.getElement(99)};
	/**小丑*/
	get RoleAvater_name_3():ILanguageElement{return this.getElement(100)};
	/**运动短袖*/
	get RoleAvater_name_4():ILanguageElement{return this.getElement(101)};
	/**绅士服*/
	get RoleAvater_name_5():ILanguageElement{return this.getElement(102)};
	/**普通短袖*/
	get RoleAvater_name_6():ILanguageElement{return this.getElement(103)};
	/**韩式工装*/
	get RoleAvater_name_7():ILanguageElement{return this.getElement(104)};
	/**运动机甲*/
	get RoleAvater_name_8():ILanguageElement{return this.getElement(105)};
	/**运动卫衣*/
	get RoleAvater_name_9():ILanguageElement{return this.getElement(106)};
	/**条纹裤*/
	get RoleAvater_name_10():ILanguageElement{return this.getElement(107)};
	/**牛仔裤*/
	get RoleAvater_name_11():ILanguageElement{return this.getElement(108)};
	/**致敬经典*/
	get RoleAvater_name_12():ILanguageElement{return this.getElement(109)};
	/**印花短裤*/
	get RoleAvater_name_13():ILanguageElement{return this.getElement(110)};
	/**工作裤*/
	get RoleAvater_name_14():ILanguageElement{return this.getElement(111)};
	/**运动鞋*/
	get RoleAvater_name_15():ILanguageElement{return this.getElement(112)};
	/**跑鞋*/
	get RoleAvater_name_16():ILanguageElement{return this.getElement(113)};
	/**运动机甲*/
	get RoleAvater_name_17():ILanguageElement{return this.getElement(114)};
	/**轻便跑鞋*/
	get RoleAvater_name_18():ILanguageElement{return this.getElement(115)};
	/**机甲面罩*/
	get RoleAvater_name_19():ILanguageElement{return this.getElement(116)};
	/**蝙蝠面具*/
	get RoleAvater_name_20():ILanguageElement{return this.getElement(117)};
	/**跳跃*/
	get Text_1():ILanguageElement{return this.getElement(118)};
	/**我爱爬山*/
	get Text_2():ILanguageElement{return this.getElement(119)};
	/**开始游戏*/
	get Text_3():ILanguageElement{return this.getElement(120)};
	/**拾取*/
	get Text_4():ILanguageElement{return this.getElement(121)};
	/**进入休息区，存档点已更新*/
	get Text_5():ILanguageElement{return this.getElement(122)};
	/**休息*/
	get Text_6():ILanguageElement{return this.getElement(123)};
	/**出发*/
	get Text_7():ILanguageElement{return this.getElement(124)};
	/**增加{0}金币*/
	get Text_8():ILanguageElement{return this.getElement(125)};
	/**插上旗子*/
	get Text_9():ILanguageElement{return this.getElement(126)};
	/**返回大本营*/
	get Text_10():ILanguageElement{return this.getElement(127)};
	/**恭喜你！登顶成功！*/
	get Text_11():ILanguageElement{return this.getElement(128)};
	/**凯尔特山*/
	get U3DUI_text_1():ILanguageElement{return this.getElement(129)};
	/**好运桥*/
	get U3DUI_text_2():ILanguageElement{return this.getElement(130)};
	/**地心湖*/
	get U3DUI_text_3():ILanguageElement{return this.getElement(131)};
	/**蒙特尔高峰*/
	get U3DUI_text_4():ILanguageElement{return this.getElement(132)};
	/**极端裂缝*/
	get U3DUI_text_5():ILanguageElement{return this.getElement(133)};
	/**巨龙顶端*/
	get U3DUI_text_6():ILanguageElement{return this.getElement(134)};
	/**获得无菌绷带：使用后恢复30点生命值*/
	get Event_results_1():ILanguageElement{return this.getElement(135)};
	/**获得牛肉罐头：使用后恢复30点体力值*/
	get Event_results_2():ILanguageElement{return this.getElement(136)};
	/**获得钞票：使用后获得100钞票*/
	get Event_results_3():ILanguageElement{return this.getElement(137)};
	/**获得手术包：使用后减少30点体力，恢复50点生命值*/
	get Event_results_4():ILanguageElement{return this.getElement(138)};
	/**获得信号弹：使用后恢复30点生命值并立即返回上个存档点*/
	get Event_results_5():ILanguageElement{return this.getElement(139)};
	/**获得急救包：使用后恢复20点生命与20点体力*/
	get Event_results_6():ILanguageElement{return this.getElement(140)};
	/**花费100钞票，回满生命值与体力值*/
	get Event_results_7():ILanguageElement{return this.getElement(141)};
	/**失去一个物品，获得钞票*/
	get Event_results_8():ILanguageElement{return this.getElement(142)};
	/**获得随机物品*/
	get Event_results_9():ILanguageElement{return this.getElement(143)};
	/**获得100钞票*/
	get Event_results_10():ILanguageElement{return this.getElement(144)};
	/**获得200钞票*/
	get Event_results_11():ILanguageElement{return this.getElement(145)};
	/**恢复30点生命值与体力值*/
	get Event_results_12():ILanguageElement{return this.getElement(146)};
	/**恢复30点生命值*/
	get Event_results_13():ILanguageElement{return this.getElement(147)};
	/**恢复了30点体力*/
	get Event_results_14():ILanguageElement{return this.getElement(148)};
	/**损失了10点生命值并返回营地*/
	get Event_results_15():ILanguageElement{return this.getElement(149)};
	/**损失了10点生命值*/
	get Event_results_16():ILanguageElement{return this.getElement(150)};
	/**损失了10点体力值*/
	get Event_results_17():ILanguageElement{return this.getElement(151)};
	/**体力每秒消耗增加2点，持续10秒*/
	get Event_results_18():ILanguageElement{return this.getElement(152)};
	/**可惜的是，你在经历了一番探索后并没有发现什么值钱的东西。*/
	get Event_results_19():ILanguageElement{return this.getElement(153)};
	/**当你的物品栏没有物品时，体力每次消耗降低0.5点*/
	get Event_results_20():ILanguageElement{return this.getElement(154)};
	/**降低每次失足跌落的生命值损失5点*/
	get Event_results_21():ILanguageElement{return this.getElement(155)};
	/**每次到达新营地时恢复5点生命值*/
	get Event_results_22():ILanguageElement{return this.getElement(156)};
	/**当你登上山顶时，会额外获得150块钱*/
	get Event_results_23():ILanguageElement{return this.getElement(157)};
	/**你每次使用物品都会恢复10点生命值*/
	get Event_results_24():ILanguageElement{return this.getElement(158)};
	/**在每次使用物品时额外恢复10点体力。*/
	get Event_results_25():ILanguageElement{return this.getElement(159)};
	/**无事发生*/
	get Event_results_26():ILanguageElement{return this.getElement(160)};
	/**插旗点*/
	get U3DUI_text_7():ILanguageElement{return this.getElement(161)};
	/**睡觉*/
	get Text_12():ILanguageElement{return this.getElement(162)};
	/**使用*/
	get UIItem_SelecBtn_3():ILanguageElement{return this.getElement(163)};
	/**声音*/
	get Text_13():ILanguageElement{return this.getElement(164)};
	/**继续游戏*/
	get Text_14():ILanguageElement{return this.getElement(165)};
	/**确认*/
	get Btn_1():ILanguageElement{return this.getElement(166)};
	/**上装*/
	get Role_text_1():ILanguageElement{return this.getElement(167)};
	/**下装*/
	get Role_text_2():ILanguageElement{return this.getElement(168)};
	/**头饰*/
	get Role_text_3():ILanguageElement{return this.getElement(169)};
	/**鞋子*/
	get Role_text_4():ILanguageElement{return this.getElement(170)};
	/**重置*/
	get Role_text_5():ILanguageElement{return this.getElement(171)};
	/**返回*/
	get Role_text_6():ILanguageElement{return this.getElement(172)};
	/**保存装扮*/
	get Role_text_7():ILanguageElement{return this.getElement(173)};
	/**恭喜你已经具备了一个初级登山者的基本能力，现在开始攀登吧！*/
	get GuideUI_text_12():ILanguageElement{return this.getElement(174)};
	/**现在你已经准备好了！尝试走出营地到达第一个篝火吧*/
	get GuideUI_text_13():ILanguageElement{return this.getElement(175)};
	/**排名*/
	get List_text_1():ILanguageElement{return this.getElement(176)};
	/**昵称*/
	get List_text_2():ILanguageElement{return this.getElement(177)};
	/**篝火点*/
	get List_text_3():ILanguageElement{return this.getElement(178)};
	/**登顶数*/
	get List_text_4():ILanguageElement{return this.getElement(179)};
	/**当前海拔*/
	get List_text_5():ILanguageElement{return this.getElement(180)};
	/**您的钱不够*/
	get Text_15():ILanguageElement{return this.getElement(181)};
	/**当前装扮包含未拥有套装，请购买后再保存*/
	get Text_16():ILanguageElement{return this.getElement(182)};
	/**没有更多了*/
	get Text_17():ILanguageElement{return this.getElement(183)};
	/**背包*/
	get Text_18():ILanguageElement{return this.getElement(184)};
	/**由此向上*/
	get U3DUI_text_8():ILanguageElement{return this.getElement(185)};
	/**由此向下*/
	get U3DUI_text_9():ILanguageElement{return this.getElement(186)};
	/**背包已满，无法获得物品*/
	get Text_19():ILanguageElement{return this.getElement(187)};
	/**相信你已经准备好了！现在我们前往第一个营地！*/
	get GuideUI_text_14():ILanguageElement{return this.getElement(188)};
	/**你失败了*/
	get Text_20():ILanguageElement{return this.getElement(189)};
	/**救援队正在路上......*/
	get Text_21():ILanguageElement{return this.getElement(190)};
	/**再来一次*/
	get Text_22():ILanguageElement{return this.getElement(191)};
	/**下一步*/
	get Text_23():ILanguageElement{return this.getElement(192)};
	/**跳过*/
	get Text_24():ILanguageElement{return this.getElement(193)};
	/**恭喜获得{0}!*/
	get Text_25():ILanguageElement{return this.getElement(194)};
	/**乘坐下山缆车*/
	get avd_text_1():ILanguageElement{return this.getElement(195)};
	/**乘坐上山缆车*/
	get avd_text_2():ILanguageElement{return this.getElement(196)};
	/**终点*/
	get avd_text_3():ILanguageElement{return this.getElement(197)};
	/**我很需要*/
	get avd_text_4():ILanguageElement{return this.getElement(198)};
	/**我能坚持*/
	get avd_text_5():ILanguageElement{return this.getElement(199)};
	/**观看广告获得高级登山靴，体验飞一般的快乐，登山快人一步！*/
	get avd_text_6():ILanguageElement{return this.getElement(200)};
	/**观看广告获得救援队补给，随机获得一件物品！*/
	get avd_text_7():ILanguageElement{return this.getElement(201)};
	/**点我补给*/
	get avd_text_8():ILanguageElement{return this.getElement(202)};
	/**我会飞了！*/
	get avd_text_9():ILanguageElement{return this.getElement(203)};
	/**乘坐缆车*/
	get avd_text_10():ILanguageElement{return this.getElement(204)};

}