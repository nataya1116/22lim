const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// console.log(collisions);
canvas.width = 1024;
canvas.height = 576;
let mapState = "_start_page";
// 팝업창
let isPopupOpen = false;
const collisionsMap = []
// 70인 이유는 tiled상 지도의 너비가 70이기 때문
for (let i = 0; i < collisionsStg2.length; i += 70) {
    collisionsMap.push(collisionsStg2.slice(i, 70 + i))
    // console.log(collisions.slice(i, 70 + i)); 이렇게 반복하면서 배열안에 타일번호를 콘솔로
    // 확인할 수 있다.
}

const boundaries = []
// const objCols = [];
const offset = {
    x: -925,
    y: -740
}


// let objCol = objects;
// objCol.forEach(el => {
//     if(el.isCol === true)
//     {
//         objCols.push(new Boundary({
//             width:500,
//             height:500,
//             position: {
//                 x: el.width + el.x,
//                 y: el.height + el.y
//             },
//             type : el.name,
//         }))
//     }
// });

// 충돌 부분 2차원배열 만들어주는 부분
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 23346) 
            boundaries.push(new Boundary({
                position: {
				  //  Boundary.width, Boundary.height는 바운더리 클래스에서 쓴 정적 메서드로
				      // new 인스턴스 생성 없이 호출해온 것이다.
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
            }))
    })
})

console.log(boundaries);
// console.log(objCols);

// 이미지 불러온 부분
const image = new Image()
image.src = '/img/background/backGroundStg2.png';

const foregroundImage = new Image()
foregroundImage.src = '/img/background/foreGroundStg2.png';
//20220710 통 플레이어 이미지
const playerImage = new Image();
playerImage.src = '/img/character/$Dr Frankenstien (resizing).png'








const player = new Sprite({
    position: {
      // 맵 가운데에 위치하게 고정
        x: canvas.width / 2 - 180 / 4 / 2,
        y: canvas.height / 2 - 320 / 6
        // x: canvas.width / 2 - 192 / 4 / 2, 포켓몬 사이즈였음
        // y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
            // 이미지 X축 나눌 갯수
        max: 3,
        //20220710 이미지 Y축 나눌 갯수
        maxY: 4,
        //20220710 이미지 Y축 인덱스(아래로 나눈거의 몇번째인지)
        valY:3,
        // 이미지 X축 인덱스
        valX:1
    },
    sprites: {
        up: playerImage,
        left: playerImage,
        right: playerImage,
        down: playerImage
    },
//20220710 레이케스트 이미지
    rayImg : playerImage
})


const playerCol = new Boundary({
    position: {
        // 맵 가운데에 위치하게 고정
        x: player.position.x + playerImage.width / 15,
        y: player.position.y + playerImage.height / 7.3
    },
    width : 30,
    height : 30
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})


const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
})

// 키가 눌리지 않았을 때
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
 	},
    space: {
        pressed: false
    }
   // 이 안에서 콘솔 찍어서 확인 가능
}

// const testBoundary = new Boundary({     position:{         x: 400,         y:
// 400     } })

const movables = [
    background, ...boundaries,
    foreground
]

// 플레이어와 충돌 처리 한 부분 값 비교해서 충돌 여부 확인해주는 곳
// rectangle1가 플레이어 이미지
function rectangularCollision({rectangle1, rectangle2}) {
     if( rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
        {
            return  rectangle2;
        }
}
// function reycast(rectangle2) {
//     let col = "";
//     // player.img 이동시키거나 생성해서
//     col = rectangularCollision(player.이미지,rectangle2);
//     if(col !== "")
//     {
//         col.contact();
//     }
// }


function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    })
    // objCols.forEach((boundary) => {
    //     boundary.draw()
    // })

    player.draw();
    playerCol.draw();
    foreground.draw();
	let moving = true;
    player.moving = false;
    // 플레이어 w,a,d,s 이동시 백그라운드 포지션 변경 실제로는 배경이 이동하지만
    // 화면상 캐릭터가 움직이는것 처럼 보이게함
    // w키 --------------------------------------------------------------------------------------------------
	if (keys.w.pressed && lastKey === 'w') {
		// 플레이어 움직일 때
        player.moving = true
        player.image = player.Sprite.up
		 player.raycast_direction = "up";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 3;
        // 23346타일이 담긴 boundaries 길이 만큼 돌아준다
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
			 // 캐릭터와 맵 충돌 부분
            if (rectangularCollision({
                rectangle1: playerCol,
                // 충돌 부분과 position을 넣어준다
				rectangle2: {
                    ...boundary,
					// w키를 눌렀을 때 Y축으로 맵이 내려가야하기때문에
                    // boundary.position.y에 3을 더해준다
					position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            })) 
            {
				// 부딪혔을때 콘솔에 보여줌
				console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) 
            movables.forEach((movable) => {
                movable.position.y += 3
            })
            // background.position.y = background.position.y +=3
        // testBoundary.position.y +=3
    }
    // a키 --------------------------------------------------------------------------------------------------
    else if (keys.a.pressed && lastKey === 'a') {
		player.moving = true
        player.image = player.Sprite.left
		 player.raycast_direction = "left";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 1;
        let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
		for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) 
            movables.forEach((movable) => {
                //배경 이동
                movable.position.x += 3
            })
    } 
    
    
    
     // s키 --------------------------------------------------------------------------------------------------
    else if (keys.s.pressed && lastKey === 's') {
		//s 입력했을때 keys.s.pressed
        // player.moving 이동중이라는것
        player.moving = true;
        // player.image 밑에 이미지로 교체
        player.image = player.Sprite.down;
		player.raycast_direction = "down";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 0;
        //충돌체 갯수만큼 돌아 벽
		 let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        if (moving) 
            movables.forEach((movable) => {
                //배경이동
                movable.position.y -= 3
            })
    } 
    
    
    // d키 --------------------------------------------------------------------------------------------------
    else if (keys.d.pressed && lastKey === 'd') {
		player.moving = true
        player.image = player.Sprite.right
		 player.raycast_direction = "right";
        //20220710 이미지 Y축 인덱스
        player.frames.valY = 2;
        let el = {width: player.width/3,height: player.height/3,position:{x:player.position.x,y:player.position.y}}
		for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
               rectangle1: playerCol,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log('colliding')
                moving = false;
                break;
            }
        }
        //배경이동
        if (moving) 
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
            // console.log(background.position.y)
        }
     
	 //20220710 레이케스트 스페이스바////////////////////////////
    else if (keys.space.pressed && lastKey === 'space') {
        player.raycast();
        for (let i = 0; i < boundaries.length; i++) {
            // boundaries[i] 저장된 갯수 인덱스
            const boundary = boundaries[i]
            let col = rectangularCollision({
                rectangle1: player.raycast(),
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            })
            // 레이캐스트 확인 하는 부분(벽에 맞으면 나옴)
            if (col) {
                console.log(col + " : 맞은 블럭임 이거");
                console.log('레이저 맞았다..')
                moving = false;
                break;
            }
        }
        keys.space.pressed = false;
    }
}

