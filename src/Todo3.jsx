import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Todo3.css"

export default function Todo3()
{  
  //==================== get item=================================
  let getlocaltem=()=>{
    let list=localStorage.getItem('list');
    console.log(list);
    if(list){
       return JSON.parse(localStorage.getItem('list'));
    }
    else{
        return[];
    }
}
  //==============================================================

  let[newtask,setNewtask]=useState("");
 let[todo,setTodo]=useState(getlocaltem()); 
 let[toggle,setToggle]=useState(true);
 let[isEdit,setIsEdit]=useState(null);

   let taskinput=(event)=>{
    setNewtask(event.target.value);
   };
  let addtask=()=>{
    if(!newtask){
      alert("add a task");
    }
    else if(newtask && !toggle){
      setTodo(
        todo.map((elem)=>{
          if(elem.id===isEdit){
            return{...elem,task:newtask}
          }
          return elem;
        }))
        setNewtask('');
        setToggle(true);
    }
    else{
    setTodo([...todo,{task:newtask, id:uuidv4() }]);
    setNewtask("");
    }
  };
  let deletetask=(id)=>{
     setTodo(todo.filter((task) => task.id!=id)); //here task means the each element of array and array.filter creates a array of those 
  };                                              // elements which fulfill the condition given in the function
   let edit=(id)=>{
     let newitem = todo.find((e)=>{
      return e.id===id;
     });
      console.log(newitem);
      setNewtask(newitem.task);
      setToggle(false);
      setIsEdit(id);
     
   }
   //=================================== set item ====================
   useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(todo))
},[todo])

//========================================================

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
           <div>
           <button className="delete-button" onClick={()=>deletetask(work.id)}>Delete</button>
           <button className="delete-button" onClick={()=>edit(work.id)}>edit</button>
           </div>
        </li>
        )
       )}
      </ol>
      </div>
      </div>
    );
}