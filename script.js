const log = console.log
/*
__________________________________________________________

DEFENE
__________________________________________________________
*/
// Question
const qHead = "<h2>Wrong Emai</h2><p>You are a manager and you have received a grievance email from your employee, John Smith, concerning overtime working hours. As part of your responsibility, you forward the email to your manager and to your labour relations officer, and you cc the employee. After sending the email, you realize that you sent it by mistake to Jane Smith and not John Smith.</p><p><strong>What are the steps you would take?</strong></p><p class='instructions'>Select 4 actions and place them in the correct order.</p>"
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

let $Question = ''
let attempts = 0 // attempts counter
const maxAttempts = 2 // Max attempts
const maxChck = choices.filter(c => c.correct === true).length // Max checked boxes
let boxes = [] // Checked Boxes
let counter = 0 // counter

let $orders = '' // numbered order PlaceHolder
let $inputs = '' // all inputs PlaceHolder

let inputTarget = '' // Checked target input
let orderedTarget = '' // Checked target order
let $submit = '' // SUBMIT button
let submitText = 'SUBMIT'
let restartText = 'Try Again'
let resetText = 'Start Over'
let $feedback = '' // Feedback PlaceHolder
const feedbacks = {
  correct: `<p>Correct! By recalling and deleting the message, you are mitigating the risk of exposure as quickly as possible. However, if an exposure has occurred, you want to reduce any further impact by informing those involved and by taking appropriate actions to retrieve and/or delete the information. Because there was an incident, you should inform DAIP.</p>
  <p>Lastly, you should continue with your responsibilities to your employee and send the email to the right person.</p>`,

  incorrect: `Feedback 2`,
  
  failed: `
  <p>Incorrect. The correct response is:</p>
  <ol>
  <li>1.	Recall the email and delete unread copies of the message</li>
  <li>2.	If not successful in recalling, advise recipient to triple delete the email</li>
  <li>3.	Report a breach incident to DAIP</li>
  <li>4.	Forward the email to the correct person</li>
  </ol>
  <p>By recalling and deleting the message, you are mitigating the risk of exposure as quickly as possible. However, if an exposure has occurred, you want to reduce any further impact by informing those involved and by taking appropriate actions to retrieve and/or delete the information. Because there was an incident, you should inform DAIP. Lastly, you should continue with your responsibilities to your employee and send the email to the right person.</p>`,
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

  clearOrders() {
    $orders.forEach($order => {
      $order.textContent = null
      $order.classList.add('opacity-0')
    })
    return
  },

  resetInputs() {
    $inputs.forEach($input => $input.checked = false)
    return
  },

  restartQuestion() {
    boxes = []
    reuse.resetInputs()
    reuse.clearOrders()
    $feedback.innerHTML = ''
  },
  
  resetQuestion() {
    boxes = []
    attempts = 0;
    counter = 0;
    reuse.resetInputs()
    reuse.clearOrders()
    $feedback.innerHTML = ''
    $Question.innerHTML = ''
    buildQuestion(choices, rand = true)
  },
  
  // Check Answer
  checkAnswer() {
    counter = 0;
    boxes.forEach((box, i) => {
      $orders.forEach(($order, j) => {
        if($inputs[j].dataset.order === box) {
          // log('box => ', box, '$inputs [j] = ', $inputs[j].dataset.order, ' | ', '$order = ', $order, ' | ', i + 1)
          counter++
        }
      })
    })
    // log('counter = ', counter)
    if(counter === maxChck) {
      // log('load correct feedback')
      $feedback.innerHTML = feedbacks.correct;
      $submit.classList.add('disabled', 'opacity-25')
      document.querySelectorAll('input').forEach(i => i.setAttribute("disabled","disabled"))
    } else {
      if(attempts < maxAttempts) {
        // log('load incorrect feedback')
        $feedback.innerHTML = feedbacks.incorrect;

        let $restart = reuse.setObj(null, 'button', null, ['btn', 'btn-info', 'animated', 'fadeIn']);
        $restart.textContent = restartText
        $restart.addEventListener('click', reuse.restartQuestion)
        $feedback.appendChild($restart)
        
        attempts++
      } else {
        // log('load failed feedback')
        $feedback.innerHTML = feedbacks.failed;

        let $reset = reuse.setObj(null, 'button', null, ['btn', 'btn-info', 'animated', 'fadeIn']);
        $reset.textContent = resetText
        $reset.addEventListener('click', reuse.resetQuestion)
        $feedback.appendChild($reset)
      }
    }
    return
  },

  // get Checked box
  getChecked(e) {
    inputTarget = e.target.closest("input");
    
    inputTarget.checked ? boxes.push(inputTarget.value) : boxes = boxes.filter((item) => inputTarget.value !== item);

    $orders = document.querySelectorAll('.order')
    $inputs = document.querySelectorAll('input')
    
    // Reset Orders numbers first
    $orders.forEach(($order, j) => $order.textContent = null)

    boxes.forEach((box, i) => {
      $orders.forEach(($order, j) => {
        if($inputs[j].value === box) {
          // log('box => ', box, '$inputs [j] = ', $inputs[j].value, ' | ', '$order = ', $order, ' | ', i + 1)
          $order.classList.remove('opacity-0')
          $order.textContent = i + 1
        }
      })
    })
        
    orderedTarget.textContent = boxes.indexOf(inputTarget.value) + 1;
    boxes.length === maxChck ? $submit.classList.remove('disabled', 'opacity-25') : $submit.classList.add('disabled', 'opacity-25');
    return
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
  $Question = reuse.setObj("#q", null, null, ['d-flex', 'flex-column', 'p-3', 'fs-4']);
  // const $qHead = reuse.setObj(null, 'p', 'qHead', ['bg-dark', 'text-light', 'p-3']);
  const $qHead = reuse.setObj(null, 'p', 'qHead', ['p-3']);
  // const $qBody = reuse.setObj(null, 'div', 'qBody', ['d-flex', 'flex-row', 'gap-2', 'p-3', 'bg-secondary']);
  const $qBody = reuse.setObj(null, 'div', 'qBody', ['d-flex', 'flex-row', 'gap-2', 'p-3']);
  const $choices = reuse.setObj(null, 'ul', 'choices', ['list-unstyled', 'd-grid', 'gap-2', 'flex-grow-1']);
  $submit = reuse.setObj(null, 'button', 'submit', ['btn', 'btn-lg', 'btn-info', 'disabled', 'opacity-25', 'animated', 'fadeIn']);
  $feedback = reuse.setObj(null, 'div', 'feedback', ['flex-grow-1']);
  const df = new DocumentFragment();

  
  // Loop Questions
  choices.forEach((choice) => {
    // Create loop objects
    // let $choice = reuse.setObj(null, 'li', null, ['choice', 'bg-warning', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    let $choice = reuse.setObj(null, 'li', null, ['choice', 'd-flex', 'flex-row', 'gap-1', 'justify-content-between']);
    let $input = reuse.setObj(null, 'input', `choice-${choice.value}`, ['p-4', 'form-check-input', 'flex-shrink-1', 'check', 'animated', 'fadeIn'])
    // let $label = reuse.setObj(null, 'label', null, ['mx-2', 'bg-white', 'flex-grow-1'])
    let $label = reuse.setObj(null, 'label', null, ['mx-2', 'flex-grow-1'])
    let $div = reuse.setObj(null, 'div', null, ['lbl', 'w-100', 'animated', 'fadeIn'])
    let $divNum = reuse.setObj(null, 'span', null, ['order', 'm-2', 'fs-4', 'p-3', 'rounded-circle', 'opacity-0', 'animated', 'fadeIn'])
    
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
    
    // Append to parent objects
    $label.appendChild($div)
    $choice.appendChild($divNum)
    $choice.appendChild($input)
    $choice.appendChild($label)
    
    df.appendChild($choice);
  });

  // Fill Objects
  $qHead.innerHTML = qHead;
  $submit.textContent = submitText;
  $feedback.innerHTML = ''

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