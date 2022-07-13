
function textBoxView(text){
    isPopupOpen = true;
    isTextBoxView = true;
    _text_box.style.zIndex = 999;
    _text.innerHTML = text;
}

function textBoxHidden(){
    isPopupOpen = false;
    isTextBoxView = false;
    _text_box.style.zIndex = 0;
    _text.innerHTML = "";
}

function settingBoardView(){
    _setting_board.style.zIndex = 999;
    isPopupOpen = true;
    isSettingBoardView = true;
}

function settingBoardHidden(){
    _setting_board.style.zIndex = 0;
    isPopupOpen = false;
    isSettingBoardView= false;
}

function inventoryView(){
    _low_inven.style.zIndex = 999;
    isPopupOpen = true;
    isInventoryView = true;
}

function inventoryHidden(){
    _item_use.style.zIndex = 0;
    _low_inven.style.zIndex = 0;
    isPopupOpen = false;
    isInventoryView = false;
}

function paragraph(element) {
    const array = element.innerText.split('')
    const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*']
    const exception = [' ', '\n', '.', ',']
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const numArray = []
    array.forEach(char => {
        const num = random(5, 40)
        numArray.push(num)
    })
    
    let completeCount
    let newText
    const timer = setInterval(() => { 
    completeCount = 0
    newText = '';
    numArray.forEach((num, i) => {
      if (exception.includes(array[i]) || numArray[i] === 0) {
        newText += array[i]
        completeCount += 1
      } else {
        newText += special[numArray[i] % special.length]
        numArray[i] = --num
      }
    })

    element.innerText = newText
    if (completeCount === numArray.length) clearInterval(timer)
  }, 120)
}
