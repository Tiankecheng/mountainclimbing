import { GameConfig } from "../../../config/GameConfig";

/**
 * @Author       : 田可成
 * @Date         : 2022-09-04 12:20:22
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-10-19 13:23:10
 * @FilePath     : \ilovethemountains\JavaScripts\modules\gameModule\skyBox\SkyBoxManager.ts
 * @Description  : 
 */
export class SkyBoxManager {
    private static _instance: SkyBoxManager
    public static get instance() {
        if (!this._instance)
            this._instance = new SkyBoxManager();
        return this._instance;
    }

    index: number = 1;
    startDayNight() {
        let timeCfg = GameConfig.Time.getElement(this.index)
        let nowSkyDomeIntensity = Skybox.skyDomeIntensity
        let nowSkyDomeHorizontalFallOff = Skybox.skyDomeHorizontalFallOff
        let time = 0;
        new mw.Tween({ a: nowSkyDomeIntensity, b: nowSkyDomeHorizontalFallOff }).to({ a: timeCfg.SkyBoxBright, b: timeCfg.Horizon }, timeCfg.Time * 1000).onUpdate(v => {
            time++;
            if (time > 1000) {
                time = 0;
                Skybox.skyDomeIntensity = v.a
                Skybox.skyDomeHorizontalFallOff = v.b
            }
        }).onComplete(() => {
            this.index++;
            if (this.index > GameConfig.Time.getAllElement().length) this.index = 1;

            Skybox.cloudVisible = timeCfg.CloudOpen
            Skybox.sunVisible = timeCfg.SunOpen
            Skybox.moonVisible = timeCfg.MoonOpen
            Skybox.starVisible = timeCfg.StarOpen
            this.startDayNight()
        }).start()
    }
}