/** Dialog modal for Tablet change. */
class Dialog {

    static lsManger = new LSManager();

    constructor() {
        this.dialogBg = new DialogBg();

        this.styleNode.addEventListener('click', this.styleNodeClickEventHandler());

        this.closeNode.onclick = this.close();
        this.overlayNode.onclick = this.close();
        this.formNode.onsubmit = this.formNodeSubmitEventHandler();
    }



    get dialogNode(){
        return document.getElementById('dialog');
    }

    get closeNode(){
        return document.getElementById('dialogClose');
    }

    get styleNode(){
        return document.getElementById('dialogStyle');
    }

    get overlayNode(){
        return document.getElementById('dialogOverlay');
    }

    get formNode(){
        return document.getElementById('dialogForm');
    }

    //input
    get title() {
        return document.getElementById('titleI');
    }

    //textarea
    get content() {
        return document.getElementById('contentTa');
    }



    /** Event Handlers */

    formNodeSubmitEventHandler() {
        return (e) => {
            e.preventDefault();
            if( !Tablet.currentTablet){
                return;
            }

            let {title, content} = this.getData();
            this.closeNode.click();
            Tablet.currentTablet.setTitle(title);
            Tablet.currentTablet.setContent(content);
            this.dialogBg.applyBGColor();

            Tablet.lsManager.saveTabletData(Tablet.currentTablet.toTabletData())
        }
    }

    styleNodeClickEventHandler() {
        return (e) => {
            this.dialogBg.show();
        }
    }


    /** Functions */

    show() {
        this.setStyleNodeBGColor();
        this.dialogNode.classList.remove('hidden');
        this.content.focus();
    }

    close() {
        return (e) => {
            this.dialogNode.classList.add('hidden');
            this.setDataDefault();
        }
    }

    setDataDefault(){
        this.title.value = '';
        this.content.innerText = '';
    }

    setData() {
        this.title.value = Tablet.currentTablet.title.innerText;
        this.content.innerText = Tablet.currentTablet.content.innerHTML;
    }

    getData(){
        return {title: this.title.value, content: this.content.value}
    }

    setStyleNodeBGColor(){
        this.styleNode.style.backgroundColor = Tablet.currentTablet.nodeStyle.backgroundColor;
    }

}