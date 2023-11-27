/**
 * @Author       : 田可成
 * @Date         : 2022-12-27 10:08:32
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-27 15:58:44
 * @FilePath     : \ilovethemountains\JavaScripts\modules\IAAModule\IAAModuleS.ts
 * @Description  : 
 */
import IAADataInfo, { IAAPos } from "./IAAData";
import { IAAModuleC } from "./IAAModuleC";

export class IAAModuleS extends ModuleS<IAAModuleC, IAADataInfo>{
    public net_onPlaySuccess(pos: IAAPos, ownData?: { [key: string]: number | string }) {
        this.currentData.reduceCount(pos);
        this.currentData.save(true)
        switch (pos) {
            case IAAPos.Fly:
                break
            case IAAPos.Item:
                break
        }
        this.currentData.save(true).ScoreAddDataChange.call(this.currentData.hasCount(pos))
    }

    public showRewardAd(player: mw.Player, pos: IAAPos) {
        this.getClient(player).net_ShowRewardAd(pos);
    }

    public net_resetDate() {
        this.currentData.resetDate();
        this.currentData.save(true)
    }
}