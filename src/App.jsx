import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

//uuidv4();

function App() {


  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([]);
  const [showcompleted, setshowcompleted] = useState(true);



  useEffect(() => {
   

    let todoString = JSON.parse(localStorage.getItem("todos"));

    if(todoString){
      settodos(todoString);
    }
  }, [])
  




  const handleAdd = () => {


    settodos([...todos, { id: uuidv4(), todo, isFinished: false }]);
    settodo("");
    savetoLS([...todos, { id: uuidv4(), todo, isFinished: false }]);
    console.log([...todos, { id: uuidv4(), todo, isFinished: false }])
  }

  const handleDelete = (mytodo) => {

    const newtodos = todos.filter(t => {
      return (t.id != mytodo.id)
    });
    settodos([...newtodos]);
    savetoLS([...newtodos]);
  }

  const handleEdit = (mytodo) => {

    settodo(mytodo.todo);
    handleDelete(mytodo);

  }
  const handleChange = (e) => {
    settodo(e.target.value);
  }


  const manageChange = (mytodo) => {

    let index = todos.findIndex(e => {
      return e.id === mytodo.id
    })

    let newtodos = [...todos];
    newtodos[index].isFinished = !newtodos[index].isFinished;

    settodos(newtodos);

    savetoLS(newtodos);


  }

  let savetoLS = (thetodos)=>{

    localStorage.setItem("todos" , JSON.stringify(thetodos));
  }



  return (
    <>
      <div className="hold w-full h-screen">
        <Navbar />
        <div className=" cont flex h-[92vh] justify-center items-center">

          <div className="main h-[80vh] w-full md:w-[45%] rounded-lg bg-sky-400 shadow-2xl mt-5 flex flex-col items-center justify-start p-6">

            <h2 className="font-bold text-cyan-950 text-2xl">TOOLIST - Your List Tracker</h2>
            <div className="mt-8 w-full flex justify-center items-center">
              <input value={todo} onSubmit={(e) => { handleChange(e) }} onChange={(e) => { handleChange(e) }}
                type="text" className="w-[90%] py-1 px-2 border-none rounded-l-xl" />
              <button disabled={todo.length <= 0} onClick={handleAdd} className="disabled:opacity-50 disabled:bg-gray-950 p-2 px-3 bg-sky-700 rounded-r-xl hover:scale-[1.03]"><FaPlus color='white' />
              </button>
            </div>

            <div className="todoscont w-full mt-4 h-[100%]  overflow-y-scroll overflow-x-hidden">
              <h2 className="w-full text-start ml-3 font-semibold text-blue-950 text-[1.2rem] ">Your Todos</h2>
              <div className="random flex justify-start items-center gap-2 text-[11px] mt-1 text-cyan-900">
                <input
                  onChange={e => { setshowcompleted(!showcompleted) }}
                  checked={showcompleted}
                  type="checkbox"
                  name="isFinished"
                  id=""
                />  <span className=''>Show Finished</span></div>
              <div className="todos w-full mt-3  ">

                {todos.length == 0 && <div className='text-cyan-950 px-6'>No Todos to show.</div>}
                {todos.map(mytodo => {


                 return (showcompleted || !mytodo.isFinished) && (<div key={mytodo.id} className="todo shadow-sm rounded-xl mt-2 flex justify-between items-start px-4 pb-1 cursor-pointer hover:scale-[1.005] h-auto">
                  <div className="flex justify-center items-center gap-3 text-cyan-900 w-[80%]">
                    <input
                      onChange={(e) => { manageChange(mytodo) }}
                      checked={mytodo.isFinished}
                      type="checkbox"
                      name="isFinished"
                      id=""
                    />
                    <p
                      className={`${mytodo.isFinished ? 'line-through' : ''} font-medium text-[.8rem] h-auto break-words w-[85%]`}
                    >
                      {mytodo.todo}
                    </p>
                  </div>
                  <div className="btns flex items-center justify-center text-white w-[20%]">
                    <button
                      onClick={(e) => { handleDelete(mytodo) }}
                      className="p-2 bg-sky-700 hover:scale-[1.04]"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={(e) => { handleEdit(mytodo) }}
                      className="p-2 bg-sky-600 hover:scale-[1.04]"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>)

                

                })
                }
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default App
