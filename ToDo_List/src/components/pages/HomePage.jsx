import React,{useState,useEffect} from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import LogOut from '../commen/LogOut';


function HomePages() {
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
    // let updatedTodoArr = [...allTodos]
    // let flag = 0;
    // for(let i=0;i<updatedTodoArr.length;i++){
    //   if(updatedTodoArr[i].title == newToDoItem.title){
    //     flag = 1;
    //     break;
    //   }
    // }
    const flag = allTodos.some(todo => todo.title === newToDoItem.title )
    if(!flag){
      // updatedTodoArr.unshift(newToDoItem)
      setTodos((allTodos)=> [newToDoItem,...allTodos])
      setTitle("")
      setDesc('')
      
      localStorage.setItem('todolist',JSON.stringify([newToDoItem,...allTodos]))
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

    // let updatedCompletedArr = [...completedTodos]
    // updatedCompletedArr.push(filteredItem)
    setCompletedTodos(completedTodos => [filteredItem,...completedTodos])
    handleDeleteTodo(index)
    localStorage.setItem('complete',JSON.stringify([filteredItem,...completedTodos]))
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

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-800 text-white">
<div className='flex justify-between items-center w-full max-w-3xl mt-8'>
  <h1 className="text-3xl font-bold text-center flex-grow">My Todos</h1>
  <LogOut />
</div>

      <div className="bg-gray-700 p-6 w-full max-w-3xl mt-8 rounded-lg shadow-lg overflow-y-auto max-h-[70vh]">
        <div className="flex flex-col md:flex-row items-center justify-center border-b border-gray-600 pb-7 mb-6">
          <div className="flex flex-col mb-4 md:mb-0 md:mr-6">
            <label className="font-bold mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the task title"
              className="p-2 rounded bg-white text-black w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex flex-col mb-4 md:mb-0 md:mr-6">
            <label className="font-bold mb-2" htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              value={newDesc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What's the description"
              className="p-2 rounded bg-white text-black w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type='button'
            onClick={handleAddTodo}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-6 md:mt-0"
          >
            Add
          </button>
        </div>

        <div className="flex mb-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${!isCompleteScreen ? 'bg-green-500' : 'bg-gray-600'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`px-4 py-2 rounded ${isCompleteScreen ? 'bg-green-500' : 'bg-gray-600'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="space-y-4">
          {!isCompleteScreen && allTodos.map((item, index) => (
            currentEdit === index ? (
              <div key={index} className="bg-gray-600 p-4 rounded">
                <input
                  type="text"
                  placeholder="Updated Title"
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem.title}
                  className="w-full p-2 mb-2 rounded bg-white text-black"
                />
                <input
                  type="text"
                  placeholder="Updated Description"
                  onChange={(e) => handleUpdateDesc(e.target.value)}
                  value={currentEditedItem.desc}
                  className="w-full p-2 mb-2 rounded bg-white text-black"
                />
                <button
                  type='button'
                  onClick={handleUpdateToDo}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Update
                </button>
              </div>
            ) : (
              <div key={index} className="bg-gray-600 p-4 rounded flex justify-between items-center">
                <div>
                  <h2 className="text-green-400 text-xl font-semibold">{item.title}</h2>
                  <p>{item.desc}</p>
                </div>
                <div className="flex space-x-2">
                  <BsCheckLg
                    className="text-2xl text-green-500 cursor-pointer hover:text-green-600"
                    onClick={() => handleComplete(index)}
                    title='Complete?'
                  />
                  <AiOutlineEdit
                    className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500"
                    onClick={() => handleEdit(index, item)}
                    title='Edit?'
                  />
                  <AiOutlineDelete
                    className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => handleDeleteTodo(index)}
                    title='Delete?'
                  />
                </div>
              </div>
            )
          ))}

          {isCompleteScreen && completedTodos.map((item, index) => (
            <div key={index} className="bg-gray-600 p-4 rounded flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>{item.desc}</p>
                <p className="text-sm italic">Completed On: {item.completedOn}</p>
              </div>
              <div>
                <AiOutlineDelete
                  className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDeleteCompleted(index)}
                  title='Delete?'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePages
