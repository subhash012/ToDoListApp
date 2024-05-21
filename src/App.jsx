import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleedit=(e,id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newtodos)
    saveToLS()
  }
  
  const handledelete=(e, id)=>{  
    let newtodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newtodos) 
    saveToLS()
  }
  
  const handleadd= ()=>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo("")
    saveToLS()
  }

  const handlechange=(e)=>{
    settodo(e.target.value)
  }

  const handlecheckbox=(e)=> {
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id==id;
    })
    let newtodos=[...todos];
    newtodos[index].isCompleted=!newtodos[index].isCompleted;
    settodos(newtodos)
    saveToLS()
  }
  
 
  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handlechange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleadd} disabled={todo.length<=0} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
         </div>
         <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
         <h2 className='text-2xl font-bold'>Your Todos</h2>
         <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
          {todos.map(item=>{
 
          return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5 custom-style'> 
            <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleedit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
            </div> 
          </div>
          })}
         </div>
        
       </div>
    </>
  )
}

export default App
