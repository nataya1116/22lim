// 플레이어 클래스
class Player {
    constructor(){}

    //move()

    //collision()

    //interation()

    //door()
}

// 맵 클래스
class Map {
    constructor(){

    }
    
    // 배열의 width를 70타일씩 자르고 싶을떄
    arrCut(){
        for (let i=0; i<collisions.lenth; i+=70){    
            collisions.slice(i, 70+i) 
        }
    } 
    
    // 현재 반복하고 있는 기호가 1025와 같을 때만 경계를 그리고 싶을때 
    boundaryLine() {
        collisionsMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025) 
                    boundaries.push(new Boundary({
                        postion: {
                            x: j * Boundary.width + offset.x,
                            y: i *Boundary.height + offset.y
                        }
                    }))
            })
        })
    }
    
    // 고정된 이미지가 아니라 반복되는 이미지를 draw() 하고 싶을때
    animate(){
       window.requestAnimationFrame(animate)
    }
    
    
    portalJump(){
        // 해당위치에서 keyDown했을떄 다음 맵으로 넘어가는 기능을 사용하고 싶을때 
    }
    
    trapZone(){
        // 플레이어가 해당 좌표에 닿았을때 trap 이벤트 발생 
        // 이차원 배열 필요
    }
    
    tileMap(url ){

    }
}

class Boundary {
    // 정적속성
    static width =48 	
    static height =48
    constructor({position}) {
        this.postion = position
        // 지도 내에 생성되는 경계블록의 크기 예시에서는 12x12를 사용하였지만 여기서 400%확대한
        this.width=48        
        // 이미지를 가져왔기 때문에 12x4= 48 즉 48x48이 원하는 크기가 된다.
        this.height=48	
    }
    // 처음에 선언한 const c = canvas.getContext('2d') 캔버스 컨텍스트를 선택한다.
    draw() {
    // 처음 tiled에서 설정한것과 동일하게 red로 확인가능 더 확실하게는 rgba를 이용
    c.fillStyle = 'red' 
    // 첫번째 인수 x, 두번째 인수y, 세번째 인수 width, 네번째 인수 height 를 참조하여 캔버스에 drow
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

// 사물 클래스
class Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo}){
        this.ctx = ctx;
        this.name = name;
        this.position = { x, y }; // x/y 값을 가짐
        this.width = width
        this.height = height;
        this.item = { name : itemName, info : itemInfo };
        this.info = info; // 기본 설명 메세지(ex : “고장난 시계다.”, “낡아보이는 서랍장이다.”, “낡은 게시판 \n body”) 
        this.inactionMsg = "아무일도 일어나지 않는다.";
        this.takeMsg = "을(를) 찾았다.";
    }

    // ctx 객체를 이용해 캔버스에 그려준다.(이미지를 직접적으로 그려주는 것이 아닌 색상을 채워주는 방식으로 만든다.)
    // 준우님이 해주시기로
    draw(){

    }

    // 사물 객체에서 item을 제거한다.
    // itemName/itemInfo 값을 ""(빈 값)로 바꿔준다.
    emptyItem(){
        this.item.name = "";
        this.item.info = "";
    }

    // 사물 객체에 아이템이 없을 경우 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.info, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // emptyItemMsg(){
    //     return { msg : this.info, item : "" };
    // }
    // =========== 보류 =============

    // 사물 객체에서 아이템을 제거할 때 사용할 함수로 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.item+this.takeMsg, item : "" }  객체를 만들어 리턴한다.
    // =========== 보류 =============
    // exportItemMsg(){
    //     return { msg : this.item.name+this.takeMsg, item : "" };
    // }
    // =========== 보류 =============

    // 플레이어가 스페이스를 눌렀을 때 불러질 함수
    // this.item이 빈 값이 아닌 경우 this.exportItemMsg()를 실행해 결과값을 저장해 두었다가 this.emptyItem()를 실행하여 값을 비워준 후 결과값을 리턴한다. this.item이 빈값인 경우 this.emptyItemMsg()를 실행하고 결과값을 리턴한다.
    contact(){
        if(!!this.item.name){
            console.log(this.item.name+this.takeMsg);
            const res = this.item;
            this.emptyItem();
            return res;
        }else{
            console.log(this.info);
            return this.item;
        }
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다. 기본은 아무 반응이 없다는 메세지를 보낸다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서는 삭제되고 putItem에 아이템 변수가 들어오게 된다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서 삭제 안했다가 반응이 있을 경우 삭제할 수 도 있다. 
    // { msg : this.inactionMsg,  item : item } 객체로 만들어 리턴(기본적으로 반응이 없으므로 아이템을 다시 플레이어에게 돌려준다.)
    putItem(item){
        return { msg : this.inactionMsg,  item : item };
    }
}

