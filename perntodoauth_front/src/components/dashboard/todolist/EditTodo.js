import React, { useEffect, useState } from "react";

function EditTodo({ todo, trigGetTodos }) {
  const [description, setDescription] = useState(todo.description);
  // Use a "Modal."

  useEffect(() => {
    console.log("EditTodos Refresh");
  }, []);

  async function editText() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.getItem("token"));

      const response = await fetch(
        `http://localhost:5000/dashboard/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ description: description }),
        }
      );
      let parseRes = await response.json();
      console.log(parseRes);
      trigGetTodos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-warning" id="exampleModalLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Edit Todo"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText()}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
