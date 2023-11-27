/**
 * @Author       : 田可成
 * @Date         : 2022-07-29 17:51:08
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:30:15
 * @FilePath     : \ilovethemountains\JavaScripts\util\Utils.ts
 * @Description  : 
 */
import { GameConfig } from "../config/GameConfig";
import { scheduler } from "./Scheduler";

export class Utils {
    /**
     * 等待一会
     * @param second  s
     * @returns 
     */
    static async waitForSeconds(second: number): Promise<void> {
        return new Promise<void>(resolve => {
            scheduler.timeStart(() => {
                resolve();
            }, second);
        });
    }

    /**
     * 等待一会
     * @param tick 帧
     * @returns 
     */
    static async waitForTicks(tick: number): Promise<void> {
        return new Promise<void>(resolve => {
            scheduler.tickStart(() => {
                resolve();
            }, tick);
        });
    }

    /**
     * 随机一个整数 [Min,Max]
     * @param Min 最小值
     * @param Max  最大值
     * @returns  返回一个区间随机整数
     */
    static randomNum(Min, Max): number {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    /**
     * 随机一个浮点数
     * @param Min  最小值
     * @param Max  最大值
     * @returns 返回一个区间随机浮点数
     */
    static randomNumFloat(Min, Max): number {
        return Min + Math.random() * (Max - Min);
    }

    /**
    * 以该点为圆心返回一个圆平面内的随机点
    * @param point 初始坐标
    * @r 半径
    */
    static randomCirclePoint(point: mw.Vector, r: number): mw.Vector {
        while (1) {
            let cx = 2 * r * Math.random() - r + point.x
            let cy = 2 * r * Math.random() - r + point.y
            if ((cx - point.x) * (cx - point.x) + (cy - point.y) * (cy - point.y) <= r * r)
                return new mw.Vector(cx, cy, point.z)
        }
    }

    /**
     * @description: 格式化字符串
     * @param {string} str
     * @param {array} args
     * @return {*}
     */
    static formatString(str: string, ...args: any[]) {
        if (args.length == 0) {
            return str;
        }
        for (let i = 0; i < args.length; i++) {
            const re = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(re, args[i]);
        }
        return str;
    }


    /**
     * @description: 上传埋点数据
     * @param {string} key: 事件名
     * @param {string} des: 事件描述
     * @param {any} data: 参数域（包含参数名及取值）
     * @return {*}
     */
    public static uploadMGS(key: string, des: string, data: any) {
        if (mw.SystemUtil.isClient()) {
            mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));
        }
    }

    public static playSound(index: number) {
        let audioConfig = GameConfig.Audio.getElement(index);
        mw.SoundService.playSound(audioConfig.ResGUID, audioConfig.IsLoop, audioConfig.Volume)
    }

    public static stopSound(index: number) {
        mw.SoundService.stopSound(GameConfig.Audio.getElement(index).ResGUID)
    }
}



