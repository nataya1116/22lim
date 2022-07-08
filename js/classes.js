class Sprite {
    constructor({position, velocity, image, frames ={max:1}, sprites }){  
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
            // console.log(this.width);
            // console.log(this.height);
        }
        this.moving = false
        this.Sprite = sprites
    }
    draw(){
        // c.drawImage(this.image, this.position.x, this.position.y );
        c.drawImage(
                this.image,
                //       4      x      48      = 192 이미지 총 가로길이
                this.frames.val * this.width,  // 캐릭터는 48px
                0, 
                this.image.width / this.frames.max,  
                this.image.height,  
                this.position.x,
                this.position.y,
                // canvas.width / 2 - (this.image.width / 4) /2, 
                // canvas.height /2 - this.image.height / 2, 
                this.image.width / this.frames.max, 
                this.image.height 
            )
            if(!this.moving) return
            
                if(this.frames.max > 1){
                    this.frames.elapsed++
                }
                if(this.frames.elapsed%10 ===0 ){
                //          1                 4
                if(this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0
            }
        
    }
}

// 클래스 안에서는 따로 fuction 으로 함수를 선언 해주지 않아도 된다.
// 
class Boundary {
    static width =40
    static height =40
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.0)' // 확인용
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

    // 교수님
    // 사물 객체에서 item을 제거한다.
    // itemName/itemInfo 값을 ""(빈 값)로 바꿔준다.
    emptyItem(){
        this.item.name = "";
        this.item.info = "";
    }

    // 교수님
    // 사물 객체에 아이템이 없을 경우 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.info, item : "" } 객체를 만들어 리턴한다.
    emptyItemMsg(){
        return { msg : this.info, item : "" };
    }

    // 교수님
    // 사물 객체에서 아이템을 제거할 때 사용할 함수로 리턴해줄 내용을 객체로 생성한다.
    // { msg : this.item+this.takeMsg, item : "" }  객체를 만들어 리턴한다.
    exportItemMsg(){
        return { msg : this.item.name+this.takeMsg, item : "" };
    }

    // 플레이어가 스페이스를 눌렀을 때 불러질 함수
    // this.item이 빈 값이 아닌 경우 this.exportItemMsg()를 실행해 결과값을 저장해 두었다가 this.emptyItem()를 실행하여 값을 비워준 후 결과값을 리턴한다. this.item이 빈값인 경우 this.emptyItemMsg()를 실행하고 결과값을 리턴한다.
    contact(){

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
    succeseMsg(){
        
    }

    
    // 세이브 실패 시 리턴값(객체) 만들어줌
    // { msg : this.failureMsg, item : "" } 객체를 만들어 리턴한다.
    failureMsg(){
    
    }

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

class Save {
    constructor(){}

    // 세이브 파일 저장
    create(){

    }

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

    // 교수님
    // 인벤토리 리스트에 아이템 추가
    insert(item){
        this.list.push(item);
    }

    // 인벤토리 리스트에서 아이템 꺼내기
    out(){}

    // 인벤토리 리스트 가져오기
    importList(){
        return this.list;
    }
}

// 교수님
class Item {
    constructor(name, text){
        this.name = name;
        this.text = text;
    }
}