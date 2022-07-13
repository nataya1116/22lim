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
            // 아이템 배열안의 이름을 html 에 그려주는 역할
            items[i].innerHTML = arr[i].name;
            items[i].classList.add('have');
            items[i].onclick = function(){
                _item_use.style.zIndex = 9999;
                _item_text.querySelector('span').innerHTML = arr[i].info;       
                _item_text.querySelector('button').onclick = function(){
                    // 배열안에 useing 정보가 false면 
                    if(arr[i].useing === false){   
                        // 삭제한다.
                        // 위에서 선언한 removeItem 함수를 가져와서
                        // 배열안에 false인 useing 값을 가지고 있는 객체의 이름을 지워준다.     
                        removeItem( arr[i].name);
                         //이름이 삭제 될때 인벤토리 창이 같이 없어진다.
                        if(isInventoryView){
                            inventoryHidden();
                        }else if(isPopupOpen === false){
                            inventoryView();
                        }
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
