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

const maxChck = choices.filter(w => w.correct === true).length;
log('maxChck = ', maxChck)

// counter
let counter = 0;



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
}
//========================================================
//========================================================

const checkChange = (e) => {
  log('event', e.target.closest('li').dataset.correct)

  // if (this.checked) {
  //   console.log("Checkbox is checked..");
  // } else {
  //   console.log("Checkbox is not checked..");
  // }
  log('event', e.target.closest('input').checked)
  e.target.closest('input').checked === true ? counter++ : counter--;
  counter == maxChck ? $submit.classList.remove('disabled') : log('undone')
  log(counter)
}

//========================================================


const createQuestion = (choices, maxAttempts, rand) => {
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
    let qI = reuse.setSelector(null, 'li', null, ['bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    
    qI.setAttribute("data-correct", `${q.correct}`);
    q.order ? qI.setAttribute("data-order", `${q.order}`) : "";

    // Create INPUT
    let $input = reuse.setSelector(null, 'input', `q-${i + 1}`, ["p-4", "form-check-input", "flex-shrink-1", "check"])
    $input.type = 'checkbox'
    $input.value = i + 1
    // $input.setAttribute('value', i + 1)
    $input.setAttribute('aria-label', "Checkbox for following text input")
    qI.appendChild($input)

    // Create LABEL
    let $label = reuse.setSelector(null, 'label', null, ['mx-2', 'bg-white', 'flex-grow-1'])
    $label.setAttribute('for', `q-${i + 1}`)
    
    let $div = reuse.setSelector(null, 'div', null, ['lbl', 'w-100'])
    $div.textContent = `${q.q} check ${i + 1}`
    $label.appendChild($div)
    qI.appendChild($label)

    // Create Ordered Number display
    let $divNum = reuse.setSelector(null, 'div', null, ['order', 'rounded-circle'])
    qI.appendChild($divNum)

    df.appendChild(qI);
  });

  // Add Questions
  qL.appendChild(df);
  qL.addEventListener('change', checkChange)
  
  // Define SUBMIT BUTTON
  const $submit = reuse.setSelector(null, 'button', 'submit', ['submit', "btn", "btn-info", 'disabled']);
  $submit.textContent = "SUBMIT";
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





  //========================================================
  
  //========================================================
  
const checks = document.querySelectorAll(".check");
// const maxChecked = 2;
const maxChecked = choices.filter(w => w.correct === true).length;

let counted = 0;

const selectiveCheck = (event) => {
  // if (this.checked) {
  //   console.log("Checkbox is checked..");
  // } else {
  //   console.log("Checkbox is not checked..");
  // }

  let uncheckedChecks = document.querySelectorAll(".check:not(:checked)");
  uncheckedChecks.forEach((ww) => {
    clearOrder(ww);
  });
    
  // log('uncheckedChecks = ', uncheckedChecks);
  
  let checkedChecks = document.querySelectorAll(".check:checked");
  
  counted = checkedChecks.length;
    // if (checkedChecks.length >= maxChecked + 1) return false;
    if (checkedChecks.length > maxChecked) {
      makeOrder(event.target);
      const $submit = document.querySelector(".submit");
      $submit.classList.remove('disabled')
      return false
    }
    // console.log(event.target.value);
  }

  for (let i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
  // for (let i = 0; i < checks.length; i++)
  //   checks[i].addEventListener("change", selectiveCheck);
  
  // for (let i = 0; i < checks.length; i++) checks[i].onchange = selectiveCheck;
  
  const makeOrder = (flag) => {
    // log('make order = ', parseInt(flag.value));
    // let $s = flag.parentNode.querySelector("span");
    // console.log(flag.value);
    // console.log($s);
    // console.log(counted);
    // $s.textContent = flag.value;
    // $s.textContent = counted;
  };
  
  const clearOrder = (flag) => {
    // console.log(parseInt(flag.value));
    // let $s = flag.parentNode.querySelector("span");
    // console.log(flag.value);
    // log($s);
    // $s.textContent = '';
  };
  
  
  //===========================================================================
  // let list = [];
  // document.querySelectorAll('input[name="mycheck"]').forEach(function (box) {
  //   box.addEventListener("change", function (evt) {
  //     let boxval = evt.target.value;
  //     if (true === box.checked) {
  //       list.push(boxval);
  //     } else {
  //       list = list.filter(function (val) {
  //         return boxval !== val;
  //       });
  //     }
  //     console.log(list);
  //   });
  // });
  //========================================================================
  
  //===================================================================================
  
  // =============================
  
  // function getRandomIntInclusive(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  // }
  // console.log(getRandomIntInclusive(1, 8));
  
  //--------------------------------------------------------
  