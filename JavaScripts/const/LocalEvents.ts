/**
 * @Author       : 田可成
 * @Date         : 2022-08-30 15:06:51
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-29 14:00:38
 * @FilePath     : \ilovethemountains\JavaScripts\const\LocalEvents.ts
 * @Description  : 
 */
export class ClientEvents {
    /**更新积分 */
    static readonly Ev_RefreshRank_Client: string = "Ev_RefreshRank_Client"
    /**更新角色UI属性 */
    static readonly Ev_RefreshProperty: string = "Ev_RefreshProperty"
    /**返回上个复活点 */
    static readonly Ev_ReturnBornPoint: string = "Ev_ReturnBornPoint"
    /**返回大营地 */
    static readonly Ev_ReturnCamp: string = "Ev_ReturnCamp"
    /**复活到上个复活点 */
    static readonly Ev_DeathToBornPoint: string = "Ev_DeathToBornPoint"
    /**复活到大营地 */
    static readonly Ev_DeathToCamp: string = "Ev_DeathToCamp"
    /**传送到存档点 */
    static readonly EV_Portal: string = "EV_Portal"
    /**使用道具 */
    static readonly Ev_UseItem: string = "Ev_UseItem"
    /**遭遇事件 */
    static readonly Ev_TrrigerEvent: string = "Ev_TrrigerEvent"
    /**更新存档点 */
    static readonly EV_RefreshSavePoint: string = "EV_RefreshSavePoint"
    /**到达山顶 */
    static readonly EV_ClearGame: string = "EV_ClearGame"
    /**重置 */
    static readonly EV_ResetGame: string = "EV_ResetGame"
    /**进入引导模式 */
    static readonly EV_EnterGuide: string = "EV_EnterGuide"
    /**退出引导模式 */
    static readonly EV_ExitGuide: string = "EV_ExitGuide"

    /**当前不是海外状态 */
    static readonly EV_NotPlayZa: string = "EV_NotPlayZa"
    /**当前是海外状态 */
    static readonly EV_PlayZa: string = "EV_PlayZa"
}

export class ServerEvents {

}
