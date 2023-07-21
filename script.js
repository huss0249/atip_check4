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

// Add Question head
const $qHead = document.createElement("p");
$qHead.id = "qHead";
$qHead.textContent = "This is the Question body";
$Q.appendChild($qHead);

// Define Question Body
const qL = document.createElement("ul");
qL.id = "qBody";
qL.classList.add('ql', "list-unstyled");
  
// Document Fragment
const fr = new DocumentFragment();
  
// Loop Questions
qs.forEach((q, i, arr) => {
  let qI = document.createElement("li");
  // qI.className = q.q;

  qI.classList.add('bg-light');
  qI.setAttribute("data-correct", q.correct);
  q.order ? qI.setAttribute("data-order", q.order) : "";
  // li.textContent = q.q;
  // qI.innerHTML = q.q;
  qI.innerHTML = `

<!--    <input type="checkbox" id="q-${i + 1}" value="${
    i + 1
  }" name="mycheck" class="check">
  -->
  <input class="p-3 form-check-input" type="checkbox" value="${i + 1}" aria-label="Checkbox for following text input" id="q-${i + 1}">
          <label for="q-${i + 1}" class='ms-1 bg-white'><div class="label">${q.q} check ${i + 1}</div></label>
  `;

  fr.append(qI);
});
  
// Add Questions
qL.append(fr);
$Q.appendChild(qL);
  
// Define FEEDBACK AREA
const $feedback = document.createComment('div')
$feedback.id = 'feedback'
$feedback.textContent = 'FEEDBACK HERE'
$Q.appendChild($feedback);

// Define SUBMIT BUTTON
const $submit = document.createElement("button");
$submit.textContent = "SUBMIT";
$submit.classList.add("btn", "btn-info");
$Q.append($submit);

console.log("$Q = ", $Q);
//   console.log(" ");
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
  