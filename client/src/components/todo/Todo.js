import React,{useState} from "react";
import axios from"axios";
import './todo.css';
const Todo = ({todo, remove, check}) => {
  const [state, setCheck] = useState({'check':todo.check});
  
  const onCheck = async (todo) => {
    todo.check = !todo.check;
    setCheck({check: !state.check})
    todo = await axios.post("https://mern-todolist-server.herokuapp.com/check",todo);
  }

  const strike = {textDecoration: state.check ? 'line-through' : 'none'};
  const checked = state.check;
  return (
    
    <div>
      <h3 className="text-dark text-center p-1 bg-light border-bottom">
        <i className="fa fa-trash m-1 text-danger float-start" 
        onClick={() => remove(todo)}  />
        <span style={strike}>{todo.title}</span>
        <span className="date">{todo.date}</span>
        <input type="checkbox" checked={checked} className="m-2 float-end" 
        onChange={() => onCheck(todo)} />
      </h3>
    </div>
  );
};

export default Todo;
