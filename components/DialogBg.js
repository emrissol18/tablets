class DialogBg{

    static suggestColorArr = [
        'rgba(91,107,155,1)',
        'rgba(91,107,155,1)',
        'rgba(91,107,155,1)',
        'rgba(91,107,155,1)',
        'rgba(91,107,155,1)'
    ];

    constructor() {
        this.applyColor = undefined;
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.t = 1;
        this.prependSuggestColor();

        this.submitNode.addEventListener('click', (e) => this.submitClickEventHandler(this.getRgbaStyle(), true));
    }

    resetData(){
        this.rNode.value = '';
        this.gNode.value = '';
        this.bNode.value = '';
        this.tNode.value = '';
        this.applyColor = undefined;
    }

    prependSuggestColor(){
        if(DialogBg.suggestColorArr.length > 0){
            for (let i = 0; i < DialogBg.suggestColorArr.length; i++) {
                let color = document.createElement('span');
                color.style.backgroundColor = DialogBg.suggestColorArr[i];
                color.addEventListener('click', (e) => this.submitClickEventHandler(color.style.backgroundColor));
                this.container.prepend(color);
            }
        }
    }


    getRgbaStyle(){
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.t + ')';
    }

    get wrap(){
        return document.getElementById('dialogBGSuggestWrap');
    }

    get container(){
        return document.getElementById('dialogBGSuggest');
    }

    get rNode(){
      return document.getElementById('bgR');
    }

    get gNode(){
        return document.getElementById('bgG');
    }

    get bNode(){
        return document.getElementById('bgB');
    }

    get tNode(){
        return document.getElementById('bgT');
    }

    get submitNode(){
        return document.getElementById('bgsSubmit');
    }

    get styleNode(){
        return document.getElementById('dialogStyle');
    }

    submitClickEventHandler(color, buttonEvent = false){
        if(buttonEvent && !this.validRGB()){
            return;
        }
        this.styleNode.style.backgroundColor = color;
        this.applyColor = color;
        this.close();
    }

    close(){
        this.wrap.classList.add('hidden');
    }

    show(){
        this.wrap.classList.remove('hidden');
    }

    applyBGColor(){
        if(Tablet.currentTablet && this.applyColor){
            Tablet.currentTablet.nodeStyle.backgroundColor = this.applyColor;
        }
        this.resetData();
    }

    setData(){
        this.r = this.rNode.value;
        this.g = this.gNode.value;
        this.b = this.bNode.value;
        this.t = this.tNode.value;
    }

    validRGB(){
        this.setData();
        return this.validRGBValue(this.r) && this.validRGBValue(this.g) && this.validRGBValue(this.b) && (this.t >= 0 && this.t <= 1);
    }

    validRGBValue(value){
        return value>=0 && value<=255;
    }
}