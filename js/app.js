const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const closeEl = document.getElementById('close')
/* time elements */
const fullDay = document.getElementById("full-day");
const year = document.getElementById("year");
const day = document.getElementById("day");
const month = document.getElementById("month");
const hourEl  = document.getElementById('hour')
const minuteEl  = document.getElementById('minute')
const secondEl  = document.getElementById('second')

let editItemId
// check

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

// save to localstorage
function setTodos(){
  localStorage.setItem('list' , JSON.stringify(todos))
}
// time
function getTime(){
  const now = new Date()
   const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
   const month = now.getMonth()< 10 ? '0' + now.getMonth() : now.getMonth()
   const year = now.getFullYear()

   const hour = now.getHours()< 10 ? '0' + now.getHours() : now.getHours()
   const minutes = now.getMinutes()< 10 ? '0' + now.getMinutes() : now.getMinutes()
const seconds = now.getSeconds()< 10 ? '0' + now.getSeconds() : now.getSeconds()
const monthNames = [
  'January' , 'February' , 'March' , 'April' , ' May'  , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'
]

const monthTitle = now.getMonth()
fullDay.textContent =  `${date} ${ monthNames[monthTitle]} ${year}`

hourEl.textContent = hour
minuteEl.textContent = minutes
secondEl.textContent = seconds


 return (` ${hour}:${minutes}  ${date}.${ ('0'+( Number(month)+1)).slice(-2)}.${year}`);
}

setInterval(getTime , 1000)
// show todos



if(todos.length) showTodos()

function showTodos(){
  listGroupTodo.textContent = ''
  const todos = JSON.parse(localStorage.getItem('list'))
  todos.forEach((item , i)=>{
    listGroupTodo.innerHTML += `
    <li ondblclick='setCompleted(${i})' class="list-group-item d-flex justify-content-between ${item.completed  ? 'completed' : ''}">
         ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
             <img onclick='editTodo(${i})'  src="img/edit.svg" alt="edit image" width="25" height=" 25">
             <img onclick='deleteTodo(${i})' src="img/delete.svg" alt="delete image" width="25" height=" 25">
          </div>
        </li>
    `
  })
}

// completed function
function setCompleted(id){
    const completeTodos  = todos.map((item, index)=>{
      if( index == id ){
        return {...item, completed : item.completed ? false : true}
      } else {
        return {...item}
      }
    })


    todos = completeTodos
    setTodos()
    showTodos()
}


formCreate.addEventListener('click' , (e)=>{
  e.preventDefault()
  const todoText = formCreate['input-create'].value.trim()
formCreate.reset()
  if(todoText.length ){
    todos.push({text: todoText , time: getTime() , completed: false})
    setTodos()
    showTodos()
  } else showMessage('message-create' , 'Please create some text...')
})

// show error function

function showMessage(where , message){
  document.getElementById(`${where}`).textContent = message
    setTimeout(()=>{
      document.getElementById(`${where}`).textContent= ''
    } , 2500)
}


// delete todo

function deleteTodo(id){
  const deletedTodos = todos.filter((item, index)=>{
    return index !== id 

  })
  todos = deletedTodos
  setTodos()
  showTodos()
}

formEdit.addEventListener('submit' , (e)=>{
  e.preventDefault()
  const todoText = formEdit['input-edit'].value.trim()
  formEdit.reset()
    if(todoText.length ){
      todos.splice(editItemId , 1 ,{text: todoText , time: getTime() , completed: false})
        setTodos()
      showTodos()
      closeModal()
    } else showMessage('message-edit' , 'Please create some text...')
})


function editTodo(id){
openModal()
editItemId = id
}

function openModal(){
modal.classList.remove('hidden')
overlay.classList.remove('hidden')
}
document.addEventListener('keydown' , (e)=>{
  if(e.which == 27) closeModal()

})
overlay.addEventListener('click' , closeModal)
closeEl.addEventListener('click' , closeModal)
function closeModal(){
  modal.classList.add('hidden')
  overlay.classList.add('hidden')
}