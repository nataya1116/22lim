
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
    isPopupOpen = true;
    _setting_board.style.zIndex = 999;
    isSettingBoardView = true;
}

function settingBoardHidden(){
    isPopupOpen = false;
    _setting_board.style.zIndex = 0;
    isSettingBoardView= false;
}

function inventoryView(name){
    isPopupOpen = true;
    _low_inven.style.zIndex = 999;
    _item_text.data = name;
    isInventoryView = true;
}

function inventoryHidden(){
    isPopupOpen = false;
    _item_use.style.zIndex = 0;
    _low_inven.style.zIndex = 0;
    isInventoryView = false;
}

function quizeBoxHidden(){
    isPopupOpen = false;
    isQuizeBox = false;
    _quize_box.style.zIndex = 0;
    _answer.innerHTML = "";
    _answer_input.data = "";
}

function quizeBoxView(text, portalName, isKeyboard){
    isPopupOpen = true;
    isQuizeBox = true;
    _answer_input.focus();
    _answer_input.data = portalName;
    // console.log(_answer_input.data);
    _quize_box.style.zIndex = 999;
    _answer.innerHTML = text;
    // console.log(`_answer_input.value ${_answer_input.value}`);
    _answer_input.value = "";

    if (isKeyboard) {
        _return_text.style.visibility = "visible"; 
        _answer_input.style.visibility = "visible";
    }else {
        _return_text.style.visibility = "hidden";
        _answer_input.style.visibility = "hidden";
    }
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
