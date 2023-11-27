
import { GameConfig } from "../config/GameConfig";

/**
 * @Author       : 田可成
 * @Date         : 2022-07-24 14:34:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-29 16:23:27
 * @FilePath     : \ilovethemountains\JavaScripts\const\GlobleLanguage.ts
 * @Description  : 
 */
export namespace globalLanguage {
    export function getLanguage(key: LanguageIndex | string): string {
        return GameConfig.Language.getElement(key).Value;
    }
}
export enum LanguageIndex {
    开始游戏 = "Text_3",
    拾取 = "Text_4",
    "进入休息区，存档点已更新" = "Text_5",
    坐下 = "Text_6",
    出发 = "Text_7",
    "增加{0}金币" = "Text_8",
    插上旗子 = "Text_9",
    返回大本营 = "Text_10",
    "恭喜你！登顶成功！" = "Text_11",
    睡觉 = "Text_12",
    您的钱不够 = "Text_15",
    "当前装扮包含未拥有套装，请购买后再保存" = "Text_16",
    没有更多了 = "Text_17",
    "背包已满，无法获得物品" = "Text_19",
    "获得{0}物品" = "Text_25"
}