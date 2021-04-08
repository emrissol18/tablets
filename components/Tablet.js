class Tablet {


    static tabletItemClassName = 'tablet-item';
    static editControlClassName = 'ti-edit';
    static deleteControlClassName = 'ti-delete';

    static currentTablet = undefined;
    static dialog = new Dialog();
    static lsManager = new LSManager();

    static isMouseDown = false;
    static shiftX = 0;
    static shiftY = 0;



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


        //edit tablet control btn
        this.tabletNode.querySelector('.ti-control .ti-edit').onclick =  this.editTabletHandler();
        //delete tablet control btn
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

    get nodeStyle(){
        return this.tabletNode.style;
    }

    get title(){
        return this.tabletNode.getElementsByClassName('ti-title')[0];
    }

    setTitle(title){
        this.title.innerText = title;
    }

    get content(){
        return this.tabletNode.getElementsByClassName('ti-content')[0];
    }

    setContent(content){
        this.content.innerHTML = content;
    }

    /** Returns html element for tabletNode field representation. */
    getTabletOriginHtml(){
        let container = document.createElement('div');
        container.className = Tablet.tabletItemClassName;
        container.innerHTML = '<div class="ti-control"><div class="ti-edit" title="edit">&sol;</div><div class="ti-delete" title="delete">&times;</div></div><div class="ti-content-o"><h4 class="ti-title">Empty</h4><div class="ti-content">empty</div></div>';
        return container;
    }


    /** Creates tablet html represention and configurates it with default values or from storage if exist. */
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


    /** Set or Get tabletNode current style. */
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


    /** Returns tablet information object so it can be stored in localStorage in such format.
     * @see LSManager.saveTabletData
     */
    toTabletData(){
        return {
            id: this.dataSet.id,
            style: this.getTabletStyleTemplate(),
            title: this.title.innerText,
            content: this.content.innerHTML
        };
    }




    /** Event Handlers */

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
        return (e) => {
            e.preventDefault();
            Tablet.dialog.setData();
            Tablet.dialog.show();
        }
    }

    //Delete Tablet
    deleteTabletHandler(){
        return (e) => {
            Tablet.currentTablet.tabletNode.parentNode.removeChild(Tablet.currentTablet.tabletNode);
            Tablet.lsManager.deleteTabletData(Tablet.currentTablet.dataSet.id);
        }
    }




    /** Functions */

    setZIndeX(value){
        this.nodeStyle.zIndex = value;
    }

    isControlNode(target){
        return target.classList.contains(Tablet.editControlClassName) || target.classList.contains(Tablet.deleteControlClassName)
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