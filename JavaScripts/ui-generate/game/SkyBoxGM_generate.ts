 

 @UIBind('UI/game/SkyBoxGM.ui')
 export default class SkyBoxGM_Generate extends mw.UIScript {
     @UIWidgetBind('MWCanvas_2147482460/mBtn')
    public mBtn: mw.StaleButton=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput1')
    public mInput1: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput2')
    public mInput2: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput3')
    public mInput3: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput4')
    public mInput4: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput5')
    public mInput5: mw.InputBox=undefined;
    @UIWidgetBind('MWCanvas_2147482460/mInput6')
    public mInput6: mw.InputBox=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
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
         this.setLanguage(this.mBtn);
	
         //文本多语言
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1_1_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1_1_1_1_1") as mw.TextBlock);
	
         this.setLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1_1_1_1_1_1") as mw.TextBlock);
	
 
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
 