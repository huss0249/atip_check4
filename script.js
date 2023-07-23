const log = console.log
//========================================================
// Define Questions
const questionHead = 'This is the Question Head where the description and instructions of the question will set.<br />Here is a <a href="#">LINK</a> :<br />Question text can be broken into multiple lines.'
const choices = [
  { choice: "Question A", value: 1, correct: true, order: 1 },
  { choice: "Question B", value: 2, correct: true, order: 2 },
  { choice: "Question C", value: 3, correct: true, order: 3 },
  { choice: "Question D", value: 4, correct: true, order: 4 },
  { choice: "Question E", value: 5, correct: false },
  { choice: "Question F", value: 6, correct: false },
  { choice: "Question G", value: 7, correct: false },
  { choice: "Question H", value: 8, correct: false }
];
//========================================================
// Define max attempts
const maxAttempts = 3;
// Define Max number of checked boxes
const maxChck = choices.filter(w => w.correct === true).length;
// Checked List
let checkedBoxes = []
// counter
let counter = 0;
// Define checked target input
let x = ''
let s = ''
// Define SUBMIT button
let $submit = ''
// Define Feedback levels
const feedbacks = {
  correct: "Feedback 1",
  incorrect1: "Feedback 2",
  failed: "Feedback 3",
}
//========================================================
// REUSABLE FNs
//========================================================
const reuse = {
  // Assign Classes
  setClassList(el, arr) {
    arr.forEach((j) => el.classList.add(j));
    return el;
  },
  // Define Selectors
  setSelector(selectorRef, newType, newId, classArray) {
    let newSelector = ''
    if (selectorRef != undefined || selectorRef != null) {
      newSelector = document.querySelector(selectorRef)
      reuse.setClassList(newSelector, classArray)
    } else {
      newSelector = document.createElement(newType)
      newId != undefined || newId != null ? newSelector.id = newId : ''
      reuse.setClassList(newSelector, classArray)
    }
    return newSelector;
  },
  // Define the shuffle
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },
  // Check Checkboxes changes
  checkMax(e) {
    if (checkedBoxes.length === maxChck) {
      // return false;
    }
  },
  checkAnswer() {
    log('CHECKING ANSWER... ', checkedBoxes)
    checkedBoxes.forEach(x => log(choices[x]))
    // checkedBoxes.forEach(x => log(choices[x-1]))
  },
  checkChange(e) {
    // console.log("Correct? ", e.target.closest("input").value);
    // console.log("Correct? ", e.target.closest("input"));
    
    x = e.target.closest("input");
    let sp = e.target.parentNode;
    s = sp.querySelector("span");
    
    if (x.checked) {
      checkedBoxes.push(x.value);
      // s.textContent = checkedBoxes.indexOf(x.value) + 1;
      reuse.updateOrder(checkedBoxes, x);
    } else {
    
      checkedBoxes = reuse.fltr(checkedBoxes, x);
      s.textContent = "";
    }
    checkedBoxes.length === maxChck
      ? log("MAX = ", checkedBoxes, checkedBoxes.length)
      : log("O = ", checkedBoxes, checkedBoxes.length);

  },
  fltr(arr, x) {
    // console.log("item = ", item);
    // console.log("x = ", x);
    return arr.filter((item) => x.value !== item);
  },
  updateOrder(checkedBoxes, x) {
    log('Update order')
    log("checked Boxes = ", checkedBoxes);
    log("x = ", x.dataset.correct);

    if(checkedBoxes.length === maxChck) {
      $submit.classList.remove('disabled')
      // return false
    } else {
      $submit.classList.add('disabled')
      // log('undone')
    }
    log('checkedBoxes length = ', checkedBoxes.length)

    s.textContent = checkedBoxes.indexOf(x.value) + 1;
  },
}
//========================================================
//========================================================



//========================================================


const createQuestion = (choices, maxAttempts, rand) => {
  // Randomize Questions
  rand ? reuse.shuffle(choices) : ''
  // Get Questions Container
  const $Question = reuse.setSelector("#q", null, null, ['d-flex', 'flex-column', 'p-3']);
  // Add Question head
  const $questionHead = reuse.setSelector(null, 'p', 'questionHead', ['bg-dark', 'text-light', 'p-3']);
  $questionHead.innerHTML = questionHead;
  $Question.appendChild($questionHead);
  // Define Question Body
  const questionBody = reuse.setSelector(null, 'div', 'questionBody', ['questionBody', 'd-flex', 'flex-row', 'gap-2', 'p-3', 'bg-secondary']);
  // Define Question List
  const choicesList = reuse.setSelector(null, 'ul', 'choicesList', ['choicesList', "list-unstyled", 'd-grid', 'gap-2', 'flex-grow-1']);
  // Document Fragment
  const df = new DocumentFragment();

  // Loop Questions
  // choices.forEach((choice, i, arr) => {
  choices.forEach((choice) => {
    // Define Choice Item
    let choiceItem = reuse.setSelector(null, 'li', null, ['bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    // choiceItem.setAttribute("data-correct", `${choice.correct}`);
    // choice.order ? choiceItem.setAttribute("data-order", `${choice.order}`) : "";
    // choiceItem.addEventListener('change', reuse.checkChange)
    
    // Create INPUT
    let $input = reuse.setSelector(null, 'input', `choice-${choice.value}`, ["p-4", "form-check-input", "flex-shrink-1", "check"])
    $input.type = 'checkbox'
    // $input.value = `${choice.value}`
    $input.setAttribute('value', `${choice.value}`)
    $input.setAttribute('aria-label', "Checkbox for following text input")
    
    $input.setAttribute("data-correct", `${choice.correct}`);
    choice.order ? $input.setAttribute("data-order", `${choice.order}`) : "";
    // $input.addEventListener('change', reuse.checkChange)

    choiceItem.appendChild($input)

    // Create LABEL
    let $label = reuse.setSelector(null, 'label', null, ['mx-2', 'bg-white', 'flex-grow-1'])
    // $label.setAttribute('for', `choice-${i + 1}`)
    $label.setAttribute('for', `choice-${choice.value}`)
    
    let $div = reuse.setSelector(null, 'div', null, ['lbl', 'w-100'])
    // $div.textContent = `${choice.choice} check ${i + 1}`
    $div.textContent = `${choice.choice}`
    $label.appendChild($div)
    choiceItem.appendChild($label)

    // Create Ordered Number display
    let $divNum = reuse.setSelector(null, 'span', null, ['order', 'rounded-circle'])
    choiceItem.appendChild($divNum)

    df.appendChild(choiceItem);
  });

  // Add Questions
  choicesList.appendChild(df);
  choicesList.addEventListener('change', reuse.checkChange)
  
  // Define SUBMIT BUTTON
  $submit = reuse.setSelector(null, 'button', 'submit', ['submit', "btn", "btn-info", 'disabled']);
  $submit.textContent = "SUBMIT";
  $submit.addEventListener('click', reuse.checkAnswer)
  choicesList.appendChild($submit);
  
  questionBody.appendChild(choicesList);
  
  // Define FEEDBACK AREA
  const $feedback = reuse.setSelector(null, 'div', 'feedback', ['flex-grow-1']);
  $feedback.textContent = 'FEEDBACK HERE'
  questionBody.appendChild($feedback);
  $Question.appendChild(questionBody);  
  return
}

createQuestion(choices, maxAttempts, rand = true)
//========================================================