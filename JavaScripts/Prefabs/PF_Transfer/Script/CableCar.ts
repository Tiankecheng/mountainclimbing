import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
import { GeneralManager, } from '../../../Modified027Editor/ModifiedStaticAPI';
import Point from "./Point";

/**
 * @Author       : 田可成
 * @Date         : 2022-12-28 11:48:42
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-03-08 11:36:44
 * @FilePath     : \ilovethemountains\Prefabs\PF_Transfer\Script\CableCar.ts
 * @Description  : 
 */
@Component
export default class CableCar extends mw.Script {
    @mw.Property({ displayName: "与终点的重合偏移" }) /**与终点的重合偏移 */
    public destinationOffet: number = 20
    @mw.Property({ displayName: "光索guid" })/**光索guid */
    public lightLineEff: string = "88759"
    @mw.Property({ displayName: "光索飞行音效guid" })/**光索飞行音效guid */
    public lightFlySound: string = "13873"
    @mw.Property({ displayName: "触发光索音效" })/**触发光索音效 */
    public lightTriSound: string = "120536"
    @mw.Property({ displayName: "挂载移动对象的特效" }) /**挂载在移动对象的特效 */
    public moveEff: string = "7802"
    @mw.Property({ displayName: "飞行时的动作" })
    public moveAnimation: string = ""
    @mw.Property({ displayName: "光索飞行速度" })/**光索飞行速度 */
    public flySpeed: number = 500
    @mw.Property({ displayName: "人物下落速度" })/**光索飞行速度 */
    public fallSpeed: number = 200

    private _targetPoint: mw.Vector
    private _character: mw.Character
    private _lightLine: LightLine;
    private _pointArr: Point[] = [];
    private _curAnim: mw.Animation

    protected async onStart(): Promise<void> {
        if (mw.SystemUtil.isClient()) {
            this._character = Player.localPlayer.character

            Event.addLocalListener("CC_CableCarStart", (characterGuid: string, pointID: number) => {
                if (this._character.gameObjectId == characterGuid) {
                    // player.character.isVisibleLocally = false
                    this._character.collisionWithOtherCharacterEnabled = false
                    this._character.switchToFlying()
                    this._character.setCollision(CollisionStatus.Off)
                    // this._character.maxFallingSpeed = this.fallSpeed
                    this._character.movementDirection = mw.MovementDirection.AxisDirection
                    this._character.brakingDecelerationFlying = 100000
                    if (this.moveAnimation != "") this._curAnim = PlayerManagerExtesion.rpcPlayAnimation(this._character, this.moveAnimation)
                    this.transferToPoint(pointID)
                }
            })

            await this.downloadPreload()
            this._lightLine = new LightLine(this.lightLineEff, this.lightFlySound, this.lightTriSound, this.moveEff)
            this.initPoint()
        }
    }

    private initPoint() {
        this.gameObject.getChildByName("rootPath").getChildren().forEach(node => {
            let point = node.getScripts()[0] as unknown as Point
            point.init()
            this._pointArr.push(point)
        })
    }

    private async downloadPreload() {
        let preload: string[] = [this.lightLineEff, this.lightFlySound, this.lightTriSound, this.moveEff, this.moveAnimation]
        for (let i = 0; i < preload.length; i++) {
            const guid = preload[i];
            if (guid != "" && !mw.AssetUtil.assetLoaded(guid)) {
                await mw.AssetUtil.asyncDownloadAsset(guid)
            }
        }
    }

    private transferToPoint(pointID: number) {
        this.useUpdate = true
        let point = this.getPoint(pointID)
        this._targetPoint = point.location
        this._character.lookAt(this._targetPoint)

        let length = this._character.worldTransform.position.subtract(this._targetPoint).length
        let rot = (this._character.worldTransform.position.subtract(this._targetPoint)).toRotation()
        let moveEffRot = (this._targetPoint.clone().subtract(this._character.worldTransform.position)).toRotation()

        this._lightLine.setLightEffPosAndScaleAndRot(this._targetPoint, length / 570, rot)
        this._lightLine.setMoveEffPosAndScaleAndRot(this._character.worldTransform.position, moveEffRot)
        this._lightLine.play()
    }

