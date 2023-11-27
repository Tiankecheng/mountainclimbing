import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { SavePointEvent } from "../../Prefabs/Bonfire/Script/SavePoint";
import { TrrEvent } from "../../Prefabs/EventTrr/Script/EventTrr";
import { InteractiveEvent } from "../../Prefabs/Interactive/Script/InteractiveObj";
import { PickUpEvent } from "../../Prefabs/PickUp/Script/PickUp";
import { GameConfig } from "../../config/GameConfig";
import { GlobalVas } from "../../const/GlobalDefine";
import Skip_Generate from "../../ui-generate/commonUI/Skip_generate";
import { scheduler } from "../../util/Scheduler";
import { Utils } from "../../util/Utils";
import { WorldUI } from "../../util/WorldUI";
import { BagModule_Clinet } from "../commonModules/bagModule/BagModule_Clinet";
import { P_BagMain } from "../commonModules/bagModule/P_Bag";
import P_InteractUI from "../commonModules/bagModule/P_InteractUI";
import P_PickUp from "../commonModules/bagModule/P_PickUp";
import { GMManager } from "../commonModules/gm/GMManager";
import GuideModule_Client from "../commonModules/guide/GuideModule_Client";
import { EventManager_C } from "../playModule/event/EventManager_C";
import { GameData } from "./GameData";
import { GameModule_Server } from "./GameModule_Server";
import P_GameStart from "./P_GameStart";
import P_LobbyUI from "./P_LobbyUI";
import { SkyBoxManager } from "./skyBox/SkyBoxManager";

export class GameModule_Client extends ModuleC<GameModule_Server, GameData>{
    /**要等到一些逻辑处理完 */
    initOver: boolean = false;
    private _gmModule: GuideModule_Client;
    private _flagMap: Map<number, mw.GameObject> = new Map()
    private _cameraPoint: mw.GameObject

    onStart(): void {
        this.init();
        this.sendLogin();
        mw.UIService.show(P_GameStart)
        this.eventInit();
    }

    eventInit() {
        let pickupUI = mw.UIService.getUI(P_PickUp)
        Event.addLocalListener(SavePointEvent.SP_OnEnterTrriger, (params: any) => {
            mw.SoundService.stopAllSound();
            Utils.playSound(8)
            Utils.uploadMGS("ts_game_over", "玩家靠近篝火恢复体力时", {});
            GlobalVas.isInArea = false;
            GlobalVas.staminaRevert = params[0];
        })

        Event.addLocalListener(SavePointEvent.SP_OnLeaveTrriger, () => {
            mw.SoundService.stopAllSound();
            Utils.playSound(9)
            GlobalVas.isInArea = true
        })

        Event.addLocalListener(PickUpEvent.PU_OnEnterTrriger, (params: any) => {
            if (GlobalVas.g_GameIsGuide) return;
            let itemCnt = ModuleService.getModule(BagModule_Clinet).getItemCnt(params[0])
            if (params[6] && itemCnt != 0) {
                mw.UIService.show(P_PickUp, params)
            }
            if (!params[6] && itemCnt == 0) {
                mw.UIService.show(P_PickUp, params)
            }
        })

        Event.addLocalListener(PickUpEvent.PU_OnLeaveTrriger, () => {
            pickupUI.visible = false
        })

        Event.addLocalListener(TrrEvent.Trr_OnEnterTrriger, (params: any) => {
            EventManager_C.instance.executeEvent(params[0], params[1], params[2], params[3])
        })

        Event.addLocalListener(InteractiveEvent.IE_OpenBag, (flag) => {
            if (flag) {
                mw.UIService.show(P_BagMain)
            } else {
                mw.UIService.hide(P_BagMain)
            }
        });

        Event.addLocalListener(InteractiveEvent.IE_OpenInteractUI, (flag) => {
            if (flag) {
                mw.UIService.show(P_InteractUI)
            } else {
                mw.UIService.hide(P_InteractUI)
            }
        });

    }

