 

 @UIBind('UI/commonUI/Setup.ui')
 export default class Setup_Generate extends mw.UIScript {
     @UIWidgetBind('RootCanvas/Main/mAudioGroup/mAudioTitle')
    public mAudioTitle: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Main/mAudioGroup/mAudioButton')
    public mAudioButton: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Main/mAudioGroup/mAudioMark')
    public mAudioMark: mw.Image=undefined;
    @UIWidgetBind('RootCanvas/Main/mAudioGroup')
    public mAudioGroup: mw.Canvas=undefined;
    @UIWidgetBind('RootCanvas/Main/mMWTextBlock_1')
    public mMWTextBlock_1: mw.TextBlock=undefined;
    @UIWidgetBind('RootCanvas/Main/mcontiue')
    public mcontiue: mw.StaleButton=undefined;
    @UIWidgetBind('RootCanvas/Main/mcloseButton')
    public mcloseButton: mw.StaleButton=undefined;
    

     protected onAwake() {
         this.canUpdate = false;
         this.layer = mw.UILayerMiddle;
         this.initButtons();
         this.initLanguage()
     }
     
     protected initButtons() {
         //按钮添加点击
         this.mAudioButton.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mAudioButton");
         })
         this.mAudioButton.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mAudioButton");
         })
         this.mAudioButton.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mAudioButton");
         })
         this.mAudioButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mcontiue.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mcontiue");
         })
         this.mcontiue.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mcontiue");
         })
         this.mcontiue.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mcontiue");
         })
         this.mcontiue.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         this.mcloseButton.onClicked.add(()=>{
             Event.dispatchToLocal("PlayButtonClick", "mcloseButton");
         })
         this.mcloseButton.onPressed.add(() => {
             Event.dispatchToLocal("PlayButtonPressed", "mcloseButton");
         })
         this.mcloseButton.onReleased.add(() => {
             Event.dispatchToLocal("PlayButtonReleased", "mcloseButton");
         })
         this.mcloseButton.touchMethod = mw.ButtonTouchMethod.PreciseTap;
	
         //按钮添加点击
         // 初始化多语言
         // this.initLanguage()
 
     }
     
     protected initLanguage(){
         //按钮多语言
         this.setLanguage(this.mAudioButton);
	
         this.setLanguage(this.mcontiue);
	
         this.setLanguage(this.mcloseButton);
	
         //文本多语言
         this.setLanguage(this.mAudioTitle)
	
         this.setLanguage(this.mMWTextBlock_1)
	
 
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
 