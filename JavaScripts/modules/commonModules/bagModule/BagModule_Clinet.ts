import { BagModuleBaseC } from "module_bag";
import { GameConfig } from "../../../config/GameConfig";
import { GlobalVas } from "../../../const/GlobalDefine";
import { globalLanguage, LanguageIndex } from "../../../const/GlobleLanguage";
import Tips from "../../../ui/Tips";
import { Utils } from "../../../util/Utils";
import { BagData } from "./BagData";
import { BagModule_Server } from "./BagModule_Server";
import { P_BagMain } from "./P_Bag";

/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 14:00:54
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\bagModule\BagModule_Clinet.ts
 * @Description  : 
 */
export class BagModule_Clinet extends BagModuleBaseC<BagModule_Server, BagData>{

    showItem() {
        let ret;
        let i = 0;
        this.data.forEach(item => {
            i++;
            if (i == 2) ret = item
        })
        mw.UIService.getUI(P_BagMain).detailShow(true, ret)
        return ret;
    }

    getItemIdsByType(): string[] {
        let ret = [];
        this.data.forEach(item => {
            ret.push(item.id);
        })
        return ret;
    }

    isSameType(items: BagData[], type: number): boolean {
        return true;
    }

    deleteItemByNum(count: number) {
        let _count = 0;
        if (count > 0) {
            this.data.forEach(async item => {
                _count++;
                if (count == _count) this.reqDeleteItemById(item.id.toString());
            })
        } else if (count == 0) {
            this.data.forEach(async item => {
                _count++;
            })
            let randomCount = Utils.randomNum(1, _count);
            _count = 0
            this.data.forEach(async item => {
                _count++;
                if (randomCount == _count) this.reqDeleteItemById(item.id.toString());
            })
        }
    }

    deleteItemByCfg(cfgId: number) {
        let id: string[] = [];
        this.data.forEach(async item => {
            if (item.cfgId == cfgId) {
                id.push(item.id)
            }
        })
        this.server.net_ReqDeleteItems(id, this.localPlayer);
    }

    addItemByCfg(cfgId: number) {
        if (cfgId > 0) {
            this.reqAddItemById(cfgId)
        } else if (cfgId == 0) {
            let randomID = Utils.randomNum(1, GameConfig.Items.getAllElement().length - 1);
            this.reqAddItemById(randomID)
        }
    }

    reqDeleteAllItem() {
        let ids: string[] = [];
        this.data.forEach(item => {
            ids.push(item.id)
        })
        this.server.net_ReqDeleteItems(ids, this.localPlayer);
    }

    async reqDeleteItemById(id: string) {
        await this.server.net_ReqDeleteItems([id], this.localPlayer);
    }

    private async reqAddItemById(cfgId: number) {
        if (Number(cfgId.toFixed(0)) <= 0 || Number(cfgId.toFixed(0)) > GameConfig.Items.getAllElement().length) return
        let count = 0
        let id = GlobalVas.getGuid();
        this.data.forEach(item => {
            count++;
        })
        if (count >= 4) {
            Tips.show(globalLanguage.getLanguage(LanguageIndex["背包已满，无法获得物品"]))
            return
        }
        if (await (this.server as BagModule_Server).net_ReqAddItem(id, cfgId, 1)) {

            Tips.show(Utils.formatString(globalLanguage.getLanguage(LanguageIndex["获得{0}物品"]), GameConfig.Items.getElement(cfgId).Name))
        }
    }

    openBag() {
        mw.UIService.show(P_BagMain)
    }

}