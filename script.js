const log = console.log;
/*
__________________________________________________________

DEFENE
__________________________________________________________
*/
// Question
const qHead =
  "<h2>Wrong Email</h2><p>You are a manager and you have received a grievance email from your employee, John Smith, concerning overtime working hours. As part of your responsibility, you forward the email to your manager and to your labour relations officer, and you cc the employee. After sending the email, you realize that you sent it by mistake to Jane Smith and not John Smith.</p><p><strong>What are the steps you would take?</strong></p><p class='instructions'>Select 4 actions and place them in the correct order.</p>";

const choices = [
  {
    choice: "Recall the email and delete unread copies of the message",
    value: 1,
    correct: true,
    order: 1
  },
  {
    choice: `If not successful in recalling, advise the recipient to <a href='https://collaboration-corpsec.forces.mil.ca/sites/DAIP/PIM%20documents%20%20Documents%20IRVP/English/How%20to%20Triple-Delete%20D365.docx?d=w7794ab92885149e0b3edb21fb86a3370&csf=1&e=g5O9BP' target='_blank'>triple</a> delete the email`,
    value: 2,
    correct: true,
    order: 2
  },
  {
    choice: "Report a breach incident to DAIP",
    value: 3,
    correct: true,
    order: 3
  },
  {
    choice: "Forward the email to the correct person",
    value: 4,
    correct: true,
    order: 4
  },
  {
    choice: "Ask Jane to forward the email to John Smith for you",
    value: 5,
    correct: false
  },
  {
    choice:
      "If not successful in recalling, delete sent message from your folder",
    value: 6,
    correct: false
  },
  {
    choice: "Recall the email and send an apology to Jane",
    value: 7,
    correct: false
  },
  {
    choice: "No need to report as you handled the breach according to SOPs",
    value: 8,
    correct: false
  }
];

let $Question = "";
let attempts = 0; // attempts counter
const maxAttempts = 2; // Max attempts
const maxChck = choices.filter((c) => c.correct === true).length; // Max checked boxes
let boxes = []; // Checked Boxes
let counter = 0; // counter

let $orders = ""; // numbered order PlaceHolder
let $inputs = ""; // all inputs PlaceHolder

let inputTarget = ""; // Checked target input
let orderedTarget = ""; // Checked target order
let $submit = ""; // SUBMIT button
let submitText = "SUBMIT";
let restartText = "Try Again";
let resetText = "Start Over";
let $feedback = ""; // Feedback PlaceHolder

