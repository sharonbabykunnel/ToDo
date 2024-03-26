import React,{useState,useEffect} from 'react';
import './App.css'
import Alert from '@mui/material/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { colors } from '@mui/material';


function App() {
  const [isCompleteScreen,setIscompleteScreen] = useState(false)
  const [allTodos,setTodos] = useState([])
  const [newTitle,setTitle] = useState('')
  const [newDesc,setDesc] = useState('')
  const [completedTodos,setCompletedTodos] = useState([])
  const [currentEdit,setCurrentEdit] = useState("")
  const [currentEditedItem,setCurrentEditedItem] = useState("");
  const handleAddTodo = () =>{
    let newToDoItem = {
      title:newTitle,
      desc:newDesc
    }

    if(newTitle.trim().length>0){
    let updatedTodoArr = [...allTodos]
    let flag = 0;
    for(let i=0;i<updatedTodoArr.length;i++){
      if(updatedTodoArr[i].title == newToDoItem.title){
        flag = 1;
        break;
      }
    }
    if(flag == 0){
      // updatedTodoArr.unshift(newToDoItem)
      setTodos((newToDoItem)=>{
          
      })
      setTitle("")
      setDesc('')
      
      localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    }else{
      // use last
    {/* <Alert variant="outlined" severity="warning">
      This is an outlined warning Alert.
    </Alert> */}
      alert('item already exist')
    }
  }else{
    alert('enter a task')
  }
    

  }

  const handleDeleteTodo =(index)=>{
//alert
    let reducedArr = [...allTodos]
    reducedArr.splice(index,1)

    setTodos(reducedArr)
    localStorage.setItem('todolist',JSON.stringify(reducedArr))
  }

  const handleComplete=(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear()
    let h =now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn = dd+'-'+mm+'-'+yyyy+'at' +h+':'+m+':'+s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
    localStorage.setItem('complete',JSON.stringify(updatedCompletedArr))
  }


  const handleDeleteCompleted =(index)=>{
    let reducedArr = [...completedTodos]
    reducedArr.splice(index,1)

    setCompletedTodos(reducedArr)
    localStorage.setItem('complete',JSON.stringify(reducedArr))
  }


  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let completed = JSON.parse(localStorage.getItem('complete'))
    if(savedTodo){
      setTodos(savedTodo)
    }
    if(completed){
      setCompletedTodos(completed)
    }
  },[])

  function handleEdit(index,item){
    setCurrentEdit(index)
    setCurrentEditedItem(item)
  }

  const handleUpdateTitle =(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }
  const handleUpdateDesc = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,desc:value}
    })
  }
  const handleUpdateToDo=()=>{
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo)
    setCurrentEdit('')
  }

  return(
    <div className='main-body'>

      <h1>My Todos</h1>
     {/* {openModal && <Modal />} */}

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className = 'todo-input-item'>
            <label htmlFor="">Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setTitle(e.target.value)} placeholder = 'Whats the task title' />
          </div>
          <div className = 'todo-input-item'>
            <label htmlFor="">Description</label>
            <input type="text" value={newDesc} onChange={(e)=>setDesc(e.target.value)} placeholder = 'Whats the description' />
          </div>
          <div className = 'todo-input-item'>
           <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
      <div className = 'btn-area'>
        <button className={`secondaryButton ${isCompleteScreen === false && 'active'}`} onClick={()=>setIscompleteScreen(false)}>Todo</button>
        <button className={`secondaryButton ${isCompleteScreen === true && 'active'}`} onClick={()=>setIscompleteScreen(true)}>Completed</button>
      </div>
      <div className='todo-list'>
        
        {
         !isCompleteScreen && allTodos.map((item,index)=>{
          if(currentEdit===index){
            return(
            <div className='edit_wrapper' key={index}>
              <input type="text" placeholder='Updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />
              <input type="text" placeholder='Updated Description' onChange={(e)=>handleUpdateDesc(e.target.value)} value={currentEditedItem.desc} />
              
              {/* <button type='button' className='primaryBtn'>Cancel</button> */}
              <button type='button' onClick={handleUpdateToDo} className='primaryBtn'>Update</button>
              
            </div>
            )
          }else{
          return(
            <div className='todo-list-item' key={index}>
          <div>
            <h1 className='Title'>{item.title}</h1>
            <p>{item.desc}</p>
          </div>
          <div >
          <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?' />
          <AiOutlineEdit className='editIcon' onClick={()=>handleEdit(index,item)} title='Edit?' />
          <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title='Delete?' />

          </div>
        </div>
          )}})
        }

         {
         isCompleteScreen && completedTodos.map((item,index)=>(
            <div className='todo-list-item' key={index}>
          <div>
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
            <p><i>Completed On: {item.completedOn}</i></p>
          </div>
          <div >
          <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompleted(index)} title='Delete?' />
          </div>
        </div>
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default App
