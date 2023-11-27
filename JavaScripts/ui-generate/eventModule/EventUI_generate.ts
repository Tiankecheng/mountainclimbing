 

 @UIBind('UI/eventModule/EventUI.ui')
 export default class EventUI_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mGuideImg')
    public mGuideImg: mw.Image=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mEventCanvas')
    public mEventCanvas: mw.Canvas=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Gold/mGoldCnt')
    public mGoldCnt: mw.TextBlock=undefined;
    @UIWidgetBind('MWCanvas_2147482460/Gold/mGoldImg')
    public mGoldImg: mw.Image=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         //文本多语言
         this.setLanguage(this.mGoldCnt)
	
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
 