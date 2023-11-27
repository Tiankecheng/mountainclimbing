 

 @UIBind('UI/bagModule/BagMain.ui')
 export default class BagMain_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mItemDetail/btn')
    public btn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail/MWCanvas_1/mItemImage')
    public mItemImage: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail/MWCanvas_1/mName')
    public mName: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail/MWCanvas_1/mDesc')
    public mDesc: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail/MWCanvas_1/mUseBtn')
    public mUseBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail/MWCanvas_1/mDiscardBtn')
    public mDiscardBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mItemDetail')
    public mItemDetail: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/btn1')
    public btn1: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBackImg')
    public mBackImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mGuideImg1')
    public mGuideImg1: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mScrollBox/mContent')
    public mContent: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mScrollBox')
    public mScrollBox: mw.ScrollBox=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.btn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn");
         })
         this.btn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn");
         })
         this.btn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn");
         })
         this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mUseBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mUseBtn");
         })
         this.mUseBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mUseBtn");
         })
         this.mUseBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mUseBtn");
         })
         this.mUseBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mDiscardBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mDiscardBtn");
         })
         this.mDiscardBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mDiscardBtn");
         })
         this.mDiscardBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mDiscardBtn");
         })
         this.mDiscardBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.btn1.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "btn1");
         })
         this.btn1.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "btn1");
         })
         this.btn1.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "btn1");
         })
         this.btn1.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.btn);
	
         this.setLanguage(this.mUseBtn);
	
         this.setLanguage(this.mDiscardBtn);
	
         this.setLanguage(this.btn1);
	
         //文本多语言
         this.setLanguage(this.mName)
	
         this.setLanguage(this.mDesc)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1") as mw.TextBlock);
	
 
     }
     
     private setLanguage(ui: mw.StaleButton | mw.TextBlock) {
         let call = mw.UIScript.getBehavior("lan");
         if (call && ui) {
             call(ui);
         }
     }
     
     /**
       * 设置显示时触发
       */
     public show(...params: unknown[]) {
         mw.UIService.showUI(this, this.layer, ...params)
     }
 
     /**
      * 设置不显示时触发
      */
     public hide() {
         mw.UIService.hideUI(this)
     }
 
     protected onStart(): void{};
     protected onShow(...params: any[]): void {};
     protected onHide():void{};
 
     protected onUpdate(dt: number): void {
 
     }
     /**
      * 设置ui的父节点
      * @param parent 父节点
      */
     setParent(parent: mw.Canvas){
         parent.addChild(this.uiObject)
         this.uiObject.size = this.uiObject.size.set(this.rootCanvas.size)
     }
 }
 