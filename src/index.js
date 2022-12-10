document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    createToDo()
    form.reset()
    })
  document.querySelector('#sort').addEventListener('click', createSort)
});

function createToDo() {
  let task = document.querySelector('#new-task-description').value
  
  let priority = createPriority()
  priority.addEventListener('change', handlePriority)

  let done = document.createElement('button')
  done.addEventListener('click', handleDelete)
  done.textContent = 'x'
  done.style.margin = '10px'
  
  let newTask = document.createElement('li')
  newTask.textContent = task
  newTask.appendChild(priority)
  newTask.appendChild(done)

  let list = document.querySelector('#tasks')
  list.appendChild(newTask)
}

function handleDelete(e) {
  e.target.parentNode.remove()
}

function createPriority() {
  let priority = document.createElement('select')
  let firstValue = document.createElement('option')
  let high = document.createElement('option')
  let medium = document.createElement('option')
  let low = document.createElement('option')
  
  firstValue.textContent = 'Priority'
  high.textContent = 'High'
  medium.textContent = 'Medium'
  low.textContent = 'Low'

  priority.appendChild(firstValue)
  priority.appendChild(high)
  priority.appendChild(medium)
  priority.appendChild(low)
  priority.style.margin = '10px'
  return priority
}

function handlePriority(e) {
  if (e.target.value === 'High'){
    e.target.parentNode.style.color = "#BF403B"
  } else if (e.target.value === 'Medium') {
    e.target.parentNode.style.color = "#EDB361"
  } else if (e.target.value === 'Low') {
    e.target.parentNode.style.color = "#779645"
  } else {
    e.target.parentNode.style.color = "#000"
  }
}

function createSort() {
  let list = document.querySelector('ul')
  let b = list.getElementsByTagName('li')
  let i, shouldSwitch
  let switching = true;
  while (switching) {
    switching = false;
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].querySelector('select').value === 'Medium' && b[i + 1].querySelector('select').value === 'High'){
        shouldSwitch = true;
      } else if (b[i].querySelector('select').value === 'Low' && b[i + 1].querySelector('select').value === 'High'){
        shouldSwitch = true;
      } else if (b[i].querySelector('select').value === 'Low' && b[i + 1].querySelector('select').value === 'Medium'){
        shouldSwitch = true;
      } 
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      } 
    }
  }
}