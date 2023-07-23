const log = console.log
/*
__________________________________________________________

DEFENE
__________________________________________________________
*/
// Question
const qHead = 'This is the Question Head where the description and instructions of the question will set.<br />Here is a <a href="#">LINK</a> :<br />Question text can be broken into multiple lines.'
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

const maxAttempts = 3 // Max attempts
const maxChck = choices.filter(c => c.correct === true).length // Max checked boxes
let boxes = [] // Checked Boxes
let counter = 0 // counter
let inputTarget = '' // Checked target input
let orderedTarget = '' // Checked target order
let $submit = '' // SUBMIT button
const feedbacks = {
  correct: "Feedback 1",
  incorrect1: "Feedback 2",
  failed: "Feedback 3",
} // Feedback levels

/*
__________________________________________________________

REUSABLE FNs
__________________________________________________________
*/
const reuse = {
  // Assign Classes
  setClasses(el, arr) {
    arr.forEach((j) => el.classList.add(j));
    return el;
  },

  // Define Selectors
  setObj(selectorRef, newType, newId, classArray) {
    let newSelector = ''
    if (selectorRef != undefined || selectorRef != null) {
      newSelector = document.querySelector(selectorRef)
      reuse.setClasses(newSelector, classArray)
    } else {
      newSelector = document.createElement(newType)
      newId != undefined || newId != null ? newSelector.id = newId : ''
      reuse.setClasses(newSelector, classArray)
    }
    return newSelector;
  },
  
  // Define the shuffle
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },
  
  // Check Checkboxes changes
  checkMax(e) {
    if (boxes.length === maxChck) {
      // return false;
    }
  },
  
  
  // Filter
  fltr(arr, inputTarget) {
    // console.log("item = ", item);
    // console.log("x = ", x);
    return arr.filter((item) => inputTarget.value !== item);
  },

  // Update checked order
  // setCheckOrder(boxes, inputTarget) {
  setCheckOrder(boxes) {
    log('set check order => ', " | checked Boxes = ", boxes, ' | ', boxes.length);

    let $orders = document.querySelectorAll('.order')
    // $orders.forEach($order => log($order.closest('li')))
    // $orders.forEach($order => log($order.parentElement))
    $orders.forEach($order => log($order.previousElementSibling.previousElementSibling.value))
    
    let $items = document.querySelectorAll('.choice')
    // $orders.forEach($order => log($order.closest('li')))
    // $orders.forEach($order => log($order.parentElement))
    $items.forEach($item => log($item.querySelector('.lbl')))
    
    
    orderedTarget.textContent = boxes.indexOf(inputTarget.value) + 1;

    boxes.length === maxChck ? $submit.classList.remove('disabled', 'opacity-25') : $submit.classList.add('disabled', 'opacity-25');

    return
  },
  
  // Check Answer
  checkAnswer() {
    log('CHECKING ANSWER... ', boxes)
    // boxes.forEach(x => log(choices[x]))
    boxes.forEach(inputTarget => log(inputTarget))
    // boxes.forEach(x => log(choices[x-1]))
    return
  },

  // get Checked box
  getChecked(e) {
    inputTarget = e.target.closest("input");
    let targetParent = e.target.parentNode;
    orderedTarget = targetParent.querySelector("span");
    
    inputTarget.checked ? boxes.push(inputTarget.value) : boxes = reuse.fltr(boxes, inputTarget);
    return reuse.setCheckOrder(boxes);
  },

}
/*
__________________________________________________________

BUILD
__________________________________________________________
*/
const buildQuestion = (choices, rand) => {
  // Randomize Questions
  rand ? reuse.shuffle(choices) : ''

  // Create Objects
  const $Question = reuse.setObj("#q", null, null, ['d-flex', 'flex-column', 'p-3']);
  const $qHead = reuse.setObj(null, 'p', 'qHead', ['bg-dark', 'text-light', 'p-3']);
  const $qBody = reuse.setObj(null, 'div', 'qBody', ['d-flex', 'flex-row', 'gap-2', 'p-3', 'bg-secondary']);
  const $choices = reuse.setObj(null, 'ul', 'choices', ['list-unstyled', 'd-grid', 'gap-2', 'flex-grow-1']);
  $submit = reuse.setObj(null, 'button', 'submit', ['btn', 'btn-info', 'disabled', 'opacity-25', 'animated', 'fadeIn']);
  const $feedback = reuse.setObj(null, 'div', 'feedback', ['flex-grow-1']);
  const df = new DocumentFragment();

  
  // Loop Questions
  choices.forEach((choice) => {
    // Create loop objects
    let $choice = reuse.setObj(null, 'li', null, ['choice', 'bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    let $input = reuse.setObj(null, 'input', `choice-${choice.value}`, ['p-4', 'form-check-input', 'flex-shrink-1', 'check', 'animated', 'fadeIn'])
    let $label = reuse.setObj(null, 'label', null, ['mx-2', 'bg-white', 'flex-grow-1'])
    let $div = reuse.setObj(null, 'div', null, ['lbl', 'w-100', 'animated', 'fadeIn'])
    let $divNum = reuse.setObj(null, 'span', null, ['order', 'rounded-circle', 'animated', 'fadeIn'])
    
    // set Types
    $input.type = 'checkbox'
    
    // fill Objects
    $div.textContent = `${choice.choice}`

    // Ste Attributes
    $input.setAttribute('value', `${choice.value}`)
    $input.setAttribute('aria-label', "Checkbox for following text input")  
    $input.setAttribute('data-correct', `${choice.correct}`);
    choice.order ? $input.setAttribute('data-order', `${choice.order}`) : '';
    $label.setAttribute('for', `choice-${choice.value}`)
    
    // Add Listeners
    // $input.addEventListener('change', reuse.getChecked)
    
    // Append to parent objects
    $label.appendChild($div)
    $choice.appendChild($input)
    $choice.appendChild($label)
    $choice.appendChild($divNum)
    
    df.appendChild($choice);
  });

  // Fill Objects
  $qHead.innerHTML = qHead;
  $submit.textContent = 'SUBMIT';
  $feedback.textContent = 'FEEDBACK HERE'

  // Append objects to DOM elements
  $Question.appendChild($qHead);
  $choices.appendChild(df);
  $choices.appendChild($submit);
  $qBody.appendChild($choices);
  $qBody.appendChild($feedback);
  $Question.appendChild($qBody);  
    
  // Add Listeners
  $choices.addEventListener('change', reuse.getChecked)
  $submit.addEventListener('click', reuse.checkAnswer)
  
  return
}

buildQuestion(choices, rand = true)
/* __________________________________________________________ */