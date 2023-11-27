/**
 * @Author       : 田可成
 * @Date         : 2022-09-28 10:11:51
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-26 14:00:08
 * @FilePath     : \ilovethemountains\JavaScripts\ui\UIGM.ts
 * @Description  : 
 */

import { GMBasePanel } from "module_gm";
import GMHUD_Generate from "../ui-generate/gmModule/GMHUD_generate";
import GMItem_Generate from "../ui-generate/gmModule/GMItem_generate";


export class UIGM extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }
}