/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/03/9 09:58:35
* @Description  : 定义全局变量
*/

import { GuideModuleView } from "module_guide";

export namespace GlobalVas {
    //region 双端通用
    //是否发布Online
    export let g_IsOnline: boolean = false;
    //否打印普通debug信息
    export let g_IsDebug: boolean = true;
    //游戏是否是暂停状态
    export let g_GameIsPause: boolean = false;
    /**一个唯一编号，累+ */
    let g_s_UnitBaseGuid = 0;
    /**调用这个获取一个中的唯一id */
    export function getGuid() {
        return g_s_UnitBaseGuid++;
    }
    mw.UIScript.prototype["onShow"] = function () {
        tweenViewAlpha(this)
    }
    export function tweenViewAlpha(view: mw.UIScript) {
        if (view instanceof GuideModuleView) return;
        view.rootCanvas.renderOpacity = 0
        new mw.Tween({ a: 0 }).to({ a: 1 }, 200).onUpdate(v => {
            view.rootCanvas.renderOpacity = v.a
        }).start()
    }
    /**玩家总数 */
    export const GamePlayerCount = 10
    //endregion 

    //region 游戏相关
    /**游戏是否开始 */
    export let g_GameIsStart: boolean = false
    /**游戏是否是引导状态 */
    export let g_GameIsGuide: boolean = false;
    /**开始锚点 */
    export const startPoint = "926D96EF";
    /**登顶后插旗index */
    export let flagIndex: number = 0
    /**是否在爬山区域内 */
    export let isInArea = true
    /**篝火出生点 */
    export let bornFirePoint = new mw.Vector(-15676.68, 1454.61, 1092.49)
    /**大营地出生点 */
    export const bornPoint = new mw.Vector(-15676.68, 1454.61, 1092.49)
    /**出生点半径 */
    export const bornPointRadius = 200
    /**在篝火旁回体力速度 */
    export let staminaRevert = 5;

    //#endregion

    //#region 广告相关

    /**插入广告是否开始计时 */
    export let g_AdsIsStart: boolean = false;

    /**插入广告初始间隔 */
    export const AdsTime = 40
    /**插入广告进度间隔 */
    export const AdsLevelTime = 0.8
    /**插入广告前置免关卡数 */
    export const NoAdsLevel = 4
    /**常驻激励广告每天次数限制 */
    export const MedicalAdsCount = 10
    /**飞行激励广告每天次数限制 */
    export const FlyAdsCount = 5
    /**同一关卡死亡超过几次提示飞行激励广告 */
    export const FlyAdsDeathCount = 2
    /**飞行持续时间 */
    export const FlyTime = 30

    //#endregion
}

