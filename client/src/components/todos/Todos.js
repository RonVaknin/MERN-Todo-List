import React, { useEffect, useState } from "react";
import axios from "axios";

import Todo from "../todo/Todo";
import Addtodo from "../addtodo/Addtodo";
import SearchBar from "../searchbar/SearchBar";

import './todos.css';
const Todos = () => {
  //Original todo list fetched from server.
  const [todos, setTodos] = useState(null);
  //Filtered todo list, can be filtered.
  const [filteredData,setFilteredData] = useState(todos);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data } = await axios("https://mern-todolist-server.herokuapp.com/");
    let result = data.map ((todo, index) => {
      todo.date = new Date(todo.date).toDateString();
      return todo;
    })
    setTodos(result);
    setFilteredData(result);
  };
  //Adding new task to state array, tasts already added to DB at Addtodo component.
  const appendList = (todo) =>{
    todo.date = new Date(todo.date).toDateString();
    console.log("append list",todo);
    setTodos(todos => [...todos,todo]);
    setFilteredData(todos => [...todos,todo]);
  }
  //Sending remove request to server and removing from states tasks lists.
  const removeItem = async (todo)=>{
    let arrTodos = [...todos];
    let index = arrTodos.indexOf(todo);
    if(index!==-1){
      let result = await axios.post("https://mern-todolist-server.herokuapp.com/remove",todo);
      if(result.data==="OK" || result.status === 200){
        arrTodos.splice(index, 1)
        setTodos(arrTodos);
        setFilteredData(arrTodos);
      }
    }
  }

  //Tasks search function recieve a string and matching to Todo object's title and date.
  const filterList = (searchString) =>{
    if(!searchString || searchString ==="" || searchString.length<=0){
      setFilteredData(todos);
      return;
    }
    let lowerCaseSearchString = searchString.toLowerCase();
    let result = todos.filter((e) => {
      return(e.title.toLowerCase().includes(lowerCaseSearchString) || 
        e.date.toLowerCase().includes(lowerCaseSearchString));
    })
    
    setFilteredData(result);
  }
  return (
    <div>
      <div>
      <Addtodo appendList = {appendList}></Addtodo>
      <SearchBar filterList = {filterList}></SearchBar>
      </div>
      {filteredData !== null && filteredData.length>0
        ? filteredData.map((t, index) => {
            return <Todo key={t._id} todo={t} remove={removeItem} />;
          })
        : <div>"No tasks"</div>}
    </div>
  );
};

export default Todos;
