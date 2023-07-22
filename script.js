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


// Define Feedback levels
const feedbacks = {
  correct: "Feedback 1",
  incorrect1: "Feedback 2",
  failed: "Feedback 3",
}
//========================================================
// REUSABLE FNs
//========================================================

// Assign Classes
const setClassList = (el, arr) => {
  log(el)
  arr.forEach((j) => el.classList.add(j));
  return el;
}
//========================================================

// Define Selectors
const setSelector = (selectorRef, newType, newId, classArray) => {
  let newSelector = ''
  if (selectorRef != undefined || selectorRef != null) {
    newSelector = document.querySelector(selectorRef)
    setClassList(newSelector, classArray)
  } else {
    newSelector = document.createElement(newType)
    newId != undefined || newId != null ? newSelector.id = newId : ''
    setClassList(newSelector, classArray)
  }

  return newSelector;
}
//========================================================


// Define the shuffle
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};
//========================================================
//========================================================


const createQuestion = (choices, maxAttempts, rand) => {
  rand ? shuffle(choices) : ''

  // Get Questions Container
  const $Q = setSelector("#q", null, null, ['d-flex', 'flex-column', 'p-3']);

  // Add Question head
  const $qHead = setSelector(null, 'p', 'qHead', ['bg-dark', 'text-light', 'p-3']);
  $qHead.innerHTML = questionHead;
  $Q.appendChild($qHead);
  
  // Define Question Body
  const qB = setSelector(null, 'div', 'qBody', ['qb', 'd-flex', 'flex-row', 'gap-2', 'p-3', 'bg-secondary']);
  
  // Define Question List
  const qL = setSelector(null, 'ul', 'qList', ['ql', "list-unstyled", 'd-grid', 'gap-2', 'flex-grow-1']);
  
  // Document Fragment
  const df = new DocumentFragment();

  // Loop Questions
  choices.forEach((q, i, arr) => {
    
    let qI = setSelector(null, 'li', null, ['bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    
    qI.setAttribute("data-correct", `${q.correct}`);
    q.order ? qI.setAttribute("data-order", `${q.order}`) : "";
    qI.innerHTML = `
                    <input
                      class="p-4 form-check-input flex-shrink-1 check"
                      type="checkbox"
                      value="${i + 1}"
                      aria-label="Checkbox for following text input"
                      id="q-${i + 1}"
                      >
                    <label
                      for="q-${i + 1}"
                      class='mx-2 bg-white flex-grow-1'
                      >
                      <div
                        class="lbl w-100"
                        >${q.q} check ${i + 1}</div>
                    </label>
                    <!--
                    <div class='order position-absolute end-0'></div>
                    -->
                    <div class='order rounded-circle'></div>
                    `;
                    
    
    
    let $input = setSelector(null, 'inpu', `q-${i + 1}`, ["p-4", "form-check-input", "flex-shrink-1", "check"])
                    df.appendChild(qI);
  });

  
  // Add Questions
  qL.appendChild(df);
  
  
  // Define SUBMIT BUTTON
  /*
    const $submit = document.createElement("button");
    // $submit.classList.add("btn", "btn-info");
    $submit.classList.add('submit', "btn", "btn-info", 'disabled');
  */
  const $submit = setSelector(null, 'button', 'submit', ['submit', "btn", "btn-info", 'disabled']);
  $submit.textContent = "SUBMIT";
  // $submit.innerHTML = `<div class='d-grid'>
  // <button class='btn btn-info' type='button'>SUBMIT</button>
  // </div>`;
  qL.append($submit);
  
  
  qB.appendChild(qL);
  
  
  // Define FEEDBACK AREA
  /*
    const $feedback = document.createElement('div')
    $feedback.id = 'feedback'
    $feedback.classList.add('flex-grow-1')
  */
  const $feedback = setSelector(null, 'div', 'feedback', ['flex-grow-1']);
  $feedback.textContent = 'FEEDBACK HERE'
  qB.appendChild($feedback);
  $Q.appendChild(qB);



  log("$Q = ", $Q);
  
  return
}

createQuestion(choices, maxAttempts, rand = true)
//========================================================





  //========================================================
  
  //========================================================
  
const checks = document.querySelectorAll(".check");
  log(checks)
  // const maxChecked = 2;
const maxChecked = choices.filter(w => w.correct === true).length;
  log(maxChecked)
  let counted = null;

  

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
    // console.log(uncheckedChecks);
  
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
    console.log(parseInt(flag.value));
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
  