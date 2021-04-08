class Tablet {

    static tabletItemClassName = 'tablet-item';
    static editControlClassName = 'ti-edit';
    static deleteControlClassName = 'ti-delete';
    static currentTablet = undefined;
    static isMouseDown = false;
    static shiftX = 0;
    static shiftY = 0;

    static dialog = new Dialog();
    static lsManager = new LSManager();


    constructor(lsTabletData) {
        this.tabletNode = this.createTabletOrigin(lsTabletData);
        if(lsTabletData){
            let {id, title, content} = lsTabletData;
            this.setId(id);
            this.setTitle(title);
            this.setContent(content);
        }else{
            this.setId(Tablet.lsManager.getNextId());
        }
        // console.log("TABLET ID IS : " + this.dataId.id);
        // Tablet.currentTablet = this.tabletNode;
        this.tabletNode.querySelector('.ti-control .ti-edit').onclick =  this.editTabletHandler();
        this.tabletNode.querySelector('.ti-control .ti-delete').onclick = this.deleteTabletHandler();

        this.tabletNode.addEventListener('mousedown', this.tabletOnMouseDown() );
        this.tabletNode.addEventListener('mousemove', this.tabletOnMouseMove() );
        this.tabletNode.addEventListener('mouseup', this.tabletOnMouseUp() );
    }

    get dataSet(){
        return this.tabletNode.dataset;
    }

    setId(id){
        this.dataSet.id = id;
        this.setZIndeX(id);
    }

    setZIndeX(value){
        this.nodeStyle.zIndex = value;
    }

    get nodeStyle(){
        return this.tabletNode.style;
    }

    get title(){
        return this.tabletNode.getElementsByClassName('ti-title')[0];
    }

    get content(){
        return this.tabletNode.getElementsByClassName('ti-content')[0];
    }

    setTitle(title){
        this.title.innerText = title;
    }

    setContent(content){
        this.content.innerHTML = content;
    }


    getTabletOriginHtml(){
        let container = document.createElement('div');
        container.className = Tablet.tabletItemClassName;
        container.innerHTML = '<div class="ti-control"><div class="ti-edit" title="edit">&sol;</div><div class="ti-delete" title="delete">&times;</div></div><div class="ti-content-o"><h4 class="ti-title">Empty</h4><div class="ti-content"><div style="background-color: red"><p>simple p in red div</p></div></div></div>';
        return container;
    }

    createTabletOrigin(lsTabletData) {
        let tabletNode = this.getTabletOriginHtml();
        let style = '';
        if(lsTabletData){
            style = lsTabletData.style;
        }
        else{
            let styleArr = [];
            styleArr[0] = Math.random() * (window.innerHeight-160)+'px';
            styleArr[1] = Math.random() * (window.innerWidth-240)+'px';
            styleArr[2] = 'rgba(255,255,255,1)';
            style = this.getTabletStyleTemplate(styleArr);
        }

        tabletNode.classList.remove('hidden');
        tabletNode.style = style;
        return tabletNode;
    }

    /** [0] - top; [1] - left; [2] - bg color. */
    getTabletStyleTemplate(data=undefined){
        let arr = [];
        if(data){
            arr = data;
        }else{
            arr[0] = this.nodeStyle.top;
            arr[1] = this.nodeStyle.left;
            arr[2] = this.nodeStyle.backgroundColor;
        }
        return 'top:' + arr[0] + ';left:' + arr[1] + ';background-color:' + arr[2];
    }

    toTabletData(){
        return {
            id: this.dataSet.id,
            style: this.getTabletStyleTemplate(),
            title: this.title.innerText,
            content: this.content.innerHTML
        };
    }



    /** Events */

    isControlNode(target){
        return target.classList.contains(Tablet.editControlClassName) || target.classList.contains(Tablet.deleteControlClassName)
    }

    //Mouse Down
    tabletOnMouseDown() {
        return (e) => {
            Tablet.currentTablet = this;
            if( !this.isControlNode(e.target)){
                e.preventDefault();
                this.setZIndeX(1000);
                Tablet.isMouseDown = true;
                this.captureShiftXY(e, this.tabletNode);
            }
        }
    }

    //Mouse Move
    tabletOnMouseMove() {
        return (e) => {
            e.preventDefault();
            if( !Tablet.isMouseDown)
                return;
            this.moveTo(e, this.tabletNode);
        }
    }

    //Mouse Up
    tabletOnMouseUp() {
        return (e) => {
            if( !this.isControlNode(e.target)){
                e.preventDefault();
                this.setZIndeX(this.dataSet.id);
                Tablet.isMouseDown = false;
                this.captureShiftXY(e, this.tabletNode);
                Tablet.lsManager.saveTabletData(this.toTabletData());
            }
        }
    }

    //Edit Tablet
    editTabletHandler() {
        // Tablet.currentTablet = tablet;
        return (e) => {
            e.preventDefault();
            Tablet.dialog.setData();
            Tablet.dialog.show();
        }
    }

    //Delete Tablet
    deleteTabletHandler(){
        // Tablet.currentTablet = tablet;
        // let id = Tablet.currentTablet.dataset.id;
        return (e) => {
            console.log('delete');
            // e.stopPropagation();
            // this.tabletNode.parentNode.removeChild(this.tabletNode);
            // Tablet.lsManager.deleteTabletData(this.dataId.id);
            Tablet.currentTablet.tabletNode.parentNode.removeChild(Tablet.currentTablet.tabletNode);
            Tablet.lsManager.deleteTabletData(Tablet.currentTablet.dataSet.id);
        }
    }

    //Drag N Drop
    captureShiftXY(e, tablet) {
        Tablet.shiftX = e.pageX - parseInt(tablet.style.left);
        Tablet.shiftY = e.pageY - parseInt(tablet.style.top);
    }

    moveTo(e, tablet){
        tablet.style.left = (e.pageX - Tablet.shiftX)+'px';
        tablet.style.top = (e.pageY - Tablet.shiftY)+'px';
    }


}