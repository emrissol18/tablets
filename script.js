window.onload = function () {


    /** Config */

    var content = document.getElementById("content");
    const addTabletButton = document.querySelector("#addTablet button");

    let lsManager = Tablet.lsManager;




    /** App */

    addTabletButton.onclick = addTabletBtnClickHandler();

    document.onmouseup = (e) => { Tablet.isMouseDown = false; };

    displayStoredTables();



    /** Event Handlers */

    function addTabletBtnClickHandler() {
        return (e) => {
            e.preventDefault();
            content.appendChild(createTablet().tabletNode);
        };
    }




    /** Functions */

    function createTablet(lsTabletData) {
        let tablet = lsTabletData ? new Tablet(lsTabletData) : new Tablet();
        content.appendChild(tablet.tabletNode);
        lsManager.saveTabletData(tablet.toTabletData());
        return tablet;
    }

    function displayStoredTables() {
        let tabletsAll = lsManager.fetchTabletDataAll();
        if(tabletsAll.length > 0){
            for (let i = 0; i < tabletsAll.length; i++) {
                content.appendChild(new Tablet(tabletsAll[i]).tabletNode);
            }
        }
    }


};