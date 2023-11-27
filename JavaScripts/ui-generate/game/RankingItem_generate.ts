 

 @UIBind('UI/game/RankingItem.ui')
 export default class RankingItem_Generate extends mw.UIScript {
     @UIWidgetBind('Canvas/rankCanvas/rankTxt')
    public rankTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/rankCanvas/nameTxt')
    public nameTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/rankCanvas/scoreTxt')
    public scoreTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/rankCanvas/numberTxt')
    public numberTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/rankCanvas/heightTxt')
    public heightTxt: mw.TextBlock=undefined;
    @UIWidgetBind('Canvas/rankCanvas')
    public rankCanvas: mw.Canvas=undefined;
    

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
         this.setLanguage(this.rankTxt)
	
         this.setLanguage(this.nameTxt)
	
         this.setLanguage(this.scoreTxt)
	
         this.setLanguage(this.numberTxt)
	
         this.setLanguage(this.heightTxt)
	
 
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
 