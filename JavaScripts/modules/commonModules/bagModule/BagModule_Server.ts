import { BagModuleBaseS } from "module_bag";
import { BagData } from "./BagData";
import { BagModule_Clinet } from "./BagModule_Clinet";

/**
 * @Author       : 田可成
 * @Date         : 2022-08-19 11:47:09
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:43:07
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\bagModule\BagModule_Server.ts
 * @Description  : 
 */
export class BagModule_Server extends BagModuleBaseS<BagModule_Clinet, BagData> {
    net_ReqSetItemCnt(id: string, num: number): boolean {
        let data = this.getPlayerData(this.currentPlayer);
        let item = data.getItemByItemId(id)
        if (item) {
            item.count = num;
            data.save(false);
            this.ntfItemChange(this.currentPlayer, item);
            return true
        }

        return false;
    }

    net_ReqAddItem(id: number, cfgId: number, num: number): boolean {
        let item = new BagData();
        item.id = id.toString();
        item.cfgId = cfgId;
        item.count = num;
        this.addItemToBag(this.currentPlayer, [item]);
        return true;
    }
}