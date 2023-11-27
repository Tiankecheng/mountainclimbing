import { SpawnManager,SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
﻿/**
 * @Author       : 田可成
 * @Date         : 2022-11-09 16:32:31
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-26 09:53:41
 * @FilePath     : \ilovethemountains\Prefabs\PlayerScore\Script\ScoreMgr.ts
 * @Description  : 
 */
import { Utils } from "../../../../JavaScripts/util/Utils";

export default class ScoreMgr {
   private static _instance: ScoreMgr;

    public static get instance() {
        if (!this._instance)
            this._instance = new ScoreMgr();
        return this._instance;
    }

    public srcPool: IPlayerScore[];
    private _goPool: mw.GameObject[]

    constructor() {
        this.srcPool = new Array<IPlayerScore>();
        this._goPool = []
    }

    /**玩家加入 */
    async onPlayerJoin(pid: number, nickName: string, topCount: number) {
        if (mw.SystemUtil.isClient()) return

        let src: IPlayerScore
        for (let s of this.srcPool) {
            if (s.pid == pid) {
                src = s
                break
            }
        }
        for (let s of this.srcPool) {
            if (!src && !s.enble_S) {
                src = s
                break
            }
        }
        if (!src) {
            let go = SpawnManager.wornSpawn("E354022F4662EC54259D4FAE1DBB3337")
            await go.asyncReady()
            await Utils.waitForSeconds(1)
            this._goPool.push(go)
            src = go.getScripts()[0] as unknown as IPlayerScore
            src.init(pid, nickName, topCount)
            this.onPlayerRegiser(src)
        } else {
            src.init(pid, nickName, topCount)
        }
    }

    /**玩家离开 */
    onPlayerLeft(pid: number): void {
        if (mw.SystemUtil.isClient()) {
            return;
        }
        this.srcPool.forEach(s => {
            if (s.pid == pid) {
                s.pid = -1;
                s.enble_S = false;
            }
        })

    }

    /**注册玩家积分脚本 */
    onPlayerRegiser(src: IPlayerScore): void {
        this.srcPool.push(src);
    }

    /**更新玩家高度 */
    refreshHeight(pid: number, height: number) {
        this.srcPool.forEach(s => {
            if (s.pid == pid) {
                s.height = height / 5 + 1000;
            }
        })
    }

    /**更新玩家存档点 */
    refreshSavePoint(pid: number, savePoint: number) {
        this.srcPool.forEach(s => {
            if (s.pid == pid) {
                s.savePoint = savePoint;
            }
        })
    }

    /**更新玩家通关次数 */
    refreshTopCount(pid: number, topCount: number) {
        this.srcPool.forEach(s => {
            if (s.pid == pid) {
                s.topCount = topCount
            }
        })
    }

}
export interface IPlayerScore {
    init(pid: number, nickName: string, topCount: number)

    enble_S: boolean;

    pid: number;

    nickName: string;

    savePoint: number;

    topCount: number;

    height: number;

}
