/**
 * @Author       : 田可成
 * @Date         : 2022-10-12 09:17:17
 * @LastEditors  : 田可成
 * @LastEditTime : 2023-01-03 11:40:55
 * @FilePath     : \ilovethemountains\JavaScripts\modules\commonModules\bagModule\P_Bag.ts
 * @Description  : 
 */
import { BagUIBase, BagUICfg, IItemRender } from "module_bag";
import { GameConfig } from "../../../config/GameConfig";
import { ClientEvents } from "../../../const/LocalEvents";
import BagItemIcon_Generate from "../../../ui-generate/bagModule/BagItemIcon_generate";
import BagMain_Generate from "../../../ui-generate/bagModule/BagMain_generate";
import { Utils } from "../../../util/Utils";
import { PlayModule_Client } from "../../playModule/PlayModule_Client";
import { BagData } from "./BagData";
import { BagModule_Clinet } from "./BagModule_Clinet";

/**
 * 渲染单个道具的格子
 */
class BagItemRender extends BagItemIcon_Generate implements IItemRender {
    /**
     * 设置选中状态
     * @param bool 是否选中
     */
    setSelect(bool: boolean): void {
        this.mImgSelect.visibility = bool ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed
    }
    /**
     * 点击按钮，用来监听点击
     */
    get clickObj(): mw.StaleButton {
        return this.mItemBtn;
    }

    private data: BagData;
    /**
     * 渲染数据回调
     * @param data 道具对象
     */
    setData(data: BagData): void {
        this.data = data;
        data.count > 1 ? this.mItemNum.text = data.count.toString() : this.mItemNum.text = ""
        this.mImgIcon.imageGuid = GameConfig.Items.getElement(data.cfgId).Resource
    }

    protected onStart(): void {
        this.mItemBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap
    }

}

export class P_BagMain extends BagUIBase<BagData, BagMain_Generate> {
    mGuideImg1: mw.Image
    mUseBtn: mw.StaleButton
    constructor() {
        super(BagMain_Generate, BagModule_Clinet, BagItemRender);
    }

    protected initUICfg(cfg: BagUICfg): void {
        this.mGuideImg1 = this.view.mGuideImg1;
        this.mUseBtn = this.view.mUseBtn;
        //滑动组件
        cfg.scrollBox = this.view.mScrollBox;
        //滑动组件下装格子的容器
        cfg.scrollContent = this.view.mContent;
        //单个格子的渲染大小
        cfg.renderItemSize = new mw.Vector2(100, 100);
        //格子水平垂直间距
        cfg.horAndVerSpace = new mw.Vector2(60, 40);


        this.view.mScrollBox.onUserScrolled.clear();

        this.view.btn.onClicked.add(() => {
            this.detailShow(false);
        })
        //点击使用按钮
        this.mUseBtn.onClicked.add(() => {
            Utils.playSound(16)
            let item = this.getSelectData();
            if (GameConfig.Items.getElement(item.cfgId).ItemType == 2) {
                //检查能否使用
                if (!ModuleService.getModule(PlayModule_Client).checkProperty(item.cfgId)) {
                    this.detailShow(false);
                    return
                }
            }
            ModuleService.getModule(BagModule_Clinet).reqDeleteItemById(item.id)
            Event.dispatchToLocal(ClientEvents.Ev_UseItem, item.cfgId);
            this.detailShow(false);

            Utils.uploadMGS("ts_action_click", "玩家点击使用物品按钮时", { button: "item_use" });
        })

        //点击丢弃按钮
        this.view.mDiscardBtn.onClicked.add(() => {
            let item = this.getSelectData();
            if (item) {
                ModuleService.getModule(BagModule_Clinet).reqDeleteItemById(item.id)
            }
        })
        this.addTabs(this.view.btn1, 1, true);
    }

    protected onShow(...params: any[]): void {
        super.onShow()
    }

    protected showItems(itemIds: string[]): void {
        if (itemIds.length == 0) this.bagIsEmpty = true;
        else this.bagIsEmpty = false;
        super.showItems(itemIds);
        this.detailShow(false)
    }

    bagIsEmpty = false;
    protected onUpdate(dt: number): void {
        if (this.bagIsEmpty) {
            //轻装上阵
            ModuleService.getModule(PlayModule_Client).bagStamina = GameConfig.Event.getElement(41).EffectNum[0];
        } else {
            ModuleService.getModule(PlayModule_Client).bagStamina = 0;
        }
    }

    detailShow(isShow: boolean, data: BagData = null) {
        !isShow ? this.showItemDetal(null) : data ? this.showItemDetal(data) : null;
        this.view.mItemDetail.visibility = isShow ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed
    }

    /**
     * 单个道具选中回调
     * @param item 单个道具
     */
    protected onShowItemDetal(item: BagData): void {
        if (item) {
            Utils.playSound(16)
            if (item.cfgId == 7) this.view.mUseBtn.enable = false;
            else this.view.mUseBtn.enable = true;
            this.detailShow(true);
            let itemCfg = GameConfig.Items.getElement(item.cfgId)
            this.view.mName.text = itemCfg.Name
            this.view.mDesc.text = itemCfg.Dec
            this.view.mItemImage.imageGuid = GameConfig.Items.getElement(item.cfgId).Resource
        }
    }

    /**
     * 类型按钮切换回调
     * @param btn 某个按钮
     * @param isSelect 是否选中
     */
    protected onTabBtnStateChangeCallBack(btn: mw.StaleButton, isSelect: boolean) {
        isSelect ? btn.setNormalImageColorByHex("#ffff05ff") : btn.setNormalImageColorByHex("#ffffffff");
    }

}