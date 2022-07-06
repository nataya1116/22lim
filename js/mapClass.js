//===============================================================
// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d')

// canvas.width = 1000;
// const image = new Image()
// image.src = './image/untitled.png';
// canvas.height = 1000;
//===============================================================

// 맵 관련 클래스
// 클래스는 노트, 그 안에 들어가는 메모들은 함수 등등
  class Map {
    // 생성자 함수 (받을 파라미터)
    constructor(name){ 
        // this는 맵 그자체 (클래스를 가리킴)
        // 값을 받아야하는 것은 =으로 넣어주고
        this.name = name;
        // 밑에와 같이 함수에서 리턴을 받아 값을 가져올 필요가 없는것은 ;세미콜론으로 닫아준다
        this.mapArr;
    }
    // (재사용이 가능하다) 배열을 잘라주는 함수
    arryCut(Arr){
        // 배열을 담아줄 빈배열을 선언한다
        // collisionsMap을 선언하고 아래 포문의 배열을 collisionsMap으로 가져온다.
        const collisionsMap = [];
// collisions.lenth의 크기는 대략 천개정도의 항목이라 추측가능히다 천개의 배열을 반복하는것은 비효율적이라 i의 크기를 70까지만 증가시킨다.
// 여기서 70까지만 증가 시키는 이유는 지도의 width가 70타일이기 때문
        for (let i = 0; i < Arr.length; i += 70) {
	// 결과적으로 이방정식은 70~140으로 슬라이싱 됨, silce 메서드 호출 0~70까지의 요소(i=0) => 확인이 필요하다면 해당 식을 console.log()로 확인해준다.
            collisionsMap.push(Arr.slice(i, 70 + i))
        }
        this.mapArr = collisionsMap;
    }
    // 배열 안에 offset으로 위치를 잡고 collisione 을 그려주는 함수
    Collis(cols) {
        const offset = {
            x: -930,
            y: -600
        }
    // 충돌맵의 각행에 대해 화살표 함수를 호출
        cols.forEach((row, i) => {
            row.forEach((symbol, j) => {
                // 현재 반복하고 있는 기호가 23346와 같을 때 경계를 그리고 싶기 때문에 해당 if문을 완성시켜준다.
                if (symbol === 23346) 
                // 위에서 지정한 constructor({postion)}의 값을 가져온다. 
                boundaries.push(new Boundary({
                    position: {
                        // 여기에 왜 + offset을 삽입한것인지는 아래를 확인
                        x: j * Boundary.width + offset.x,
                        // 사용되는 크기 값 여기서 시간이 지난후 48이 어떠한 값인지 헷갈릴 수 있으므로 위 Boundary 클래스에 정적 키워드를 사용하여 정적 속성을 만들고 호출한다.
                        y: i * Boundary.height + offset.y
                    }
                }))
            })
        })
    }
  }
  // Class Map에 firstMap을 넣어주고 name을 지정해 준다.
  let firstMap = new Map("첫번째 맵");
  let firstMap2 = new Map("두번째 맵");
  // firstMap에 arrCut 함수를 넣어준다.
  // firstMap에 arryCut 함수를  collisions에 사용한다.
  firstMap.arryCut(collisions);

  firstMap.mapArr;
  let maps = [firstMap,firstMap2];
  // ...스프레드 오퍼레이터(연산자) =>
  let maps2 = [...maps, firstMap3]
  maps.forEach((e,idx)=>{
    // indexNumber 1
    if(idx === 1)
    {

    }
    if(e.name === "첫번째 맵")
    {

    }
  });

  class Boundary {
    static width =40
    static height =40
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }

    draw(){
        c.fillStyle = 'rgba(255, 0, 0, 0.0)' //  collisions 확인용
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

  