const feedbacks = {
  correct: `<h2>Correct!</h2><p>By recalling and deleting the message, you are mitigating the risk of exposure as quickly as possible. However, if an exposure has occurred, you want to reduce any further impact by informing those involved and by taking appropriate actions to retrieve and/or delete the information. Because there was an incident, you should inform DAIP.</p>
  <p>Lastly, you should continue with your responsibilities to your employee and send the email to the right person.</p>`,

  incorrect: `<h2>Incorrect.</h2><p>Try again.</p>`,

  failed: `
  <h2>Incorrect.</h2><p>The correct response is:</p>
  <ol>
  <li>Recall the email and delete unread copies of the message</li>
  <li>If not successful in recalling, advise recipient to <a href='https://collaboration-corpsec.forces.mil.ca/sites/DAIP/PIM%20documents%20%20Documents%20IRVP/English/How%20to%20Triple-Delete%20D365.docx?d=w7794ab92885149e0b3edb21fb86a3370&csf=1&e=g5O9BP' target='_blank'>triple</a> delete the email</li>
  <li>Report a breach incident to DAIP</li>
  <li>Forward the email to the correct person</li>
  </ol>
  <p>By recalling and deleting the message, you are mitigating the risk of exposure as quickly as possible. However, if an exposure has occurred, you want to reduce any further impact by informing those involved and by taking appropriate actions to retrieve and/or delete the information. Because there was an incident, you should inform DAIP. Lastly, you should continue with your responsibilities to your employee and send the email to the right person.</p>`
}; // Feedback levels

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
    let newSelector = "";
    if (selectorRef != undefined || selectorRef != null) {
      newSelector = document.querySelector(selectorRef);
      reuse.setClasses(newSelector, classArray);
    } else {
      newSelector = document.createElement(newType);
      newId != undefined || newId != null ? (newSelector.id = newId) : "";
      reuse.setClasses(newSelector, classArray);
    }
    return newSelector;
  },

  // Define the shuffle
  shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  },

  clearOrders() {
    $orders.forEach(($order) => {
      $order.textContent = null;
      $order.classList.add("opacity-0");
    });
    return;
  },

  resetInputs() {
    $inputs.forEach(($input) => ($input.checked = false));
    return;
  },

  restartQuestion() {
    boxes = [];
    reuse.resetInputs();
    reuse.clearOrders();
    $feedback.classList.add("visually-hidden");
    $feedback.innerHTML = "";
  },

  resetQuestion() {
    boxes = [];
    attempts = 0;
    counter = 0;
    reuse.resetInputs();
    reuse.clearOrders();
    $feedback.classList.add("visually-hidden");
    $feedback.innerHTML = "";
    $Question.innerHTML = "";
    buildQuestion(choices, (rand = true));
  },

  // Check Answer
  checkAnswer() {
    counter = 0;
    boxes.forEach((box, i) => {
      $orders.forEach(($order, j) => {
        if ($inputs[j].dataset.order === box) {
          // log('box => ', box, '$inputs [j] = ', $inputs[j].dataset.order, ' | ', '$order = ', $order, ' | ', i + 1)
          counter++;
        }
      });
    });
    // log('counter = ', counter)
    if (counter === maxChck) {
      // log('load correct feedback')
      $feedback.classList.remove("visually-hidden");
      $feedback.innerHTML = feedbacks.correct;
      $submit.classList.add("disabled", "opacity-25");
      document
        .querySelectorAll("input")
        .forEach((i) => i.setAttribute("disabled", "disabled"));
    } else {
      if (attempts < maxAttempts) {
        // log('load incorrect feedback')
        $feedback.classList.remove("visually-hidden");
        $feedback.innerHTML = feedbacks.incorrect;

        let $restart = reuse.setObj(null, "button", null, [
          "btn",
          "btn-primary",

          "rounded-0",
          "mt-3",
          "p-3",
          "animated",
          "fadeIn"
        ]);
        $restart.textContent = restartText;
        $restart.addEventListener("click", reuse.restartQuestion);
        $feedback.appendChild($restart);

        attempts++;
      } else {
        // log('load failed feedback')
        $feedback.classList.remove("visually-hidden");
        $feedback.innerHTML = feedbacks.failed;

        let $reset = reuse.setObj(null, "button", null, [
          "btn",
          "btn-primary",
          "rounded-0",
          "mt-3",
          "p-3",
          "animated",
          "fadeIn"
        ]);
        $reset.textContent = resetText;
        $reset.addEventListener("click", reuse.resetQuestion);
        $feedback.appendChild($reset);
      }
    }
    return;
  },

  // get Checked box
  getChecked(e) {
    inputTarget = e.target.closest("input");

    inputTarget.checked
      ? boxes.push(inputTarget.value)
      : (boxes = boxes.filter((item) => inputTarget.value !== item));

    $orders = document.querySelectorAll(".order");
    $inputs = document.querySelectorAll("input");

    // Reset Orders numbers first
    $orders.forEach(($order, j) => ($order.textContent = null));

    boxes.forEach((box, i) => {
      $orders.forEach(($order, j) => {
        if ($inputs[j].value === box) {
          // log('box => ', box, '$inputs [j] = ', $inputs[j].value, ' | ', '$order = ', $order, ' | ', i + 1)
          $order.classList.remove("opacity-0");
          $order.textContent = i + 1;
        }
      });
    });

    orderedTarget.textContent = boxes.indexOf(inputTarget.value) + 1;
    boxes.length === maxChck
      ? $submit.classList.remove("disabled", "opacity-25")
      : $submit.classList.add("disabled", "opacity-25");
    return;
  }
};
/*
__________________________________________________________

BUILD
__________________________________________________________
*/
const buildQuestion = (choices, rand) => {
  // Randomize Questions
  rand ? reuse.shuffle(choices) : "";

  // Create Objects
  $Question = reuse.setObj("#q", null, null, [
    "d-flex",
    "flex-column",
    "position-relative",
    // "overflow-y-hidden",

    // "border",
    // "border-1",
    // "border-primary",
    // "w-auto",
    // "row",
    "p-3"
    // "bg-white"
  ]);
  const $qHead = reuse.setObj(null, "div", "qHead", ["mb-2"]);
  const $qBody = reuse.setObj(null, "div", "qBody", [
    "d-flex",
    "flex-row",
    // "flex-fill",
    "d-grid",

    // "border",
    // "border-1",
    // "border-primary",

    // "bg-warning",
    "w-100",
    // "w-auto",
    "col"
  ]);
  const $choices = reuse.setObj(null, "ul", "choices", [
    "list-unstyled",
    "my-0",
    "d-grid",
    "container",
    "m-0",
    "p-0"
  ]);
  // $choices.style.width = "60%";

  // $submitContainer = reuse.setObj(null, "div", null, ["d-grid"]);

  $submit = reuse.setObj(null, "button", "submit", [
    "btn",
    "btn-primary",
    // "justify-self-end",
    // "btn-lg",
    "rounded-0",
    "mt-3",
    "p-3",
    // "mx-4",
    // "border",
    // "border-1",
    // "border-primary",

    "disabled",
    "opacity-25",
    "animated",
    "fadeIn"
  ]);
  // $feedback = reuse.setObj(null, "div", "feedback", ["col"]);
  $feedback = reuse.setObj(null, "div", "feedback", [
    "d-flex",
    "flex-column",
    // "justify-content-start",
    "justify-content-center",
    // "align-items-center",
    "align-items-stretch",
    // "h-auto",
    // "overflow-y-auto",

    "z-1",
    "w-100",
    // "w-auto",
    "h-100",
    // "row",
    "position-absolute",
    "top-50",
    "start-50",
    "translate-middle",
    // "p-3",
    "p-5",
    // "my-5",
    "ms-0",
    "me-0",
    // "rounded-5",
    "visually-hidden",
    "bg-light"
    // "align-self-start",
    // "border",
    // "border-1",
    // "border-primary",
    // "bg-primary",
    // "col"

    // "shadow"
  ]);

  const df = new DocumentFragment();

  // Loop Questions
  choices.forEach((choice) => {
    // Create loop objects
    let $choice = reuse.setObj(null, "li", null, [
      "input-group",
      "d-flex",
      "flex-row",
      "justify-content-start",
      "align-items-stretch",
      "flex-nowrap",
      // "d-inline-flex",
      "mb-1",
      "rounded-1",
      "choice",
      // "p-2",
      "p-1"

      // "border",
      // "border-1",
      // "border-primary"
    ]);

    let $inputGroup = reuse.setObj(null, "div", null, [
      "input-group-text",
      "align-self-center",
      "rounded-0",
      "bg-transparent",

      // "border",
      "border-0",
      "ps-0"
      // "pe-3"
    ]);

    let $input = reuse.setObj(null, "input", `choice-${choice.value}`, [
      "form-check-input",
      "check",
      // "mt-auto",
      "mt-0",
      // "p-1",
      "animated",
      // "rounded-circle",

      // "border",
      // "border-1",
      // "border-primary",

      // "bg-info",
      "fadeIn"
    ]);

    let $label = reuse.setObj(null, "label", null, [
      "align-self-start",
      "flex-fill",
      "mt-1",
      "pe-2"

      // "border",
      // "border-1",
      // "border-primary"
    ]);

    let $div = reuse.setObj(null, "span", null, [
      "lbl",
      // "w-100",
      "animated",
      "fadeIn"
      // "border",
      // "border-2",
      // "border-danger"
    ]);

    let $divNum = reuse.setObj(null, "span", null, [
      "align-self-center",
      "order",
      "badge",
      "text-bg-primary",

      "mt-0",
      "ms-auto",
      "me-0",

      // "fs-6",
      "fw-medium",

      "border",
      "border-1",
      "border-primary",

      // "border-4",
      // "border-info",
      "text-white",
      "rounded-circle",
      "opacity-0",
      "animated",
      "fadeIn"
    ]);

    // set Types
    $input.type = "checkbox";

    // fill Objects
    $div.innerHTML = `${choice.choice}`;

    // Ste Attributes
    $input.setAttribute("value", `${choice.value}`);
    $input.setAttribute("aria-label", "Checkbox for following text input");
    $input.setAttribute("data-correct", `${choice.correct}`);
    choice.order ? $input.setAttribute("data-order", `${choice.order}`) : "";
    $label.setAttribute("for", `choice-${choice.value}`);

    // Append to parent objects
    $label.appendChild($div);

    // $choice.appendChild($input)
    $inputGroup.appendChild($input);
    $choice.appendChild($inputGroup);

    $choice.appendChild($label);

    $choice.appendChild($divNum);

    df.appendChild($choice);
  });

  // Fill Objects
  $qHead.innerHTML = qHead;
  $submit.textContent = submitText;
  $feedback.innerHTML = "";

  // Append objects to DOM elements
  $Question.appendChild($qHead);
  $choices.appendChild(df);

  $choices.appendChild($submit);
  // $submitContainer.appendChild($submit);
  // $choices.appendChild($submitContainer);

  $qBody.appendChild($choices);
  // $qBody.appendChild($feedback);
  $Question.appendChild($qBody);
  $Question.appendChild($feedback);

  // Add Listeners
  $choices.addEventListener("change", reuse.getChecked);
  $submit.addEventListener("click", reuse.checkAnswer);

  return;
};

buildQuestion(choices, (rand = true));
/* __________________________________________________________ */
