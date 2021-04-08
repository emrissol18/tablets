/** Dialog modal for Tablet bg color change. */
class DialogBg{

    static suggestColorArr = [
        'rgba(255,255,255,1)',
        'rgba(44,140,225,1)',
        'rgba(228,143,78,1)',
        'rgba(10,180,145,1)',
        'rgba(222,228,109,1)',
        'rgba(142,77,222,1)',
        'rgba(251,88,32,1)',
        'rgba(65,69,243,1)',
        'rgba(105,186,91,1)',
        'rgba(194,99,248,1)',
        'rgba(26,188,156,1)',
        'rgba(142,77,222,1)',
        'rgba(189,195,199,1)',
        'rgba(104,118,138,1)',
        'rgba(79,195,247,1)',
        'rgba(236,64,122,1)',
        'rgba(189,189,189,1)'
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




    /** Event Handlers */

    submitClickEventHandler(color, buttonEvent = false){
        if(buttonEvent && !this.validRGB()){
            return;
        }
        this.styleNode.style.backgroundColor = color;
        this.applyColor = color;
        this.close();
    }





    /** Functions */

    resetData(){
        this.rNode.value = '';
        this.gNode.value = '';
        this.bNode.value = '';
        this.tNode.value = '';
        this.applyColor = undefined;
    }


    /** Adds predefined bg colors layout. */
    prependSuggestColor(){
        if(DialogBg.suggestColorArr.length > 0){
            for (let i = 0; i < DialogBg.suggestColorArr.length; i++) {
                let color = document.createElement('span');
                color.style.backgroundColor = DialogBg.suggestColorArr[i];
                color.addEventListener('click', (e) => this.submitClickEventHandler(color.style.backgroundColor));
                color.title = DialogBg.suggestColorArr[i];
                this.container.prepend(color);
            }
        }
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

    getRgbaStyle(){
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.t + ')';
    }

    show(){
        this.wrap.classList.remove('hidden');
    }

    close(){
        this.wrap.classList.add('hidden');
    }
}