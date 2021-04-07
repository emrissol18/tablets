/** LocalStorage Manager */
class LSManager {

    static TABLETS_ALL = 'tablets-all';
    static TABLETS_LAST_IDS = 'tablets-lid';


    constructor() {
        //store id's that last TabletData was deleted by
        this.lastIds = [];
        //get all tablets from localStorage
        this.tabletsDataAll = [];
    }


    /** Save TabletData element. */
    saveTabletData(tabletData){
        this.tabletsDataAll = this.fetchTabletDataAll();
        let index = this.getIndex(tabletData.id);
        if(index >= 0){
            this.tabletsDataAll[index] = tabletData;
        }
        else{
            this.tabletsDataAll.push(tabletData);
        }
        this.persistTabletsAll();
    }


    /** Delete item by ID and store the ID to be set for future TabletData element. */
    deleteTabletData(id){
        this.tabletsDataAll = this.fetchTabletDataAll();
        this.lastIds = this.fetchLastIds();
        // console.log('deleting id ' + id);
        if (this.tabletsDataAll.length > 0) {
            for (let i = 0; i < this.tabletsDataAll.length; i++) {
                if (this.tabletsDataAll[i].id === id) {
                    this.tabletsDataAll.splice(i, 1);
                    this.lastIds.push(id);
                    break;
                }
            }
            this.persistAll();
        }
    }


    /** Put all data into localStorage*/
    persistAll(){
        this.persistTabletsAll();
        this.persistLastIds();
    }

    persistTabletsAll(){
        if(this.tabletsDataAll)
            localStorage.setItem(LSManager.TABLETS_ALL, JSON.stringify(this.tabletsDataAll));
    }

    persistLastIds(){
        if (this.lastIds)
            localStorage.setItem(LSManager.TABLETS_LAST_IDS, JSON.stringify(this.lastIds));
    }

    /** Obtain all data from localStorage*/
    // fetchAll(){
    //     this.tabletsDataAll = this.fetchTabletDataAll();
    //     this.lastIds = this.fetchLastIds();
    // }

    fetchTabletDataAll(){
        let tabletsAll = JSON.parse( localStorage.getItem(LSManager.TABLETS_ALL) );
        if ( !tabletsAll) tabletsAll = [];
        return tabletsAll;
    }

    fetchLastIds(){
        let lastIds = JSON.parse( localStorage.getItem(LSManager.TABLETS_LAST_IDS) );
        if( !lastIds) lastIds = [];
        return lastIds;
    }

    getIndex(id){
        return this.tabletsDataAll.findIndex( (tablet) => tablet.id === id);
    }

    getNextId(){
        let id = undefined;
        if( (this.lastIds = this.fetchLastIds()).length > 0){
            id = this.lastIds.shift();
            this.persistLastIds();
        }else{
            id = this.fetchTabletDataAll().length + 1;
        }
        return id;
    }

}