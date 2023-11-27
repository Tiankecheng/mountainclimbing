import { GameConfig } from "../../../config/GameConfig";
import { PlayModule_Client } from "../PlayModule_Client";
import P_EventUI from "./P_EventUI";

/**
 * @Author       : 田可成
 * @Date         : 2022-08-18 14:14:23
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:22:25
 * @FilePath     : \ilovethemountains\JavaScripts\modules\playModule\event\EventManager_C.ts
 * @Description  : 
 */
export class EventManager_C {
    private static _instance: EventManager_C
    public static get instance() {
        if (!this._instance)
            this._instance = new EventManager_C();
        return this._instance;
    }
    destroyObj: mw.GameObject[] = [];
    eventBuff: number[] = [];

    executeEvent(eventID: number, eventTypes: string, count: number, destroyGuid?: string) {
        let events: number[] = [];
        eventTypes.split(",").forEach(eventType => {
            GameConfig.Event.getAllElement().forEach(cfg => {
                if (cfg.EventType == Number(eventType) && this.eventBuff.indexOf(cfg.id) == -1) {
                    events.push(cfg.ID)
                }
            });
        });
        let res: number[] = [];
        if (eventID == 0) {
            for (let i = 0; i < count; i++) {
                res.push(this.getRandomEvent(events))
            }
        } else {
            res.push(eventID);
        }
        mw.UIService.show(P_EventUI, res)
        if (destroyGuid) {
            GameObject.asyncFindGameObjectById(destroyGuid).then((obj) => {
                obj.setVisibility(mw.PropertyStatus.Off);
                this.destroyObj.push(obj);
            })
        }
    }

    /**从数组里获取1个随机的事件 */
    getRandomEvent(events: number[]): number {
        let sum = 0;
        let res = 0;
        for (let i = 0; i < events.length; i++) {
            sum += GameConfig.Event.getElement(events[i]).Weight;
        }

        let random = Math.random() * sum;
        let num = 0;
        for (let i = 0; i < events.length; i++) {
            if (ModuleService.getModule(PlayModule_Client).climber.property.event.has(events[i])) {
                continue;
            }
            num += GameConfig.Event.getElement(events[i]).Weight;
            if (num >= random) {
                res = events[i]
                events.splice(events.indexOf(res), 1)
                break;
            }
        }
        return res
    }

    resetEventObj() {
        this.destroyObj.forEach((obj) => {
            obj.setVisibility(mw.PropertyStatus.On);
        })
        this.eventBuff.length = 0;
        this.destroyObj.length = 0;
    }
}