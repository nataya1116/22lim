class Character {
    constructor() {
        this.width = 30;
        this.height = 40;
        // 래이캐스트 방향
        this.raycast_direction = "up";
    }
    // 레이케스트 4방향
    raycast(){
        console.log(this.raycast_direction);
        switch (this.raycast_direction) {
            case 'up':
                c.fillStyle = 'rgba(0, 0, 255, 0.2)' // 확인용
                c.fillRect(playerCol.position.x, playerCol.position.y-this.height, this.width, this.height)

                return {width : this.width, height:this.height, position:{x:playerCol.position.x, y:playerCol.position.y-this.height}};
            case 'left':
                c.fillStyle = 'rgba(0, 0, 255, 0.2)' // 확인용
                c.fillRect(playerCol.position.x  - this.height, playerCol.position.y,  this.height ,this.width)

                return {width : this.width, height:this.height,position:{x:playerCol.position.x - this.width, y:playerCol.position.y}}
            case 'right':
                c.fillStyle = 'rgba(0, 0, 255, 0.2)' // 확인용
                c.fillRect(playerCol.position.x + this.width, playerCol.position.y, this.height, this.width)  

                return {width : this.width, height:this.height,position:{x:playerCol.position.x + this.width, y:playerCol.position.y}}
            case 'down':
                c.fillStyle = 'rgba(0, 0, 255, 0.2)' // 확인용    
                c.fillRect(playerCol.position.x, playerCol.position.y+ this.width, this.width, this.height)

                return {width : this.width, height:this.height,position:{x:playerCol.position.x, y:playerCol.position.y + this.height}}
            // 위에서 맞는 케이스 없으면 여기로
            default: console.log("여기");
                break;
                
        }
    }
}