// 아이템을 넣으면 힌트를 주는 클래스로 Stuff의 자식 클래스이다.
class StuffHint extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, hintMsg }){
        super({ctx, name, info, x, y, width, height, itemName, itemInfo });
        this.hintMsg = hintMsg;
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // this.item이 인자로 받은 item과 동일하다면. this.info+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    putItem(item){
        if(this.item.name === item.name){
            this.info+=`<br>${this.hintMsg}`;
            super.emptyItem();
            console.log(this.info);
            return this.info;
        }else{
            return super.putItem(item);
        }
    }
}

// 구급함(세이브) 클래스
class SavePoint extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, save }){
        super({ ctx, name, info, x, y, width, height, itemName, itemInfo });
        this.save = save;
        this.succeseMsg = "저장되었다.";
        this.failureMsg = "저장에 실패하였다.";
    }

    // 세이브 성공 시 리턴값(객체) 만들어줌
    // { msg : this.succeseMsg, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // succeseReturn(){
    //     return { msg : this.succeseMsg, item : "" };
    // }
    // =========== 보류 =============

    
    // 세이브 실패 시 리턴값(객체) 만들어줌
    // { msg : this.failureMsg, item : "" } 객체를 만들어 리턴한다.
    // =========== 보류 =============
    // failureMsg(){
    
    // }
    // =========== 보류 =============

    contact(){
        // selectAll();
    }

    // this.item이 인자로 받은 item과 동일하다면. save.LocalStorage() 실행 후 this.saveMsg()를 실행해서 결과값을 리턴한다.
    // 구급약이 있는 상태에서 상호작용을 하면 저장화면이 바로 뜨게 작업할 것
    putItem(item){

    }
}

// 문(엘리베이터 포함) 클래스
class Portal extends Stuff {
    constructor({ ctx, name, info, x, y, width, height, itemName, itemInfo, pw, isKeyboard, isPortal, isDead, nextStage, notAvailableMsg }){
        super({ ctx, name, info, x, y, width, height, itemName, itemInfo });
        this.pw = pw;
        this.isKeyboard = isKeyboard;
        this.isPortal = isPortal;
        this.isDead = isDead;
        this.nextStage = nextStage;
        this.notAvailableMsg = notAvailableMsg;
        this.wrongPwMsg = "비밀번호가 맞지 않습니다.";
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // 문 클래스에서 아이템은 키이다.
    // this.item이 인자로 받은 item과 동일하다면. this.info+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    // putItem(item){

    // }

    // this.nextStage에 저장된 스테이지로 이동
    movingNextStage(){
        console.log(`스테이지${this.nextStage}로 이동`);
    }

    // 문을 사용할 수 없을 때 리턴할 객체를 생성
    // {msg : *notAvailable, item : ""} 객체로 만들어 리턴
    // =========== 보류 =============
    // notAvailable(){

    // }
    // =========== 보류 =============

    // 비밀번호가 틀렸을 때 리턴할 객체를 생성
    // {msg : *wrongPwMsg, item : ""} 객체로 만들어서 리턴
    // =========== 보류 =============
    // wrongPwMsg(){

    // }
    // =========== 보류 =============

    // this.pw와 인자로 받은 pw가 동일하면 true 아니면 false리턴
    samePw(pw){
        return (this.pw !== "" && this.pw === pw )? true : false;
    }

    // 비밀번호 입력 받는 창 띄어야 될듯
    // samePw(pw)를 실행시켜서 결과값이 true이면 this.nextStage() 실행
    // false이면 this.wrongPwMsg() 실행해서 결과값을 리턴함.
    inputPw(pw){
        return this.samePw(pw) ? this.movingNextStage() : {msg : this.wrongPwMsg, item : this.item};
    }

    // this.pw 값이 없고 this.isPortal이 true일  경우 this.nextStage() 실행
    // this.pw 값이 없고 this.isPortal이 false일 경우 this.notAvailable()실행해서 결과값 리턴
    // this.pw 값이 있는 경우 this.inputPw(pw) 실행해서 결과 값을 리턴   
    contact(pw){
        
        if(this.isPortal === false && this.isKeyboard === false) {
            return {msg : this.notAvailableMsg, item : this.item};
        }
        
        if(this.isKeyboard){
            return this.inputPw(pw);
        }else{
            return this.movingNextStage();
        }
    }

}

class Save {
    constructor(){}

    // 세이브 파일 저장
    create(){}

    // 세이브 파일 불러오기(1개)
    selet(){}

    // 세이브 파일 목록 불러오기
    selectAll(){}

    // 세이브 파일 업데이트 하기(1개, 사용하지 않을 수 있음)
    update(){}

    // 세이브 파일 삭제하기(1개)
    delete(){}

}

class Inventory {
    constructor(list){
        this.list = list;
    }

    // 인벤토리 리스트에 아이템 추가
    insert(){}

    // 인벤토리 리스트에서 아이템 꺼내기
    out(){}

    // 인벤토리 리스트 가져오기
    importList(){}
}