    /**初始化场景要找的物体 */
    async init() {
        if (this.initOver) return
        this._gmModule = ModuleService.getModule(GuideModule_Client);
        Player.localPlayer.character.movementEnabled = false
        GameObject.asyncFindGameObjectById(GlobalVas.startPoint).then((obj) => {
            this.changeCamera(obj, false, GameConfig.PlayerConfig.getElement(1).CameraRotation, GameConfig.PlayerConfig.getElement(1).CameraHight);
            GameConfig.Flag.getAllElement().forEach(flagCfg => {
                GameObject.asyncFindGameObjectById(flagCfg.Guid).then((flag) => {
                    let flagClone = flag.clone();
                    flagClone.parent = (obj);
                    flagClone.localTransform.position = (flagCfg.PosOffset)
                    flagClone.localTransform.rotation = (new mw.Rotation(flagCfg.Rotate))
                    flagClone.localTransform.scale = (flagCfg.Scale)
                    this._flagMap.set(flagCfg.ID, flagClone);
                    flagClone.setVisibility(mw.PropertyStatus.Off)
                })
            });
        });

        GameObject.asyncFindGameObjectById("699F2133").then((point) => {
            this._cameraPoint = point;
        })

        //初始化3DUI
        GameConfig.WorldUI.getAllElement().forEach((worldUI) => {
            WorldUI.addWorldUI(worldUI.Pos, worldUI.Rotate, worldUI.Scale, worldUI.Text, worldUI.Color)
        })
        //初始化天空盒实例
        this.initOver = true;
    }

    /**发送登录 */
    sendLogin() {
        let nickName = mw.AccountService.getNickName()
        this.server.net_PlayerLogin_S(nickName)
    }

    /**登录返回 */
    net_PlayerLogin_C() {
        this.localPlayer.character.worldTransform.rotation = mw.Rotation.zero
        mw.UIService.show(P_GameStart)
        ModuleService.getModule(BagModule_Clinet).reqDeleteAllItem();
        let guideID = this._gmModule.getCurGuideId()
        this._gmModule.setGuideEvent(guideID ? guideID : 1);
        guideID ? null : this._gmModule.triggerGuide(1)
        GlobalVas.g_GameIsStart = true;
    }

    showFlag(curIndex: number, index: number) {
        let curFlag = this._flagMap.get(curIndex)
        let flag = this._flagMap.get(index);
        curFlag.setVisibility(mw.PropertyStatus.Off)
        flag.setVisibility(mw.PropertyStatus.On)
    }

    cameraMotion(index: number) {
        mw.SoundService.playBGM(GameConfig.Audio.getElement(20).ResGUID)
        Utils.stopSound(7)
        this.changeCamera(this._cameraPoint, false, new mw.Vector(0, -30, 0), new mw.Vector(-8000, 0, 0))
        let tweens = [];
        let skipUI = mw.UIService.show(Skip_Generate)
        skipUI.mBtn.onClicked.add(() => {
            tweens.forEach(tween => {
                tween.stop();
            });
            this.changeCamera(this.localPlayer.character, true, new mw.Vector(0, -20, 0))
            mw.UIService.hide(Skip_Generate)
            this.gameStart(index)
        })
        tweens.push(new mw.Tween({
            a: new mw.Vector(-870.92, 10391.21, 24093.51),
            b: new mw.Rotation(0, -30, 0)
        }).to({
            a: new mw.Vector(13024.94, 1167.06, 13669.9),
            b: new mw.Rotation(0, -30, 360)
        }, 5000).onUpdate(v => {
            this._cameraPoint.worldTransform.position = v.a
            ModifiedCameraSystem.setOverrideCameraRotation(v.b)
        }).onComplete(() => {
            tweens.push(new mw.Tween({
                a: new mw.Vector(13024.94, 1167.06, 13669.9),
                b: new mw.Rotation(0, -30, 360)
            }).to({
                a: new mw.Vector(-7536.43, -10366.09, 8449.38),
                b: new mw.Rotation(0, -30, 540)
            }, 5000).onUpdate(v => {
                this._cameraPoint.worldTransform.position = v.a
                ModifiedCameraSystem.setOverrideCameraRotation(v.b)
            }).onComplete(() => {
                tweens.push(new mw.Tween({
                    a: new mw.Vector(-7536.43, -10366.09, 8449.38),
                    b: new mw.Rotation(0, -30, 540),
                    c: new mw.Vector(-5000, 0, 0)
                }).to({
                    a: GlobalVas.bornPoint,
                    b: new mw.Rotation(0, -30, 720),
                    c: mw.Vector.zero
                }, 5000).onUpdate(v => {
                    this._cameraPoint.worldTransform.position = v.a
                    ModifiedCameraSystem.setOverrideCameraRotation(v.b)
                    Camera.currentCamera.localTransform.position = v.c;
                }).onComplete(() => {
                    this.changeCamera(this.localPlayer.character, true, new mw.Vector(0, -20, 0))
                    mw.UIService.hide(Skip_Generate)
                    this.gameStart(index)
                }).start())
            }).start())
        }).start())

        tweens.push(new mw.Tween({
            a: new mw.Vector(-8000, 0, 0),
        }).to({
            a: new mw.Vector(-5000, 0, 0),
        }, 5000).onUpdate(v => {
            Camera.currentCamera.localTransform.position = v.a;
        }).start())
    }

