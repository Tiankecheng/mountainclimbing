 

 @UIBind('UI/game/Lobby.ui')
 export default class Lobby_Generate extends mw.UIScript {
     @UIWidgetBind('Canvas/mVirtualJoystick')
    public mVirtualJoystick: mw.VirtualJoystickPanel=undefined;
    @UIWidgetBind('Canvas/Gold/mGoldCnt')
    public mGoldCnt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/Gold/mGoldImg')
    public mGoldImg: mw.Image=undefined;
    @UIWidgetBind('Canvas/mSetUp')
    public mSetUp: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/mEmergency')
    public mEmergency: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/mSZTxt')
    public mSZTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mJumpBtn')
    public mJumpBtn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/mTYTxt')
    public mTYTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mCSTXT')
    public mCSTXT: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mCSTXT_1')
    public mCSTXT_1: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/shopBtn')
    public shopBtn: mw.StaleButton=undefined;
    @UIWidgetBind('Canvas/mProperty')
    public mProperty: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mProperty/hpProgressBar')
    public hpProgressBar: mw.ProgressBar=undefined;
    @UIWidgetBind('Canvas/mProperty/hpTxt')
    public hpTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mProperty/strProgressBar')
    public strProgressBar: mw.ProgressBar=undefined;
    @UIWidgetBind('Canvas/mProperty/strTxt')
    public strTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mProperty/mHpGuideImg')
    public mHpGuideImg: mw.Image=undefined;
    @UIWidgetBind('Canvas/mProperty/mStaminaGuideImg')
    public mStaminaGuideImg: mw.Image=undefined;
    @UIWidgetBind('Canvas/mProperty/mGuideImg')
    public mGuideImg: mw.Image=undefined;
    @UIWidgetBind('Canvas/mProperty/mLife')
    public mLife: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel')
    public mRankPanel: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/mRankText')
    public mRankText: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/mNameText')
    public mNameText: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/mScoreText')
    public mScoreText: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/mNumberText')
    public mNumberText: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/mHeightText')
    public mHeightText: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/mRankPanel/RankFrame/RankList/rankCanvas')
    public rankCanvas: mw.Canvas=undefined;
    @UIWidgetBind('Canvas/mHurt')
    public mHurt: mw.Image=undefined;
    @UIWidgetBind('Canvas/mAdv')
    public mAdv: mw.Button=undefined;
    @UIWidgetBind('Canvas/mFlyTime')
    public mFlyTime: mw.TextBlock=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mSetUp.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mSetUp");
         })
         this.mSetUp.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mSetUp");
         })
         this.mSetUp.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mSetUp");
         })
         this.mSetUp.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mEmergency.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mEmergency");
         })
         this.mEmergency.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mEmergency");
         })
         this.mEmergency.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mEmergency");
         })
         this.mEmergency.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mJumpBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mJumpBtn");
         })
         this.mJumpBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mJumpBtn");
         })
         this.mJumpBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mJumpBtn");
         })
         this.mJumpBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.shopBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "shopBtn");
         })
         this.shopBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "shopBtn");
         })
         this.shopBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "shopBtn");
         })
         this.shopBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         this.mAdv.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mAdv");
         })
         this.mAdv.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mAdv");
         })
         this.mAdv.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mAdv");
         })
         this.mAdv.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mSetUp);
	
         this.setLanguage(this.mEmergency);
	
         this.setLanguage(this.mJumpBtn);
	
         this.setLanguage(this.shopBtn);
	
         //文本多语言
         this.setLanguage(this.mGoldCnt)
	
         this.setLanguage(this.mSZTxt)
	
         this.setLanguage(this.mTYTxt)
	
         this.setLanguage(this.mCSTXT)
	
         this.setLanguage(this.mCSTXT_1)
	
         this.setLanguage(this.hpTxt)
	
         this.setLanguage(this.strTxt)
	
         this.setLanguage(this.mLife)
	
         this.setLanguage(this.mRankText)
	
         this.setLanguage(this.mNameText)
	
         this.setLanguage(this.mScoreText)
	
         this.setLanguage(this.mNumberText)
	
         this.setLanguage(this.mHeightText)
	
         this.setLanguage(this.mFlyTime)
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("Canvas/mAdv/TextBlock_2") as mw.TextBlock);
	
 
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
 