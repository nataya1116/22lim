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

// function itemget(name, info, useing){
//     let items = _item.querySelectorAll(".item_td");
//     // 아이템 정보를 만들어 주고(넣어주고)
//     isInventory.insert(new Item(name, info, useing));
//     // 추가한 아이템의 배열을 가져오고
//     let arr = isInventory.importList();
//     // 추가한 아이템 배열(arr)을 updateItem 함수에 전달
//     updateItem(arr);
// }

// function removeItem(name){
//     // 추가한 아이템의 배열을 가져오고
//     // 가져온 배열에서 없앨 아이템을 이름으로 구분해서 제거한다.
//     isInventory.out(name); 
//     //why 중복?
//     let arr = isInventory.importList();
//      // 제거한 후 아이템 배열(arr)을 updateItem 함수에 전달
//     updateItem(arr);
// }

// function updateItem(arr){
//     let items = _item.querySelectorAll(".item_td");
//     for (let i = 0; i < items.length; i++) {
//         if(i < arr.length)
//         {
//             items[i].innerHTML = arr[i].name;
//             items[i].classList.add('have');
//             items[i].onclick = function(){
//                 _item_use.style.zIndex = 9999;
//                 _item_text.querySelector('span').innerHTML = arr[i].info;       
//                 _item_text.querySelector('button').onclick = function(){
//                     // 배열안에 useing 정보가 false면 
//                     if(arr[i].useing === false)
//                     {   
//                         // 삭제한다.
//                         // 위에서 선언한 removeItem 함수를 가져와서
//                         // 배열안에 false인 useing 값을 가지고 있는 객체의 이름을 지워준다.     
//                         removeItem( arr[i].name);
//                     }
//                 }      
//             };
//         }   
//         else{
//             items[i].innerHTML = "";
//             items[i].classList.remove('have');
//         }
//     }
//     // 클릭후 현재 아이템 배열의 현황을 보여준다. 
//     // 즉 isInventory.importList() 현재 아이템 배열이라는 것을 알 수 있다.
//     console.log(isInventory.importList());
// }

window.addEventListener('keydown',function(e){
    if(mapState !== "_play_page") return
    // key = ' ' 는 스페이스바의 key 값
    if(e.key === ' ')
    {
        // 아이템 추가 함수 (위 itemget 함수 처럼 정보를 담아 주면 된다. false 면 삭제 true면 유지)
        itemget("구급약","구급약이다. 더 이상의 설명은 생략한다.",true);
        itemget("엑스레이 필름","엑스레이 필름을 어디서 사용할까?",true);
        itemget(" ds","구급함이다 아이템을 넣어둘 수 있다.",false);
    }
})

// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++
const ctx = "";

const stuffTempArr = createStuffObj(stuffsStg1, ctx);
console.log(stuffTempArr); 
const stuffTempArr2 = createStuffObj(stuffsStg2, ctx);
console.log(stuffTempArr2);
// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++

// let settingBoardView = false
console.log(isInventory.importList());
window.onkeydown = function(event){
    if(mapState !== "_play_page") return;

    if(event.key == "i" || event.key == "ㅑ"){
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

    // 퀴즈 값 받을 때
    if(event.key == "Enter"){
        if(isQuizeBox){
            
        }
    }

// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
    if(event.key == "z"){
        if(isTextBoxView){
            
            textBoxHidden();
        }else if(isPopupOpen === false){

            const temp = stuffTempArr[12].contact();
   
            textBoxView(temp.msg);
            isInventory.insert(temp.item);
        }
    }
// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++
    if(event.key == "x" ){
        if(isTextBoxView){
            
            textBoxHidden();
        }else if(isPopupOpen === false){
            const temp = stuffTempArr[2].contact();
 
            textBoxView(temp.msg);
            isInventory.insert(temp.item);
        }
    }

    if(event.key == "c"){
        if(isQuizeBox){
            quizeBoxHidden();
            textBoxHidden();
        }else if(isPopupOpen === false){
            const temp = portalsMapSt1[0];
            const ret = temp.contact();
            isQuizeBox = true;
            // 현재 이동을 구현하지 않아 스테이지를 이동하지 않는다.
            if(ret.move || ret.type === "not") {
                textBoxView(ret.msg);
            }
            else {
                quizeBoxView(ret.msg, temp);
            }
        }
    }

    if(event.key == "v"){
        if(isQuizeBox){
            quizeBoxHidden();
            textBoxHidden();
        }else if(isPopupOpen === false){
            const temp = portalsMapSt1[1];
            const ret = temp.contact(); 
            isQuizeBox = true;
            // 현재 이동을 구현하지 않아 스테이지를 이동하지 않는다.
            if(ret.move || ret.type === "not") {
                textBoxView(ret.msg);
            }
            else {
                quizeBoxView(ret.msg, temp);
            }
        }
    }

// ++++++++++++++++++++++++++ 사물 스페이스 테스트 +++++++++++++++++++++++++++

}

// function textBoxView(text){
//     isPopupOpen = true;
//     isTextBoxView = true;
//     _text_box.style.zIndex = 999;
//     _text.innerHTML = text;
// }

function quizeBoxView(text, portal){
    isPopupOpen = true;
    isQuizeBox = true;
    _answer_input.focus();
    _answer_input.data = JSON.stringify(portal);
    console.log(_answer_input.data);
    _quize_box.style.zIndex = 999;
    _answer.innerHTML = text;
}

function quizeBoxHidden(){
    isPopupOpen = false;
    isQuizeBox = false;
    _quize_box.style.zIndex = 0;
    _answer.innerHTML = "";
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

document.querySelectorAll('.item_td').forEach(e=>{
    e.addEventListener('click',function(){
        document.querySelectorAll('.item_td').forEach(e=>{
            e.classList.remove('active')
        })
        this.classList.add('active');
    })
})