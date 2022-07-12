
// ++++++++++++++++++++++++ 생성 함수 ++++++++++++++++++++++++  START
// Stuff 객체 생성 함수

function createStuffObj(stuffData, ctx){
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

// ++++++++++++++++++++++++ 생성 함수 ++++++++++++++++++++++++ END



// ++++++++++++++++++++++++ UI 관련 함수 ++++++++++++++++++++++++ START

function textBoxView(text){
    isPopupOpen = true;
    isTextBoxView = true;
    _text_box.style.zIndex = 999;
    _text.innerHTML = text;
}

function textBoxHidden(){
    isPopupOpen = false;
    isTextBoxView = false;
    _text_box.style.zIndex = 0;
    _text.innerHTML = "";
}

function settingBoardView(){
    _setting_board.style.zIndex = 999;
    isPopupOpen = true;
    isSettingBoardView = true;
}

function settingBoardHidden(){
    _setting_board.style.zIndex = 0;
    isPopupOpen = false;
    isSettingBoardView= false;
}

function inventoryView(){
    _low_inven.style.zIndex = 999;
    isPopupOpen = true;
    isInventoryView = true;
}

function inventoryHidden(){
    _item_use.style.zIndex = 0;
    _low_inven.style.zIndex = 0;
    isPopupOpen = false;
    isInventoryView = false;
}

function paragraph(element) {
    const array = element.innerText.split('')
    const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*']
    const exception = [' ', '\n', '.', ',']
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const numArray = []
    array.forEach(char => {
        const num = random(5, 40)
        numArray.push(num)
    })
    
    let completeCount
    let newText
    const timer = setInterval(() => { 
    completeCount = 0
    newText = ''
    numArray.forEach((num, i) => {
      if (exception.includes(array[i]) || numArray[i] === 0) {
        newText += array[i]
        completeCount += 1
      } else {
        newText += special[numArray[i] % special.length]
        numArray[i] = --num
      }
    })

    element.innerText = newText
    if (completeCount === numArray.length) clearInterval(timer)
  }, 120)
}

function itemget(name, info, useing){
    let items = _item.querySelectorAll(".item_td");
    // 아이템 정보를 만들어 주고(넣어주고)
    isInventory.insert(new Item(name, info, useing));
    // 추가한 아이템의 배열을 가져오고
    let arr = isInventory.importList();
    // 추가한 아이템 배열(arr)을 updateItem 함수에 전달
    updateItem(arr);
}

function removeItem(name){
    // 추가한 아이템의 배열을 가져오고
    // 가져온 배열에서 없앨 아이템을 이름으로 구분해서 제거한다.
    isInventory.out(name); 
    //why 중복?
    let arr = isInventory.importList();
     // 제거한 후 아이템 배열(arr)을 updateItem 함수에 전달
    updateItem(arr);
}

function updateItem(arr){
    let items = _item.querySelectorAll(".item_td");
    for (let i = 0; i < items.length; i++) {
        if(i < arr.length)
        {
            items[i].innerHTML = arr[i].name;
            items[i].classList.add('have');
            items[i].onclick = function(){
                _item_use.style.zIndex = 9999;
                _item_text.querySelector('span').innerHTML = arr[i].info;       
                _item_text.querySelector('button').onclick = function(){
                    // 배열안에 useing 정보가 false면 
                    if(arr[i].useing === false)
                    {   
                        // 삭제한다.
                        // 위에서 선언한 removeItem 함수를 가져와서
                        // 배열안에 false인 useing 값을 가지고 있는 객체의 이름을 지워준다.     
                        removeItem( arr[i].name);
                    }
                }      
            };
        }   
        else{
            items[i].innerHTML = "";
            items[i].classList.remove('have');
        }
    }
    // 클릭후 현재 아이템 배열의 현황을 보여준다. 
    // 즉 isInventory.importList() 현재 아이템 배열이라는 것을 알 수 있다.
    console.log(isInventory.importList());
}


// ++++++++++++++++++++++++ UI 관련 함수 ++++++++++++++++++++++++ END