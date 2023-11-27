/**
 * @Author       : 田可成
 * @Date         : 2023-10-19 11:33:59
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:24:19
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\actor\Climber.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { Utils } from "../../../util/Utils";
import { BaseActor } from "./BaseActor";
import Property from "./Property";

export class Climber extends BaseActor {
    /**控制的玩家对象 */
    get player(): mw.Player {
        return Player.getPlayer(this.pid)
    }
    /**玩家对象角色控制器 */
    protected _character: mw.Character
    public get character() {
        return this._character;
    }

    /**属性 */
    property: Property
    /**经过的存档点 */
    savePointID: number = 1
    /**死亡次数 */
    deathCount: number = 0;
    /**复活次数 */
    rebirthCount: number = 0;
    /**计时器 */
    timer: number = 0;

    constructor(player: mw.Player) {
        super();
        if (player) {
            this._character = player.character;
            this._guid = this.character.gameObjectId
            this._pid = player.playerId;
            this.isAI = false;
        }
        this.property = new Property()
    }

    /**
     * @description: 进行一些必要初始化
     * @return {*}
     */
    init() {
        super.init();
        this._dead = false;
        this.savePointID = 1;
        this.property.reset()
        this.timer = Date.now()
    }

    /**销毁 */
    destroy() {
        super.destroy();
        this.property.reset()
    }

    onDead(): void {
        super.onDead()
        this.character.ragdollEnabled = true
        this.character.movementEnabled = false;

        this.deathCount++;
        Utils.uploadMGS("ts_action_dead", "玩家生命值到0死亡时", { death: this.deathCount });
    }

    onPlay() {
        super.onPlay()
        this.character.ragdollEnabled = false
        this.character.movementEnabled = true;
        this.property.hp = GameConfig.PlayerConfig.getElement(1).MaxHP
        this.property.stamina = GameConfig.PlayerConfig.getElement(1).MaxStamina
    }

    onFall() {
        super.onDead()
        this.character.ragdollEnabled = true
        this.character.movementEnabled = false;
    }

    onReturn() {
        super.onPlay()
        this.character.ragdollEnabled = false
        this.character.movementEnabled = true;
    }
}