    private getPoint(pointID: number): Point {
        for (let i = 0; i < this._pointArr.length; i++) {
            if (this._pointArr[i].pointID == pointID) {
                return this._pointArr[i]
            }
        }
    }

    protected onUpdate(dt: number): void {
        if (mw.SystemUtil.isClient()) {
            if (this._targetPoint && Math.abs(this._character.worldTransform.position.subtract(this._targetPoint).length) > this.destinationOffet) {
                this._character.addMovement(this._character.worldTransform.position.subtract(this._targetPoint).normalize().multiply(-1 * this.flySpeed))
                this._lightLine.update(this._character.worldTransform.position.subtract(this._targetPoint).length, this._character.worldTransform.position)
            } else {
                // this._character.isVisibleLocally = true
                this._character.addMovement(mw.Vector.zero)
                this._character.setCollision(CollisionStatus.On)
                this._character.movementDirection = mw.MovementDirection.ControllerDirection
                if (this._curAnim) this._curAnim.stop()
                this._lightLine.stop()
                setTimeout(() => {
                    this._character.switchToWalking()
                }, 10);
                this.useUpdate = false
            }
        }
    }
}

export class LightLine {
    //光索特效
    private _lightLineEff: mw.Effect
    //挂载在玩家身上的特效
    private _moverEff: mw.Effect
    private _lightFlySound: string
    private _lightTriSound: string
    //飞行音效播放间隔
    public flyInteval: number = 0

    constructor(lightLineEff: string, lightFlySound: string, lightTriSound: string, moveEff: string) {
        if (lightLineEff != "") {
            EffectService.getEffectById(GeneralManager.rpcPlayEffectAtLocation(lightLineEff, mw.Vector.zero, 0)).then(effect => {
                this._lightLineEff = effect
            })
        }
        if (moveEff != "") {
            EffectService.getEffectById(GeneralManager.rpcPlayEffectAtLocation(moveEff, mw.Vector.zero, 0)).then(effect => {
                this._moverEff = effect
            })
        }
        this._lightFlySound = lightFlySound
        this._lightTriSound = lightTriSound
        this.flyInteval = 100
    }

    /**
     * @description: 设置光索的transform
     * @param {Type} position 位置
     * @param {Type} scale
     * @param {Type} rota 
     * @return {*}
     */
    public setLightEffPosAndScaleAndRot(position: mw.Vector, scaleX: number, rota: mw.Rotation) {
        if (this._lightLineEff) {
            this._lightLineEff.worldTransform.position = position
            this._lightLineEff.worldTransform.scale = new mw.Vector(scaleX, 2, 2)
            this._lightLineEff.worldTransform.rotation = rota
        }
    }

    /**
    * @description: 设置挂载人特效的transform
    * @param {Type} position 位置
    * @param {Type} scale
    * @param {Type} rota 
    * @return {*}
    */
    public setMoveEffPosAndScaleAndRot(position: mw.Vector, rota: mw.Rotation, scale?: mw.Vector) {
        if (this._moverEff) {
            this._moverEff.worldTransform.position = position
            scale ? this._moverEff.worldTransform.scale = scale : null
            this._moverEff.worldTransform.rotation = rota
        }
    }

    public play() {
        mw.SoundService.playSound(this._lightTriSound)
        this.flyInteval = setTimeout(() => {
            mw.SoundService.playSound(this._lightFlySound, 0)
        }, this.flyInteval)
    }

    public stop() {
        if (this._lightLineEff) {
            this._lightLineEff.worldTransform.position = mw.Vector.zero
            this._lightLineEff.worldTransform.scale = new mw.Vector(2, 2, 2)
        }
        if (this._moverEff) {
            this._moverEff.worldTransform.position = mw.Vector.zero
        }
        mw.SoundService.stopSound(this._lightFlySound)
        clearInterval(this.flyInteval)
        //添加到达的音效
    }

    public update(distance: number, hostPos: mw.Vector) {
        this._lightLineEff ? this._lightLineEff.worldTransform.scale = new mw.Vector(distance / 570, 2, 2) : null
        this._moverEff ? this._moverEff.worldTransform.position = hostPos : null
    }
}