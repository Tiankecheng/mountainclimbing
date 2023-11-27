/**
 * @Author       : 田可成
 * @Date         : 2022-12-26 11:31:43
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:30:25
 * @FilePath     : \ilovethemountains\JavaScripts\ui\P_SetUpUI.ts
 * @Description  : 
 */
import { GlobalVas } from "../const/GlobalDefine";
import { BagModule_Clinet } from "../modules/commonModules/bagModule/BagModule_Clinet";
import P_LobbyUI from "../modules/gameModule/P_LobbyUI";
import Setup_Generate from "../ui-generate/commonUI/Setup_generate";
import { Utils } from "../util/Utils";

export class P_SetUp_UI extends Setup_Generate {
    private volumScale: number = 0
    onStart() {
        this.mcloseButton.onClicked.add(() => {
            Utils.playSound(16)
            this.visible = false;
            GlobalVas.g_GameIsPause = false
            mw.UIService.show(P_LobbyUI)
            ModuleService.getModule(BagModule_Clinet).openBag();
        })
        this.volumScale = mw.SoundService.volumeScale
        this.mAudioButton.onClicked.add(() => {
            Utils.playSound(16)
            if (mw.SoundService.volumeScale > 0) {
                mw.SoundService.volumeScale = 0
                this.mAudioMark.visibility = mw.SlateVisibility.Collapsed
            } else {
                mw.SoundService.volumeScale = this.volumScale
                this.mAudioMark.visibility = mw.SlateVisibility.HitTestInvisible
            }
        })

        this.mcontiue.onClicked.add(() => {
            Utils.playSound(16)
            this.visible = false;
            mw.UIService.show(P_LobbyUI)
            ModuleService.getModule(BagModule_Clinet).openBag();
        })
    }

    onShow(...params: any[]): void {
        GlobalVas.g_GameIsPause = true
    }

}