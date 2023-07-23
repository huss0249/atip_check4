const log = console.log
//========================================================
// Define Questions
const questionHead = 'This is the Question Head where the description and instructions of the question will set.<br />Here is a <a href="#">LINK</a> :<br />Question text can be broken into multiple lines.'
const choices = [
  { q: "question A", correct: true, order: 1 },
  { q: "question B", correct: true, order: 2 },
  { q: "question C", correct: true, order: 3 },
  { q: "question D", correct: true, order: 4 },
  { q: "question E", correct: false },
  { q: "question F", correct: false },
  { q: "question G", correct: false },
  { q: "question H", correct: false }
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
  // OLDCheck Checkboxes changes
  checkChange_OLD(e) {
    log('Correct? ', e.target.closest('li').dataset.correct)
  
    // if (this.checked) {
    //   console.log("Checkbox is checked..");
    // } else {
    //   console.log("Checkbox is not checked..");
    // }
    log('checked? ', e.target.closest('input').checked)
    e.target.closest('input').checked === true ? counter++ : counter--;
    if(counter === maxChck) {
      $submit.classList.remove('disabled')
      return false
    } else {
      $submit.classList.add('disabled')
      // log('undone')
    }
    log('counter = ', counter)
  
  
  
  
    let uncheckedChecks = document.querySelectorAll(".check:not(:checked)");
    // log('uncheckedChecks = ', uncheckedChecks)
    uncheckedChecks.forEach((ww) => {
      // clearOrder(ww);
    });
      
    // log('uncheckedChecks = ', uncheckedChecks);
    
    let checkedChecks = document.querySelectorAll(".check:checked");
    // log('checkedChecks = ', checkedChecks)
  
    counted = checkedChecks.length;
    // if (checkedChecks.length >= maxChecked + 1) return false;
    
    // if (checkedChecks.length > maxChecked) {
    if (checkedChecks.length >= maxChck) {
      // makeOrder(event.target);
      // const $submit = document.querySelector(".submit");
      // $submit.classList.remove('disabled')
      log('STOP')
      return false
    }
    // console.log(event.target.value);
  
  
  },
}
//========================================================
//========================================================



//========================================================


const createQuestion = (choices, maxAttempts, rand) => {
  // Randomize Questions
  rand ? reuse.shuffle(choices) : ''
  // Get Questions Container
  const $Q = reuse.setSelector("#q", null, null, ['d-flex', 'flex-column', 'p-3']);
  // Add Question head
  const $qHead = reuse.setSelector(null, 'p', 'qHead', ['bg-dark', 'text-light', 'p-3']);
  $qHead.innerHTML = questionHead;
  $Q.appendChild($qHead);
  // Define Question Body
  const qB = reuse.setSelector(null, 'div', 'qBody', ['qb', 'd-flex', 'flex-row', 'gap-2', 'p-3', 'bg-secondary']);
  // Define Question List
  const qL = reuse.setSelector(null, 'ul', 'qList', ['ql', "list-unstyled", 'd-grid', 'gap-2', 'flex-grow-1']);
  // Document Fragment
  const df = new DocumentFragment();

  // Loop Questions
  choices.forEach((q, i, arr) => {
    // Define Choice Item
    let qI = reuse.setSelector(null, 'li', null, ['bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    // qI.setAttribute("data-correct", `${q.correct}`);
    // q.order ? qI.setAttribute("data-order", `${q.order}`) : "";

    // Create INPUT
    let $input = reuse.setSelector(null, 'input', `q-${i + 1}`, ["p-4", "form-check-input", "flex-shrink-1", "check"])
    $input.type = 'checkbox'
    $input.value = i + 1
    // $input.setAttribute('value', i + 1)
    $input.setAttribute('aria-label', "Checkbox for following text input")

    $input.setAttribute("data-correct", `${q.correct}`);
    q.order ? $input.setAttribute("data-order", `${q.order}`) : "";

    qI.appendChild($input)

    // Create LABEL
    let $label = reuse.setSelector(null, 'label', null, ['mx-2', 'bg-white', 'flex-grow-1'])
    $label.setAttribute('for', `q-${i + 1}`)
    
    let $div = reuse.setSelector(null, 'div', null, ['lbl', 'w-100'])
    // $div.textContent = `${q.q} check ${i + 1}`
    $div.textContent = `${q.q}`
    $label.appendChild($div)
    qI.appendChild($label)

    // Create Ordered Number display
    let $divNum = reuse.setSelector(null, 'span', null, ['order', 'rounded-circle'])
    qI.appendChild($divNum)

    df.appendChild(qI);
  });

  // Add Questions
  qL.appendChild(df);
  qL.addEventListener('change', reuse.checkChange)
  
  // Define SUBMIT BUTTON
  $submit = reuse.setSelector(null, 'button', 'submit', ['submit', "btn", "btn-info", 'disabled']);
  $submit.textContent = "SUBMIT";
  $submit.addEventListener('click', reuse.checkAnswer)
  qL.append($submit);
  
  qB.appendChild(qL);
  
  // Define FEEDBACK AREA
  const $feedback = reuse.setSelector(null, 'div', 'feedback', ['flex-grow-1']);
  $feedback.textContent = 'FEEDBACK HERE'
  qB.appendChild($feedback);
  $Q.appendChild(qB);  
  return
}

createQuestion(choices, maxAttempts, rand = true)
//========================================================