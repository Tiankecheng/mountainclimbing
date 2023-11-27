/**
 * @Author       : 田可成
 * @Date         : 2022-08-17 10:42:21
 * @LastEditors  : 田可成
 * @LastEditTime : 2022-12-27 16:37:15
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\actor\BaseActor.ts
 * @Description  : 
 */
export abstract class BaseActor {
    public isAI = false

    protected _pid: number = 0
    public get pid() {
        return this._pid;
    }

    /**character GUID */
    protected _guid: string
    public get GUID() {
        return this._guid;
    }

    /**是否已经死亡了 */
    protected _dead: boolean = false;
    public get dead() {
        return this._dead;
    }

    /**
     * 进行一些必要初始化
     */
    init(...args) {
    }

    /**销毁 */
    destroy() {
        this._dead = true;
    }

    /**当死亡的时候 */
    public onDead() {
        this._dead = true;
    }

    /**当复活的时候 */
    public onPlay() {
        this._dead = false;
    }
}


