import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Todo3.css"

export default function Todo3()
{  let[newtask,setNewtask]=useState("");
 let[todo,setTodo]=useState([{task:"simple-task",id:uuidv4()}]); //array of object

   let taskinput=(event)=>{
    setNewtask(event.target.value);
   };
  let addtask=()=>{
    setTodo([...todo,{task:newtask, id:uuidv4() }]);
    setNewtask("");
  };
  let deletetask=(id)=>{
     setTodo(todo.filter((task) => task.id!=id)); //here task means the each element of array and array.filter creates a array of those 
  };                                              // elements which fulfill the condition given in the function
  
    return(
      <div className="container">
        <h2>What's the plan for today ?</h2>
       <div className="list">
      <input placeholder="add a new task" value={newtask}onChange={taskinput}></input>
      
      <button className="add-button"onClick={addtask}>ADD</button>
      <hr></hr>
      <h3>TASK TO BE DONE</h3>
      <ol>{
        todo.map((work)=>(
        <li key={work.id}>
           <span className="text"> {work.task}</span>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <button className="delete-button" onClick={()=>deletetask(work.id)}>Delete</button>
           
        </li>
        )
       )}
      </ol>
      </div>
      </div>
    );
}