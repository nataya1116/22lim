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

// window.addEventListener('keydown',function(e){
//     if(mapState !== "_play_page") return
//     // key = ' ' 는 스페이스바의 key 값
//     // if(e.key === ' ')
//     // {
//     //     // 아이템 추가 함수 (위 itemget 함수 처럼 정보를 담아 주면 된다. false 면 삭제 true면 유지)
//     //     itemget("구급약","구급약이다. 더 이상의 설명은 생략한다.",true);
//     //     itemget("엑스레이 필름","엑스레이 필름을 어디서 사용할까?",true);
//     //     itemget(" ds","구급함이다 아이템을 넣어둘 수 있다.",false);
//     // }
// })

// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++
const ctx = "";

const stuffTempArr = createStuffObj(stuffsStg1, ctx, offsetSt1);
// console.log(stuffTempArr); 
const stuffTempArr2 = createStuffObj(stuffsStg2, ctx, offsetSt1);
// console.log(stuffTempArr2);
// ++++++++++++++++++++++++++ 테스트 +++++++++++++++++++++++++++

// let settingBoardView = false
// console.log(isInventory.importList());
window.addEventListener(  
    'keydown', function(event){
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
        if(_load_filed.style.zIndex=="999"){
            _load_filed.style.zIndex = 0 ;
        }
    }

    if(event.key == ' ') {
        const stuff = stuffsMapSt1.find((stuff) => {
            let col = rectangularCollision({
                rectangle1: playerRaycastSt1.raycast(),
                rectangle2: {width : stuff.width, height : stuff.height, position : stuff.position}
                // rectangle2: stuff
            });
    
            if(!!col) {
                return stuff;
            }
        });

        if(!!stuff){
            // 세이브 생략
            if(stuff.name === "구급함") return;

            if(stuff.name === "게시판" && boardCnt === 2){
                gsap.to('#_stg_back', {
                    zIndex : 1000,
                    opacity: 0.9,
                    repeat : 3,
                    yoyo : true,
                    duration:0.2,
                    display : "block",
                    onComplete(){
                        gsap.to('#_stg_back',{
                            opacity: 1,
                            display : "block"
                        })
                        image.src = '/img/background/backgroundAfterStg1.png';
                        foregroundImage.src = '/img/background/foreGroundAfterStg1.png';
                    }
                });
                
            }

            if (stuff.name === "게시판") boardCnt++;
            if(isTextBoxView){
                textBoxHidden();
                return;
            }else if(isPopupOpen === false){
                const ret = stuff.contact(); 
                console.log(ret);
                textBoxView(ret.msg);
                if(!!ret.item.name) itemget(ret.item.name, ret.item.info, true);
                return;
            }
        }
    
        
        const portal = portalsMapSt1.find((portal) => {
            let col = rectangularCollision({
                rectangle1: playerRaycastSt1.raycast(),
                // rectangle2: {width : portal.width, height : portal.height, position : portal.position}
                rectangle2: portal
            });
    
            if(!!col) {
                return portal;
            }
        })

        if(!!portal){
            console.log(portal);
            if(isQuizeBox){
                quizeBoxHidden();
                return;
            }else if(isPopupOpen === false){

                // TODO 뒤지는 거랑 맵 스테이트 게임 오버로 수정

                const ret = portal.contact();
                isQuizeBox = true;
                console.log("dd")
                quizeBoxView(ret.msg, portal.name, portal.isKeyboard);
                return;
            }
        }
    }

    // 퀴즈 값 받을 때
    if(event.key == "Enter"){
        if(isQuizeBox){
            const portal = portalsMapSt1.find(i => { return i.name  === _answer_input.data })
            const ret = portal.inputPw(_answer_input.value);

            quizeBoxView(ret.msg, "", false);

        }
    }


});

let prolSkip = document.querySelector(".prolSkip")
 

// function btnSkip(event){
//     event.push = ".prolSkip"
//     event.style.fontSize = "27px";
// }

prolSkip.onclick = function(){
    document.querySelectorAll('#container_box>div').forEach(el => {
            el.style.zIndex = 999;
            el.style.display = "none";
        })
        _play_page.style.zIndex = 999;
        _play_page.style.display = "block";
        
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