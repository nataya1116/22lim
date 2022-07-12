const itemList = []
// 70인 이유는 tiled상 지도의 너비가 70이기 때문
// for (let i = 0; i < item_td.length; i++) {
//     itemList.push(item_td)

//     // console.log(collisions.slice(i, 70 + i)); 이렇게 반복하면서 배열안에 0과 1025를 콘솔로 구분할 수
//     // 있다.
// }
    
// let playPage = document.querySelector('.playPage');
// let startPage = document.querySelector('.startPage');
// let test = document.querySelector('.test');
// let test2 = document.querySelector('.test2');


window.onload =function(){
    _start_page.style.zIndex = 999;

}

// const mainButton = false
_main_button.onclick = function(){
        _setting_board.style.zIndex = 0;
        _start_page.style.zIndex = 999;
        location.reload("_play_page");
}
// }======================================================================
_loadfile_button.onclick = function(){
    _setting_board.style.zIndex = 0;
    _load_filed.style.zIndex = 999;
//     // if(loadFiled.style.zIndex = 999){
//         console.log("들어오긴하냐?2");
        
//     // }
//     if(window.onkeydown(event)){
        
//         // switch (key) {
//         //     case "Escape":
//         //     loadFiled.style.zIndex = 0;
                
//         // }
//         if(event.key == "Escape"){
//             loadFiled.style.zIndex = 0;
//         }
//     }
}
//======================================================================


_start_btn.onclick = function(){
        // if(!playPage.classList.contains("test")){
        //     playPage.classList.add("test")
        //     startPage.classList.add("test2")
            
        // }else{
        //     playPage.classList.remove("test")
        //     startPage.classList.remove("test2")
        // }
        paragraph(prologText);
        document.querySelectorAll('#container_box>div').forEach(el => {
            el.style.zIndex = "";
        })
        // let mas=
        _prolog.style.zIndex = 999;
        mapState = "_prolog";
    };
    // 하위 인벤토리 창이 먼저 뜨고 거기에 엑스레이 필름을 누르면  상위 보드 뜨게 하기

_load_btn.onclick = function(){

        // document.querySelectorAll('#container_box>div').forEach(el => {
        //     el.style.zIndex = "";
        // })

        _load_list.style.zIndex = 999;
        mapState = "_load_list";
        
};

//===============================================================
    

let isInventory = new Inventory([]);

function itemget(){
    // let tr = document.createElement('tr');
    // let td = document.createElement('td');
    // let td2 = document.createElement('td');
    // td.id = "item_td";
    // td2.id = "item_td";
    // tr.appendChild(td);
    // tr.appendChild(td2);
    // item.appendChild(tr);
    // query 반환값 배열
    let items = _item.querySelectorAll(".item_td");
    isInventory.insert(new Item("사과","맛있다"));
    // isInventory.insert(new Item("바나나","맛없다"));
    // isInventory.insert(new Item("애플","하"));
    // isInventory.insert(new Item("체리","집가고싶어"));
    let arr = isInventory.importList();
    console.log(items);
    for (let i = 0; i < items.length; i++) {
        if(i < arr.length)
        {
            items[i].innerHTML = arr[i].name;
            items[i].classList.add('have');
            items[i].onclick = function(){
                _item_use.style.zIndex = 9999;
                _item_text.querySelector('span').innerHTML = arr[i].text;            
            };
        }   
        else{
            items[i].innerHTML = "";
            items[i].classList.remove('have');
        }
    }
}

window.addEventListener('keydown',function(e){
    if(mapState !== "_play_page") return
    if(e.key === ' ')
    {
        // 아이템 추가 함수
        itemget();
    }
})

// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++
const ctx = "";

const stuffTempArr = createStuffObj(stuffsStg1, ctx);
console.log(stuffTempArr);
// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++

// let settingBoardView = false
console.log(isInventory.importList());
window.onkeydown = function(event){
    if(mapState !== "_play_page") return;

    if(event.key == "i"){
        if(isInventoryView){
            inventoryHidden();
        }else if(isPopupOpen === false){
            inventoryView();
        }
        
    }
    if(event.key == "Escape"){
        if(isSettingBoardView){
            settingBoardHidden();
        }else if(isPopupOpen === false){
            settingBoardView();
        }
        if(_load_filed.style.zIndex="999"){
            _load_filed.style.zIndex = 0 ;
        }
    }

// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
    if(event.key == "z"){
        if(isTextBoxView){
            
            textBoxHidden();
        }else if(isPopupOpen === false){
            console.log(stuffTempArr[12]);
            const temp = stuffTempArr[12].contact();
            console.log(temp);    
            textBoxView(temp.msg);
            isInventory.insert(temp.item);
        }
    }
// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
if(event.key == "x"){
    if(isTextBoxView){
        
        textBoxHidden();
    }else if(isPopupOpen === false){
        console.log(stuffTempArr[2]);
        const temp = stuffTempArr[2].contact();
        console.log(temp);    
        textBoxView(temp.msg);
        isInventory.insert(temp.item);
    }
}
// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++

}




// window.onkeydown = function(event){
//     if(mapState === "playPage")
//     if(event.key == "Escape"){
//         if(settingBoardView){
//             console.log(settingBoard)
//         }
//     }
// }

// settingBoard
// putitem
// use 버튼 누르면 위 함수를 실행하게끔
// 

// 키보드 입력 이벤트
// window.onkeydown = function(event){
//     // _input 이기에 이벤트는 keyboardEvent
//     console.log(event); // 이벤트 객체
//     console.log(event.keyCode); // 키보드의 아스키코드가 나옴(한글은 229만 나옴)
//     console.log(event.key);     // 키보드의 키(숫자, 영문만) 엔터도 나옴
// }
let prolSkip = document.querySelector(".prolSkip")
 

// function btnSkip(event){
//     event.push = ".prolSkip"
//     event.style.fontSize = "27px";
// }

prolSkip.onclick = function(){
    document.querySelectorAll('#container_box>div').forEach(el => {
            el.style.zIndex = "";
        })
        _play_page.style.zIndex = 999;
        
        mapState = "_play_page";
        // // setTimeout(function() {
        // //     // event.prolSkip.style.fontSize = "27px";
        // //     console.log("됨?")
        // // }, 3000);
        // setTimeout(btnSkip,3000);
        
}



const prologText = document.getElementById('_prolog_text');