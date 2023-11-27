import { GuideModuleC, GuideModuleView } from "module_guide";
import { GameConfig } from "../../../config/GameConfig";
import { LanguageIndex, globalLanguage } from "../../../const/GlobleLanguage";
import { ClientEvents } from "../../../const/LocalEvents";
import GuideCompleteUI_Generate from "../../../ui-generate/guideModule/GuideCompleteUI_generate";
import GuideReadyUI_Generate from "../../../ui-generate/guideModule/GuideReadyUI_generate";
import GuideTipsUI_Generate from "../../../ui-generate/guideModule/GuideTipsUI_generate";
import Tips from "../../../ui/Tips";
import { Utils } from "../../../util/Utils";
import { GameModule_Client } from "../../gameModule/GameModule_Client";
import P_GameStart from "../../gameModule/P_GameStart";
import P_LobbyUI from "../../gameModule/P_LobbyUI";
import P_LoginUI from "../../gameModule/P_LoginUI";
import { PlayModule_Client } from "../../playModule/PlayModule_Client";
import { EventManager_C } from "../../playModule/event/EventManager_C";
import P_EventDecUI from "../../playModule/event/P_EventDecUI";
import P_EventUI from "../../playModule/event/P_EventUI";
import { BagModule_Clinet } from "../bagModule/BagModule_Clinet";
import { P_BagMain } from "../bagModule/P_Bag";
import P_PickUp from "../bagModule/P_PickUp";

class GuideModule_Client extends GuideModuleC {
    private _tipsMap: Map<number, GuideTipsUI_Generate> = new Map();
    private _tipsPool: GuideTipsUI_Generate[] = [];
    private _guideUI: GuideModuleView
    onStart(): void {
        ModuleService.getModule(GuideModuleC).reSetToTargetPosDistance(300);
        this._guideUI = mw.UIService.getUI(GuideModuleView)
        this.guideComplateAction.add((guideId: number) => {
            [1].includes(guideId) ? this.triggerGuide(guideId + 1) : null
            if (guideId == 2) {
                Utils.uploadMGS("ts_tutorial_step", "玩家点击选择旗帜时", { tutorial_step: 1 });
            }
            if (guideId == 5) {
                Utils.uploadMGS("ts_tutorial_step", "玩家点击使用按钮时", { tutorial_step: 4 });
            }
            if (guideId == 6) {
                Utils.uploadMGS("ts_tutorial_step", "玩家走出营地触发第一个事件时", { tutorial_step: 5 });
            }
            if (guideId == 7) {
                Utils.uploadMGS("ts_tutorial_step", "玩家回到帐篷拾取物品时", { tutorial_step: 7 });
            }
        });
    }

    setGuideEvent(guideID: number) {
        const playModule = ModuleService.getModule(PlayModule_Client)
        switch (guideID) {
            case 1:
                mw.UIService.getUI(P_GameStart)
                this.setEventByCfg(1, () => { Event.dispatchToLocal(ClientEvents.EV_EnterGuide); return true; })
            case 2:
                mw.UIService.getUI(P_LoginUI)
                this.setEventByCfg(2, () => { Event.dispatchToLocal(ClientEvents.EV_EnterGuide); return true })
            case 3:
                mw.UIService.getUI(P_LobbyUI)
                let guideTime = 50;
                this.setEventByCfg(3, () => {
                    Event.dispatchToLocal(ClientEvents.EV_EnterGuide)
                    Player.localPlayer.character.movementEnabled = false;
                    playModule.climber.property.stamina -= GameConfig.PlayerConfig.getElement(1).MaxStamina / 2;
                    playModule.climber.property.hp -= GameConfig.PlayerConfig.getElement(1).MaxHP / 2;
                    playModule.refreshUI();
                    return true
                }, () => {
                    guideTime++;
                    if (guideTime >= 30) {
                        guideTime = 0;
                        playModule.climber.property.stamina -= 10;
                        playModule.refreshUI();
                    }
                    if (playModule.climber.property.stamina <= 0) {
                        return true;
                    }
                }, () => {
                    guideTime++;
                    if (guideTime >= 30) {
                        guideTime = 0;
                        playModule.climber.property.hp -= 10;
                        playModule.refreshUI();
                    }
                    if (playModule.climber.property.hp <= 20) {
                        guideTime = 0;
                        Player.localPlayer.character.movementEnabled = true;
                        this.triggerGuide(4)
                        return true;
                    }
                })
            case 4:
                mw.UIService.getUI(P_PickUp)
                this.setEventByCfg(4, () => { Event.dispatchToLocal(ClientEvents.EV_EnterGuide); return true }, () => {
                    Player.localPlayer.character.movementEnabled = false;
                    mw.UIService.show(P_PickUp, [1])
                    return true
                }, () => {
                    Utils.uploadMGS("ts_tutorial_step", "玩家点击一个拾取按钮时", { tutorial_step: 3 });
                    Player.localPlayer.character.movementEnabled = true;
                    return true
                }, () => {
                    Player.localPlayer.character.movementEnabled = false;
                    mw.UIService.show(P_PickUp, [2])
                    return true
                }, () => {
                    Player.localPlayer.character.movementEnabled = true;
                    this.triggerGuide(5)
                    return true
                })
            case 5:
                mw.UIService.getUI(P_BagMain)
                this.setEventByCfg(5, () => {
                    Event.dispatchToLocal(ClientEvents.EV_EnterGuide)
                    if (guideID == 5) ModuleService.getModule(BagModule_Clinet).addItemByCfg(1)
                    return true
                }, () => {
                    Event.dispatchToLocal(ClientEvents.EV_EnterGuide)
                    ModuleService.getModule(BagModule_Clinet).showItem()
                    return true;
                }, () => {
                    let guideReady = mw.UIService.show(GuideReadyUI_Generate)
                    guideReady.mBtn.onClicked.add(() => { guideReady.visible = false; this.triggerGuide(6) })
                    return true;
                })
            case 6:
                mw.UIService.getUI(P_EventUI)

                this.setEventByCfg(6, () => { Event.dispatchToLocal(ClientEvents.EV_EnterGuide); return true }, () => {
                    EventManager_C.instance.executeEvent(0, "1,3", 3, "58C3FA12")
                    return true
                })
            case 7:
                mw.UIService.getUI(P_EventDecUI)
                this.setEventByCfg(7, () => {
                    if (guideID == 7) mw.UIService.show(P_EventDecUI, 1)
                    Utils.uploadMGS("ts_tutorial_step", "玩家点击选择按钮时", { tutorial_step: 6 });
                    return true
                });
            case 8:
                mw.UIService.getUI(P_LobbyUI)
                this.setEventByCfg(8, () => {
                    Event.dispatchToLocal(ClientEvents.EV_ExitGuide)
                    playModule.climber.property.stamina += GameConfig.PlayerConfig.getElement(1).MaxStamina;
                    playModule.climber.property.hp += GameConfig.PlayerConfig.getElement(1).MaxHP;
                    playModule.refreshUI();
                    return true
                }, () => {
                    let guideComplete = mw.UIService.getUI(GuideCompleteUI_Generate)
                    guideComplete.mBtn.onClicked.add(() => { mw.UIService.hide(GuideCompleteUI_Generate) })
                    mw.UIService.show(GuideCompleteUI_Generate)
                    let str = Utils.formatString(globalLanguage.getLanguage(LanguageIndex["增加{0}金币"]), 50)
                    Tips.show(str);
                    ModuleService.getModule(GameModule_Client).addGold(50)
                    return true;
                })
        }
    }

