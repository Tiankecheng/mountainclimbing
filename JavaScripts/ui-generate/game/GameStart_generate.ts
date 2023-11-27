 

 @UIBind('UI/game/GameStart.ui')
 export default class GameStart_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/startBtn')
    public startBtn: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.startBtn.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "startBtn");
         })
         this.startBtn.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "startBtn");
         })
         this.startBtn.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "startBtn");
         })
         this.startBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.startBtn);
	
         //文本多语言
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/TitleTxt") as mw.TextBlock);
	
 
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
 