// 반복하려는 함수의 무한 루프를 생성
animate();

let lastKey = ''

const playPage = document.getElementById("_play_page");



window.addEventListener(  
    'keydown',
    (e) => { // (e)는 이벤트를 나타내는 미리 채워진 개체 (개발자의 경우 이를 e 라고 부름 걍)
        if(mapState !== "_play_page") return;
        //console.log(e.key))
        switch (e.key) {
            case 'w':
                // console.log('pressed w key')
                keys.w.pressed = true
                lastKey = 'w' // 해당키를 누르고 있다가 다른키를 누르면 다른키로 변경됨 위에 if문 확인
                break;
            case 'a':
                // console.log('pressed a key')
                keys.a.pressed = true
                lastKey = 'a'
                break;
            case 's':
                // console.log('pressed s key')
                keys.s.pressed = true
                lastKey = 's'
                break;
            case 'd':
                // console.log('pressed d key')
                keys.d.pressed = true
                lastKey = 'd'
                break;
   //20220710 레이케스트 스페이스바
            case ' ':
                keys.space.pressed = true
                lastKey = 'space'
                break;
            // 한글 키 추가
            case 'ㅈ':
                // console.log('pressed w key')
                keys.w.pressed = true
                lastKey = 'w' // 해당키를 누르고 있다가 다른키를 누르면 다른키로 변경됨 위에 if문 확인
                break;
            case 'ㅁ':
                // console.log('pressed a key')
                keys.a.pressed = true
                lastKey = 'a'
                break;
            case 'ㄴ':
                // console.log('pressed s key')
                keys.s.pressed = true
                lastKey = 's'
                break;
            case 'ㅇ':
                // console.log('pressed d key')
                keys.d.pressed = true
                lastKey = 'd'
                break;
        }
        // console.log(keys)
    }
)


window.addEventListener(
    'keyup',
    (e) => { // keydown시 true로 바뀌어 다시 돌아오지 않기 때문에 keyup도 따로 설정해준다.
        switch (e.key) {
            case 'w':
                keys.w.pressed = false
                break;
            case 'a':
                keys.a.pressed = false
                break;
            case 's':
                keys.s.pressed = false
                break;
            case 'd':
                keys.d.pressed = false
                break;
 // 한글 키 추가
            case 'ㅈ':
                keys.w.pressed = false
                break;
            case 'ㅁ':
                keys.a.pressed = false
                break;
            case 'ㄴ':
                keys.s.pressed = false
                break;
            case 'ㅇ':
                keys.d.pressed = false
                break;
        }
        console.log(keys)
        //===================================================이 위치에 값 넣어주면 됨
        // console.log(player.position)
        // console.log(`backgorund x ${movables[0].position.x} y ${movables[0].position.y}`)
        // console.log(`boundary x ${movables[1].position.x} y ${movables[1].position.y}`)
        // console.log(`foreground x ${movables[2].position.x} y ${movables[2].position.y}`)
        // console.log(keys)
    }
)

const divArr = document.querySelectorAll('container_box>div');
// forEach 이용

console.log(divArr);
document.querySelectorAll('container_box>div').forEach(el => {
    el.style.zIndex = "";
})

// const inventory = [
//     {
//         name: "구급약",
//         info: "아파?"
//     }, {
//         name: "엑스레이 필름",
//         info: ""
//     }, {
//         name: "실험실열쇠",
//         info: "3스테이지에서 4스테이지로 넘어갈 수 있게 해주는 아이템"
//     }, {
//         name: "실험체 데이터 파일",
//         info: "진엔딩 필수 아이템"
//     }
// ]