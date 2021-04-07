window.onload = function () {

    /** Config */

    var content = document.getElementById("content");
    const addTabletButton = document.querySelector("#addTablet button");

    let lsManager = Tablet.lsManager;

    /** App */

    addTabletButton.onclick = addTabletBtnClickHandler();
    document.onmouseup = (e) => {
        Tablet.isMouseDown = false;
        // console.log(lsManager.fetchTabletDataAll());
    };

    document.getElementById('clear').addEventListener('click', function () {
        localStorage.clear();
    });
    // localStorage.clear();
    displayStoredTables();

    /** Event Handlers */

    //Tablet
    function addTabletBtnClickHandler() {
        return (e) => {
            e.preventDefault();
            let tablet = createTablet();
            content.appendChild(tablet.tabletNode);
            // let tabletData = new TabletData(
            //     parseInt(tablet.tabletNode.style.left),
            //     parseInt(tablet.tabletNode.style.top),
            //     tablet.title.innerText,
            //     tablet.content.innerHTML);
        };
    }

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


    // function getCurrentTabletTitle() {
    //     return Tablet.currentTablet.getElementsByClassName('ti-title')[0];
    // }
    //
    // function getCurrentTabletContent() {
    //     return Tablet.currentTablet.getElementsByClassName('ti-content')[0];
    // }


};