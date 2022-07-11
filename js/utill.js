function createStuffObj(stuffData, ctx, save){
    const stuffArr = [];

    stuffData.forEach(el => {
        let name;
        let info;
        let x;
        let y;
        let width;
        let height;
        let itemName;
        let itemInfo;
        let hintMsg;
    
        name = el.name;
        x = el.x;
        y = el.y;
        width = el.width;
        height = el.height;

        el.properties.forEach(el2 => {
            if(el2.name === "info"){
                info = el2.value;
            }
            if(el2.name === "itemName"){
                itemName = el2.value;
            }
            if(el2.name === "itemInfo"){
                itemInfo = el2.value;
            }
            if(el2.name === "hintMsg"){
                hintMsg = el2.value;
            }
        });

        if(name === "구급함"){
            stuffArr.push(new SavePoint({ctx, name, info, x, y, width, height, itemName, itemInfo}));
        }else if(name === "엑스레이보드"){
            stuffArr.push(new StuffHint({ctx, name, info, x, y, width, height, itemName, itemInfo, hintMsg}));
        }
        else{
            stuffArr.push(new Stuff({ctx, name, info, x, y, width, height, itemName, itemInfo}));
        }
        itemInfo = "";
    });
    return stuffArr;
}

function createPortalObj(portalData){
    const portalArr = [];
    
    portalData.forEach(el => {
        let name;
        let info;
        let x;
        let y;
        let width;
        let height;
        let itemName;
        let itemInfo;
    
        let isDead;
        let isKeyboard;
        let isPortal;
        let nextStage;
        let notAvailableMsg;
        let pw;

        name = el.name;
        x = el.x;
        y = el.y;
        width = el.width;
        height = el.height;

        el.properties.forEach(el2 => {
            if(el2.name === "info"){
                info = el2.value;
            }
            if(el2.name === "itemName"){
                itemName = el2.value;
            }
            if(el2.name === "itemInfo"){
                itemInfo = el2.value;
            }
            if(el2.name === "isDead"){
                isDead = el2.value;
            }
            if(el2.name === "isKeyboard"){
                isKeyboard = el2.value;
            }
            if(el2.name === "isPortal"){
                isPortal = el2.value;
            }
            if(el2.name === "nextStage"){
                nextStage = el2.value;
            }
            if(el2.name === "notAvailableMsg"){
                notAvailableMsg = el2.value;
            }
            if(el2.name === "pw"){
                pw = el2.value;
            }
            
        });

        portalArr.push(new Portal({ ctx, name, info, x, y, width, height, itemName, itemInfo, pw, isKeyboard, isPortal, isDead, nextStage, notAvailableMsg }));
    });
    return portalArr;
}


function textBoxView(text){
    _text_box.style.zIndex = 999;
    _text.innerHTML = text;
}

function textBoxHidden(){
    _text_box.style.zIndex = 0;
    _text.innerHTML = "";
}

