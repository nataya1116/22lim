// 플레이어 클래스
class Player {
    constructor();
}

// 맵 클래스
class Map {
    constructor();
}

// 사물 클래스
class Stuff {
    constructor({ ctx, name, x, y, width, height, item, infoMsg }){
        this.ctx = ctx;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height;
        this.item = item;
        this.infoMsg = infoMsg;
        this.inactionMsg = "아무일도 일어나지 않는다.";
        this.takeMsg = "을(를) 찾았다.";
    }

    // ctx 객체를 이용해 캔버스에 그려준다.(이미지를 직접적으로 그려주는 것이 아닌 색상을 채워주는 방식으로 만든다.)
    draw(){

    }

    // 사물 객체에서 item을 제거한다.
    // item 값을 ""(빈 값)로 바꿔준다.
    emptyItem(){

    }

    // 사물 객체에 아이템이 없을 경우 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.infoMsg, item : "" } 객체를 만들어 리턴한다.
    emptyItemMsg(){

    }

    // 사물 객체에서 아이템을 제거할 때 사용할 함수로 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.item+this.takeMsg, item : "" }  객체를 만들어 리턴한다.
    exportItemMsg(){

    }

    // 플레이어가 스페이스를 눌렀을 때 불러질 함수
    // this.item이 빈 값이 아닌 경우 this.exportItemMsg()를 실행해 결과값을 저장해 두었다가 this.emptyItem()를 실행하여 값을 비워준 후 결과값을 리턴한다. this.item이 빈값인 경우 this.emptyItemMsg()를 실행하고 결과값을 리턴한다.
    contact(){

    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다. 기본은 아무 반응이 없다는 메세지를 보낸다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서는 삭제되고 putItem에 아이템 변수가 들어오게 된다.
    // 플레이어 인벤토리에서 아이템을 사용하면 인벤토리에서 삭제 안했다가 반응이 있을 경우 삭제할 수 도 있다. 
    // { msg : this.inactionMsg, item : item } 객체로 만들어 리턴(반응이 없으므로 아이템을 다시 플레이어에게 돌려준다.)
    putItem(item){

    }


}

// 아이템을 넣으면 힌트를 주는 클래스로 Stuff의 자식 클래스이다.
class StuffHint extends Stuff {
    constructor({ ctx, name, x, y, width, height, item, infoMsg, hintMsg }){
        super({ ctx, name, x, y, width, height, item, infoMsg });
        this.hintMsg = hintMsg;
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // this.item이 인자로 받은 item과 동일하다면. this.infoMsg+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    putItem(item){

    }
}

// 구급함(세이브) 클래스
class SavePoint extends Stuff {
    constructor({ ctx, name, x, y, width, height, item, infoMsg, save }){
        super({ ctx, name, x, y, width, height, item, infoMsg });
        this.save = save;
        this.succeseMsg = "저장되었다.";
        this.failureMsg = "저장에 실패하였다.";
    }

    // 세이브 성공 시 리턴값(객체) 만들어줌
    // { msg : this.succeseMsg, item : "" } 객체를 만들어 리턴한다.
    succeseMsg(){
        
    }

    
    // 세이브 실패 시 리턴값(객체) 만들어줌
    // { msg : this.failureMsg, item : "" } 객체를 만들어 리턴한다.
    failureMsg(){
    
    }

    // this.item이 인자로 받은 item과 동일하다면. save.LocalStorage() 실행 후 this.saveMsg()를 실행해서 결과값을 리턴한다.
    putItem(item){

    }
}

// 문(엘리베이터 포함) 클래스
class Door extends Stuff {
    constructor({ ctx, name, x, y, width, height, item, infoMsg, pw, isPortal, isDead, nextStage, notAvailableMsg }){
        super({ ctx, name, x, y, width, height, item, infoMsg });
        this.pw = pw;
        this.isPortal = isPortal;
        this.isDead = isDead;
        this.nextStage = nextStage;
        this.notAvailableMsg = notAvailableMsg;
        this.wrongPwMsg = "비밀번호가 맞지 않습니다.";
    }

    // 플레이어가 아이템을 사용했을 때 불러질 함수이다.
    // 문 클래스에서 아이템은 키이다.
    // this.item이 인자로 받은 item과 동일하다면. this.infoMsg+=this.hintMsg 하고 this.emptyItemMsg()를 실행해서 결과값을 리턴한다.
    putItem(item){

    }

    // this.nextStage에 저장된 스테이지로 이동
    nextStage(){

    }

    // 문을 사용할 수 없을 때 리턴할 객체를 생성
    // {msg : *notAvailable, item : ""} 객체로 만들어 리턴
    notAvailable(){

    }

    // 비밀번호가 틀렸을 때 리턴할 객체를 생성
    // {msg : *wrongPwMsg, item : ""} 객체로 만들어서 리턴
    wrongPwMsg(){

    }

    // this.pw와 인자로 받은 pw가 동일하면 true 아니면 false리턴
    samePw(pw){

    }

    // 비밀번호 입력 받는 창 띄어야 될듯
    // samePw(pw)를 실행시켜서 결과값이 true이면 this.nextStage() 실행
    // false이면 this.wrongPwMsg() 실행해서 결과값을 리턴함.
    inputPw(pw){

    }

    // this.pw 값이 없고 this.isPortal이 true일  경우 this.nextStage() 실행
    // this.pw 값이 없고 this.isPortal이 false일 경우 this.notAvailable()실행해서 결과값 리턴
    // this.pw 값이 있는 경우 this.inputPw(pw) 실행해서 결과 값을 리턴   
    contact(){

    }

}
