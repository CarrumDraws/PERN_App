import React, { useEffect, useState } from "react";

function InputTodo({ trigGetTodos }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log("InputTodo Refresh");
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.getItem("token"));

      if (description.length != 0) {
        const response = await fetch("http://localhost:5000/dashboard/todos", {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ description: description }),
        });
        let parseRes = await response.json();
        trigGetTodos();
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center my-5">InputTodo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}

export default InputTodo;
