 

 @UIBind('UI/guideModule/GuideModuleUI.ui')
 export default class GuideModuleUI_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mLeftMask')
    public mLeftMask: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mTopMask')
    public mTopMask: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mButtomMask')
    public mButtomMask: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mRightMask')
    public mRightMask: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBtn')
    public mBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/image')
    public image: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mBtnHand')
    public mBtnHand: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mTextHand')
    public mTextHand: mw.TextBlock=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mLeftMask.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mLeftMask");
         })
         this.mLeftMask.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mLeftMask");
         })
         this.mLeftMask.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mLeftMask");
         })
         this.mLeftMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mTopMask.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mTopMask");
         })
         this.mTopMask.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mTopMask");
         })
         this.mTopMask.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mTopMask");
         })
         this.mTopMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mButtomMask.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mButtomMask");
         })
         this.mButtomMask.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mButtomMask");
         })
         this.mButtomMask.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mButtomMask");
         })
         this.mButtomMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mRightMask.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mRightMask");
         })
         this.mRightMask.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mRightMask");
         })
         this.mRightMask.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mRightMask");
         })
         this.mRightMask.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mBtn");
         })
         this.mBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mBtn");
         })
         this.mBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mBtn");
         })
         this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mLeftMask);
	
         this.setLanguage(this.mTopMask);
	
         this.setLanguage(this.mButtomMask);
	
         this.setLanguage(this.mRightMask);
	
         this.setLanguage(this.mBtn);
	
         //文本多语言
         this.setLanguage(this.mTextHand)
	
 
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
 