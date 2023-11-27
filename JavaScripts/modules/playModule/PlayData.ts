/**
 * @Author       : 田可成
 * @Date         : 2022-08-16 10:33:43
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-14 10:17:06
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\PlayData.ts
 * @Description  : 
 */

export class PlayData extends Subdata {
    @Decorator.persistence()
    topCount: number = 0

    public addTopCount() {
        this.topCount++
        return this.topCount;
    }

    public getTopCount(): number {
        return this.topCount
    }
}