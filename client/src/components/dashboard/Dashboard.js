import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

function Dashboard({ setAuth }) {
  const [allTodos, setAllTodos] = useState([]);
  const [name, setName] = useState("");

  const getTodos = async () => {
    try {
      const response = await fetch("/dashboard/", {
        method: "GET",
        headers: { token: localStorage.getItem("token") },
      });
      let parseRes = await response.json();
      setAllTodos(parseRes);
      setName(parseRes[0].user_name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Remove token from localStorage
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <>
      <div className="d-flex mt-5 justify-content-around">
        <h1>{name}'s Todo List</h1>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>

      <InputTodo trigGetTodos={() => getTodos()} />
      <ListTodos trigGetTodos={() => getTodos()} allTodos={allTodos} />
    </>
  );
}

export default Dashboard;