    gameStart(index: number) {
        let flag = this._flagMap.get(index);
        flag.setVisibility(mw.PropertyStatus.Off)
        GlobalVas.flagIndex = index;
        mw.SoundService.stopBGM()
        Utils.playSound(7)
        SkyBoxManager.instance.startDayNight()
        mw.UIService.show(P_LobbyUI);
        GMManager.instance.show()
        ModuleService.getModule(BagModule_Clinet).addItemByCfg(7);
        ModuleService.getModule(BagModule_Clinet).openBag();
        Player.localPlayer.character.movementEnabled = true;
        let guideID = this._gmModule.getCurGuideId()
        ModuleService.getModule(GuideModule_Client).triggerGuide(guideID > 3 ? guideID : 3)
    }

    plugFlag(pos: mw.Vector, rotate: mw.Vector, scale: mw.Vector) {
        let flag = this._flagMap.get(GlobalVas.flagIndex)
        flag.parent = null;
        flag.setVisibility(mw.PropertyStatus.On)
        flag.worldTransform.position = pos;
        flag.worldTransform.rotation = new mw.Rotation(rotate)
        flag.worldTransform.scale = scale;
    }

    /**
     * @description: 设置相机看向的位置
     * @param {MWCore} target 目标
     * @param {Type} CameraRotation 摄像机旋转
     * @param {Type} CameraOffset 摄像机偏移
     * @return {*}
     */
    changeCamera(target: mw.GameObject, isFollow: boolean, CameraRotation: mw.Vector = mw.Vector.zero, CameraOffset: mw.Vector = mw.Vector.zero) {
        ModifiedCameraSystem.followTargetInterpSpeed = 0
        ModifiedCameraSystem.setCameraFollowTarget(target)
        if (!isFollow) {
            Camera.currentCamera.springArm.collisionEnabled = false
            Camera.currentCamera.rotationMode = mw.CameraRotationMode.RotationControl
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(CameraRotation));
            Camera.currentCamera.localTransform.position = CameraOffset;
        } else {
            Camera.currentCamera.springArm.collisionEnabled = true
            ModifiedCameraSystem.setOverrideCameraRotation(new mw.Rotation(CameraRotation));
            scheduler.tickStart(() => {
                ModifiedCameraSystem.resetOverrideCameraRotation()
            })
            Camera.currentCamera.localTransform.position = CameraOffset;
        }
    }

    private ismove: boolean = false
    onUpdate(dt: number): void {
        if (Player.localPlayer.character.isJumping) {
            this.ismove = false
            mw.SoundService.stopSound(GameConfig.Audio.getElement(18).ResGUID)
        }
        if (Player.localPlayer.character.isMoving) {
            if (!this.ismove && !Player.localPlayer.character.isJumping) {
                Utils.playSound(18) //走路音效
                if (!this.initOver) {
                    this.init()
                }
                this.ismove = true
            }
        } else {
            this.ismove = false
            mw.SoundService.stopSound(GameConfig.Audio.getElement(18).ResGUID)
        }
    }

    addGold(value: number) {
        this.server.net_AddGold(value)
    }
}
