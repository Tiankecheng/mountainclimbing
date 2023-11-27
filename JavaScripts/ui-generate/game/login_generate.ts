 

 @UIBind('UI/game/login.ui')
 export default class login_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/leftBtn')
    public leftBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/rightBtn')
    public rightBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mGuide1')
    public mGuide1: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/confirmBtn')
    public confirmBtn: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.leftBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "leftBtn");
         })
         this.leftBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "leftBtn");
         })
         this.leftBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "leftBtn");
         })
         this.leftBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.rightBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "rightBtn");
         })
         this.rightBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "rightBtn");
         })
         this.rightBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "rightBtn");
         })
         this.rightBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.confirmBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "confirmBtn");
         })
         this.confirmBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "confirmBtn");
         })
         this.confirmBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "confirmBtn");
         })
         this.confirmBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.leftBtn);
	
         this.setLanguage(this.rightBtn);
	
         this.setLanguage(this.confirmBtn);
	
         //文本多语言
 
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
 