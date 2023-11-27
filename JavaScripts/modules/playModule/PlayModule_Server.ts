/**
 * @Author       : 田可成
 * @Date         : 2022-08-18 10:12:29
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:44:23
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\PlayModule_Server.ts
 * @Description  : 
 */
import ScoreMgr from "../../Prefabs/PlayerScore/Script/ScoreMgr";
import { PlayData } from "./PlayData";
import { PlayModule_Client } from "./PlayModule_Client";


export class PlayModule_Server extends ModuleS<PlayModule_Client, PlayData>{
    net_PlayerReborn(bornPoint: mw.Vector) {
        this.currentPlayer.character.worldTransform.position = bornPoint
    }

    net_RefreshSavePoint(savePoint: number) {
        ScoreMgr.instance.refreshSavePoint(this.currentPlayer.playerId, savePoint);
    }

    net_AddTopCount() {
        let result = this.currentData.addTopCount()
        this.currentData.save(true)
        ScoreMgr.instance.refreshTopCount(this.currentPlayer.playerId, result);
    }
}

