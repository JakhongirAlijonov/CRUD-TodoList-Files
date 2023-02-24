const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const year = document.getElementById("year");
const day = document.getElementById("day");
const month = document.getElementById("month");
const hourEl  = document.getElementById('hour')
const minuteEl  = document.getElementById('minute')
const secondEl  = document.getElementById('second')

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


 return (` ${hour}:${minutes}  ${date}.${ ('0'+(  month+1)).slice(-2)}.${year}`);
}

setInterval(getTime , 1000)
// show todos



if(todos.length) showTodos()

function showTodos(){
  listGroupTodo.textContent = ''
  const todos = JSON.parse(localStorage.getItem('list'))
  todos.forEach((item , i)=>{
    listGroupTodo.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
         ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
             <img src="img/edit.svg" alt="edit image" width="25" height=" 25">
             <img src="img/delete.svg" alt="delete image" width="25" height=" 25">
          </div>
        </li>
    `
  })
}

// 


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