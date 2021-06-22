import Navbar from "./Components/Navbar";
import React, { useState, useEffect } from "react";
import TodoList from "./Components/TodoList";
import { Container } from "@material-ui/core";
import TodoForm from "./Components/TodoForm";
import "./App.css";
import todoApi from "./api/todoApi";
import createID from 'create-unique-id'

function App() {
  const [Todo, setTodo] = useState([]);

  useEffect(() => {
    const getTodoList = async () => {
      // ?sortBy=createdAt&order=desc
      const param = { sortBy: "createAt" };
      const response = await todoApi.getAll(param);
      setTodo(response);
    };
    getTodoList();
  }, []);

  async function addTodo(task) {
    const newTask = { title: task, isDone: false };
    const res = todoApi.postTodo(newTask);
    const {id} = await res;
    //Api return mảng todo mới được add vào
    const newTodo = [...Todo];
    newTodo.unshift({...newTask, id: id});
    setTodo(newTodo);
  }

  function handleDoneTask(taskInfo) {
    const idTask = taskInfo.id;
    const newTodo = [...Todo];
    const foundIndex = newTodo.findIndex((x) => x.id === idTask);
    newTodo[foundIndex].isDone = !newTodo[foundIndex].isDone;
    setTodo(newTodo);
    const status = { isDone: newTodo[foundIndex].isDone };
    todoApi.updateTodo(idTask, status);
  }

  function handleRemoteTask(task) {
    const index = Todo.indexOf(task);
    const tempTodo = [...Todo];
    tempTodo.splice(index, 1);
    setTodo(tempTodo);
    todoApi.deleteTodo(task.id);
  }

  return (
    <div>
      <Navbar />
      <Container fixed className="mt-5">
        <TodoForm submitForm={addTodo} />
        <TodoList
          todoList={Todo}
          doneTask={handleDoneTask}
          removeTask={handleRemoteTask}
        />
      </Container>
    </div>
  );
}

export default App;
