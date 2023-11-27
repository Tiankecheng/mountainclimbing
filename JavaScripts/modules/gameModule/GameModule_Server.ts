/**
 * @Author       : 田可成
 * @Date         : 2022-09-01 00:56:36
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:42:07
 * @FilePath     : \ilovethemountains\JavaScripts\modules\gameModule\GameModule_Server.ts
 * @Description  : 
 */
import ScoreMgr from "../../Prefabs/PlayerScore/Script/ScoreMgr";
import { GameConfig } from "../../config/GameConfig";
import { GlobalVas } from "../../const/GlobalDefine";
import { Utils } from "../../util/Utils";
import { PlayData } from "../playModule/PlayData";
import { GameData } from "./GameData";
import { GameModule_Client } from "./GameModule_Client";


export class GameModule_Server extends ModuleS<GameModule_Client, GameData>{
    private players: number[];
    onStart() {
        this.players = []
        DataCenterS.onPlayerLeave.add((player: mw.Player) => {
            player.character.displayName = ""
            let playerid = player.playerId
            if (this.players.indexOf(playerid) != -1) {
                this.players.splice(this.players.indexOf(playerid), 1)
                ScoreMgr.instance.onPlayerLeft(playerid);
            }
        })
    }

    net_PlayerLogin_S(nickName: string) {
        let pid = this.currentPlayer.playerId
        if (this.players.indexOf(pid) == -1) {
            this.players.push(pid)
            ScoreMgr.instance.onPlayerJoin(pid, nickName, DataCenterS.getData(pid, PlayData).getTopCount())
        }
        this.currentPlayer.character.displayName = nickName

        this.currentPlayer.character.worldTransform.position = Utils.randomCirclePoint(GlobalVas.bornPoint, GlobalVas.bornPointRadius)
        this.getClient(this.currentPlayer).net_PlayerLogin_C()
    }

    climbTime: number = 0
    onUpdate(dt: number): void {
        this.climbTime += dt;
        if (this.climbTime >= GameConfig.PlayerConfig.getElement(1).climbTime) {
            this.players.forEach((pid) => {
                ScoreMgr.instance.refreshHeight(pid, Player.getPlayer(pid).character.worldTransform.position.z);
            });
            this.climbTime = 0;
        }
    }

    public net_AddGold(value: number) {
        this.currentData.AddGold(value)
        this.currentData.save(true).OnGoldNumChange.call(this.currentData.GetGoldNum())
    }
}

