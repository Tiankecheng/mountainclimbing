/**
 * @Author       : 田可成
 * @Date         : 2022-08-02 13:23:29
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:25:38
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\guide\GuideModule_Server.ts
 * @Description  : 
 */

import { GuideDataHelper, GuideModuleC, GuideModuleS } from "module_guide";

class GuideModule_Server extends GuideModuleS {

    onStart(): void {
        ModuleService.registerModule(GuideModuleS, GuideModuleC, GuideDataHelper);
    }
}
export default GuideModule_Server