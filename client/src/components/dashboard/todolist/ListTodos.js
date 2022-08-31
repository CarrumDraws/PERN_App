import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function ListTodos({ trigGetTodos, allTodos }) {
  useEffect(() => {
    console.log("ListTodos Refresh");
  }, []);

  async function deleteTodo(id) {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/todos/${id}`,
        {
          method: "DELETE",
          headers: { token: localStorage.getItem("token") },
        }
      );
      let parseRes = await response.json();
      trigGetTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Use 'map' instead of 'ForEach,' and (Round) instead of {Curly} */}
          {allTodos.length !== 0 &&
            allTodos[0].todo_id !== null &&
            allTodos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo todo={todo} trigGetTodos={() => trigGetTodos()} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteTodo(todo.todo_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodos;
