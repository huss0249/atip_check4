// Define Questions
const qs = [
  { q: "question A", correct: true, order: 1 },
  { q: "question B", correct: true, order: 2 },
  { q: "question C", correct: true, order: 3 },
  { q: "question D", correct: true, order: 4 },
  { q: "question E", correct: false },
  { q: "question F", correct: false },
  { q: "question G", correct: false },
  { q: "question H", correct: false }
];
  

// Define attempts
const attempt = 2;


// Define Feedback levels
const fb1 = "Feedback 1";
const fb2 = "Feedback 2";
const fb3 = "Feedback 3";

//========================================================

// Define the shuffle
const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

shuffle(qs);


// Get Questions Container
const $Q = document.querySelector("#q");
$Q.classList.add('d-flex', 'flex-column')


// Add Question head
const $qHead = document.createElement("p");
$qHead.id = "qHead";
$qHead.classList.add('bg-dark', 'text-light', 'p-3');
$qHead.innerHTML = `This is the Question Head where the description and instructions of the question will set. <br />
Here is how: <br />
Question text can be broken into multiple lines.`;
$Q.appendChild($qHead);


// Define Question Body
const qB = document.createElement("div");
qB.id = "qBody";
qB.classList.add('qb', 'd-flex', 'flex-row', 'gap-2');


// Define Question List
const qL = document.createElement("ul");
qL.id = "qList";
qL.classList.add('ql', "list-unstyled", 'd-grid', 'gap-2', 'flex-grow-1');


// Document Fragment
const fr = new DocumentFragment();


// Loop Questions
qs.forEach((q, i, arr) => {
  let qI = document.createElement("li");
  qI.classList.add('bg-warning', 'd-flex', 'flex-row', 'gap-2');
  qI.setAttribute("data-correct", `${q.correct}`);
  q.order ? qI.setAttribute("data-order", `${q.order}`) : "";
  qI.innerHTML = `
                  <input
                    class="p-3 form-check-input flex-shrink-1"
                    type="checkbox"
                    value="${i + 1}"
                    aria-label="Checkbox for following text input"
                    id="q-${i + 1}"
                    >
                  <label
                    for="q-${i + 1}"
                    class='ms-1 bg-white flex-grow-1'
                    >
                    <div
                      class="lbl w-100"
                      >${q.q} check ${i + 1}</div>
                  </label>
                `;

  fr.appendChild(qI);
});


// Add Questions
qL.appendChild(fr);


// Define SUBMIT BUTTON
const $submit = document.createElement("button");
$submit.classList.add("btn", "btn-info");
$submit.textContent = "SUBMIT";
// $submit.innerHTML = `<div class='d-grid'>
// <button class='btn btn-info' type='button'>SUBMIT</button>
// </div>`;
qL.append($submit);


qB.appendChild(qL);


// Define FEEDBACK AREA
const $feedback = document.createElement('div')
$feedback.id = 'feedback'
$feedback.classList.add('flex-grow-1')
$feedback.textContent = 'FEEDBACK HERE'
qB.appendChild($feedback);
$Q.appendChild(qB);



console.log("$Q = ", $Q);
  //========================================================
  
  //========================================================
  
  const checks = document.querySelectorAll(".check");
  const max = 2;
  let counted = null;
  
  for (let i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
  // for (let i = 0; i < checks.length; i++)
  //   checks[i].addEventListener("change", selectiveCheck);
  
  // for (let i = 0; i < checks.length; i++) checks[i].onchange = selectiveCheck;
  
  const makeOrder = (flag) => {
    // console.log(parseInt(flag.value));
    let $s = flag.parentNode.querySelector("span");
    // console.log(flag.value);
    console.log($s);
    console.log(counted);
    // $s.textContent = flag.value;
    $s.textContent = counted;
  };
  
  const clearOrder = (flag) => {
    // console.log(parseInt(flag.value));
    let $s = flag.parentNode.querySelector("span");
    // console.log(flag.value);
    console.log($s);
    $s.textContent = '';
  };
  
  function selectiveCheck(event) {
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
    // if (checkedChecks.length >= max + 1) return false;
    if (checkedChecks.length >= max + 1) return false;
    // console.log(event.target.value);
    makeOrder(event.target);
  }
  
  const $submitBTN = document.querySelector(".submit");
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
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }
  console.log(getRandomIntInclusive(1, 8));
  
  //--------------------------------------------------------
  