const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// console.log(collisions);
canvas.width = 1024;
canvas.height = 576;
let mapState = "_startPage";
// 팝업창
let isPopupOpen = false;
const collisionsMap = []
// 70인 이유는 tiled상 지도의 너비가 70이기 때문
for (let i = 0; i < collisionsStg2.length; i += 70) {
    collisionsMap.push(collisionsStg2.slice(i, 70 + i))
    // console.log(collisions.slice(i, 70 + i)); 이렇게 반복하면서 배열안에 0과 1025를 콘솔로 구분할 수
    // 있다.
}

const boundaries = []
const objCols = [];
const offset = {
    x: -925,
    y: -700
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

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 23346) 
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                },
            }))
    })
})

console.log(boundaries);
// console.log(objCols);

const image = new Image()
image.src = './image/backGroundStg2.png';

const foregroundImage = new Image()
foregroundImage.src = './image/foreGroundStg2.png';

const playerDownImage = new Image();
playerDownImage.src = './image/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = './image/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = './image/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = './image/playerRight.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerUpImage,
    frames: {
        max: 3
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
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
    }
    // 이 안에서 내가 듣고 싶은 키를 참조하기 할 수 있다.
}

// const testBoundary = new Boundary({     position:{         x: 400,         y:
// 400     } })

const movables = [
    background, ...boundaries,
    foreground
]

function rectangularCollision({rectangle1, rectangle2}) {
    if(        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
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
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    // objCols.forEach((boundary) => {
    //     boundary.draw()
    // })
    
    player.draw()
    foreground.draw()
    let moving = true;
    player.moving = false;
    // 플레이어 w,a,d,s 이동시 백그라운드 포지션 변경 실제로는 배경이 이동하지만 화면상 캐릭터가 움직이는것 처럼 보이게함
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.Sprite.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
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
                movable.position.y += 3
            })
            // background.position.y = background.position.y +=3
        // testBoundary.position.y +=3
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.Sprite.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
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
    } else if (keys.s.pressed && lastKey === 's') {
        //s 입력했을때 keys.s.pressed
        // player.moving 이동중이라는것
        player.moving = true
        // player.image 밑에 이미지로 교체
        player.image = player.Sprite.down
        //충돌체 갯수만큼 돌아 벽
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
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
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.Sprite.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
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
        if (moving) 
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
            // console.log(background.position.y)
        }
}

// 반복하려는 함수의 무한 루프를 생성
animate();

let lastKey = ''
window.addEventListener(
    
    'keydown',
    (e) => { // (e)는 이벤트를 나타내는 미리 채워진 개체 (개발자의 경우 이를 e 라고 부름 걍)
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
        }
        console.log(keys)
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
        }
        console.log(keys)
    }
)