    private setEventByCfg(ID: number, ...func: any[]) {
        const guide = this.addGuideStageHandle(ID);
        if (!guide) return
        const guideCfg = GameConfig.Guide.getElement(ID);
        let guideUI: mw.UIScript = null
        if (guideCfg.Uiname && mw.UIService.instance["createPanelMap"].has(guideCfg.Uiname)) {
            guideUI = mw.UIService.instance["createPanelMap"].get(guideCfg.Uiname)[0];
        } else {
            console.error("未找到" + guideCfg.Uiname)
            return;
        }
        let eventNum = 1;
        let funcNum = 0;
        while (guideCfg["Event" + eventNum] != null) {
            if (guideCfg["Event" + eventNum].length != 1 && guideCfg["Event" + eventNum].indexOf("|") == -1) {
                if (guideCfg["Event" + eventNum].indexOf("_") != -1) {
                    const uiName = guideCfg["Event" + eventNum].split("_");
                    guide.addBindUIByCondition(guideUI[uiName[0]], func[funcNum])
                    funcNum++;
                } else {
                    guide.addBindUI(guideUI[guideCfg["Event" + eventNum]])
                }
            } else if (guideCfg["Event" + eventNum].length == 1) {
                if (func[funcNum]) {
                    guide.addCondition(func[funcNum])
                }
                funcNum++;
            } else {
                const strs = guideCfg["Event" + eventNum].split("|");
                let pos = new mw.Vector(Number(strs[0]), Number(strs[1]), Number(strs[2]));
                guide.addBindWorldPos(pos)
            }
            const _eventNum = eventNum
            const _ID = ID;
            guide.addRunFunc(() => {
                this.addTips(_ID, _eventNum);
                this.removeTips(_ID, _eventNum);
            });
            eventNum++;
        }
    }

    addTips(ID: number, eventNum: number) {
        GameConfig.GuideUI.getAllElement().forEach(_guideUICfg => {
            if (_guideUICfg.StartEvent[0] == ID && _guideUICfg.StartEvent[1] == eventNum) {
                const tempSize = mw.Vector2.zero
                let tips: GuideTipsUI_Generate = this.creatTips()

                tips.mText.text = _guideUICfg.Text
                tips.mText.fontSize = _guideUICfg.TextSize
                tempSize.x = _guideUICfg.TextPos[0], tempSize.y = _guideUICfg.TextPos[1]
                tips.mText.position = tempSize
                tempSize.x += 1200; tempSize.y += 166
                tips.mBtn.position = tempSize
                mw.UIService.showUI(tips, 5)
                // tips.uiObject.slot.zOrder = this._guideUI.uiObject.slot.zOrder + 4
                tips.mBtn.visibility = _guideUICfg.IsShowTip ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed
                this._tipsMap.set(_guideUICfg.ID, tips);
            }
        });
    }

    removeTips(ID: number, eventNum: number) {
        GameConfig.GuideUI.getAllElement().forEach(_guideUICfg => {
            if (_guideUICfg.EndEvent[0] == ID && _guideUICfg.EndEvent[1] == eventNum && this._tipsMap.has(_guideUICfg.ID)) {
                let tips = this._tipsMap.get(_guideUICfg.ID)
                mw.UIService.hideUI(tips)
                this._tipsPool.push(tips)
                this._tipsMap.delete(_guideUICfg.ID);
            }
        });
    }

    creatTips() {
        let tips: GuideTipsUI_Generate = null
        if (this._tipsPool.length == 0) {
            tips = mw.UIService.create(GuideTipsUI_Generate)
            tips.mBtn.onClicked.add(() => {
                Utils.uploadMGS("ts_tutorial_step", "玩家点击第一个下一步时", { tutorial_step: 2 });
                this._guideUI.mBtn.onClicked.broadcast()
            });
        } else {
            tips = this._tipsPool.shift();
        }
        return tips;
    }
}
export default GuideModule_Client