/**
 * @Author       : 田可成
 * @Date         : 2022-12-27 10:08:32
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-14 10:16:37
 * @FilePath     : \ilovethemountains\JavaScripts\modules\IAAModule\IAAData.ts
 * @Description  : 
 */
import { GlobalVas } from "../../const/GlobalDefine";

class ADLimit {
    pos: IAAPos;
    count: number;
}

export default class IAADataInfo extends Subdata {
    public readonly ScoreAddDataChange: mw.Action1<number> = new mw.Action1()

    /**
    * 所有限制次数
    */
    @Decorator.persistence()
    public limits: ADLimit[] = [
        { pos: IAAPos.Fly, count: GlobalVas.FlyAdsCount },
        { pos: IAAPos.Item, count: GlobalVas.MedicalAdsCount },
    ];
    /**
     * 上一次更新日期
     */
    @Decorator.persistence()
    public lastRefreshDay: number = 0;
    
    protected initDefaultData(): void {
        this.limits = [];
        this.limits.push({ pos: IAAPos.Fly, count: GlobalVas.FlyAdsCount });
        this.limits.push({ pos: IAAPos.Item, count: GlobalVas.MedicalAdsCount });
        this.lastRefreshDay = new Date().getDate();
    }

    /**
    * 重置广告次数，需要判断时间
    */
    public resetDate() {
        const date = new Date().getDate();
        if (this.lastRefreshDay != date) {
            this.lastRefreshDay = date;
            this.limits.forEach(limit => {
                switch (limit.pos) {
                    case IAAPos.Fly:
                        limit.count = GlobalVas.FlyAdsCount;
                        break;
                    case IAAPos.Item:
                        limit.count = GlobalVas.MedicalAdsCount
                    default:
                        break;
                }
            });
            this.save(true);
        }
    }

    /**
     * 有多少次数
     * @param pos 
     * @returns 
     */
    public hasCount(pos: IAAPos): number {
        return this.limits.find(i => i.pos == pos).count;
    }
    /**
     * 减少次数
     * @param pos 
     */
    public reduceCount(pos: IAAPos) {
        const limit = this.limits.find(i => i.pos == pos);
        if (limit) {
            limit.count--;
        }
    }
}

export enum IAAPos {
    Fly,
    Item,
}