 

 @UIBind('UI/bagModule/Interact.ui')
 export default class Interact_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/interactBtn')
    public interactBtn: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.interactBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "interactBtn");
         })
         this.interactBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "interactBtn");
         })
         this.interactBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "interactBtn");
         })
         this.interactBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.interactBtn);
	
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
 