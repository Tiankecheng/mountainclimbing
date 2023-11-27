/**
 * @Author       : 田可成
 * @Date         : 2022-07-20 10:08:29
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:18:57
 * @FilePath     : \ilovethemountains\JavaScripts\modules\gameModule\GameData.ts
 * @Description  : 
 */

export class GameData extends Subdata {
    @Decorator.persistence()
    public gold: number = 0
    public readonly OnGoldNumChange: mw.Action1<number> = new mw.Action1();  //金币变化调用

    public AddGold(value: number) {
        this.gold = this.gold + value >= 0 ? this.gold + value : 0
    }

    public GetGoldNum(): number {
        return this.gold
    }
}