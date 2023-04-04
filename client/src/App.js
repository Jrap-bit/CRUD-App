import "./App.css";
import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

function App() {
  const [idval, setidval] = useState(0);
  const [taskName, settask] = useState("");
  const [taskDesc, settaskDesc] = useState("");
  const [taskList, settaskList] = useState([]);
  const [newtaskName, setnewtaskName] = useState("");
  const [newtaskDesc, setnewtaskDesc] = useState("");
  const [newFind, setnewFind] = useState(0);
  const [newRead, setnewRead] = useState(0);


  const deleteAll = () => {
    setnewRead(newRead + 1);
    Axios.delete("http://localhost:3001/deleteall");
  };

  const deletefromList = (id) => {
    setnewRead(newRead + 1);
    Axios.delete('http://localhost:3001/delete/${id}');
  };

  const addtoList = () => {
    setnewRead(newRead + 1);
    Axios.post("http://localhost:3001/insert", {
      taskName: taskName,
      taskDesc: taskDesc,
    });
  };

  const updateList = () => {
    setnewRead(newRead + 1);
    Axios.put("http://localhost:3001/update", {
      taskName: newtaskName,
      taskDesc: newtaskDesc,
      idval: idval,
    });
  };

  const findinList = () => {
    setnewFind(newFind + 1);
    Axios.post("http://localhost:3001/find", { idval: idval })
      .then((response) => {
        settaskList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const readList = () => {
    setnewRead(newRead + 1);
    Axios.get("http://localhost:3001/read").then((response) => {
      settaskList(response.data);
    });
  };

  return (
    <div className="App m-5">
      <h1 className="h1">CRUD Application</h1>

      <div className="container">
        <div className="row">
          <div className="col">
            <h6 className="h5 mt-5">Find by S. No</h6>
            <div className="input-group mb-5">
              <input
                type="number"
                className="form-control"
                onChange={(event) => {
                  setidval(event.target.value);
                }}
                placeholder="Enter the S. No"
                aria-label="Enter the S. No"
                aria-describedby="button-addon2"
              />
              <button
                className="btn btn-success"
                onClick={findinList}
                type="button"
                id="button-addon2-form"
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <h6 className="h5">Enter New Task</h6>
            <div className="input-group mb-3 ml-5 mr-5 mu-5">
              <input
                type="text"
                id="find-input"
                onChange={(event) => {
                  settask(event.target.value);
                }}
                className="form-control"
                placeholder="Task Name"
                aria-label="Task Name"
              />
            </div>
            <div className="input-group mb-3 ml-5 mr-5 mu-5">
              <input
                type="text"
                id="find-input"
                onChange={(event) => {
                  settaskDesc(event.target.value);
                  setnewRead(newRead + 1);
                }}
                className="form-control"
                placeholder="Task Description"
                aria-label="Task Description"
              />
            </div>

            <button
              className="btn btn-primary ml-5"
              onClick={addtoList}
              type="button"
              id="button-addon2"
            >
              Add To List
            </button>
          </div>
          <div className="col">
            <h6 className="h5">Update by S. No</h6>
            <div className="input-group mb-1">
              <input
                type="number"
                className="form-control"
                id="find-input"
                onChange={(event) => {
                  setidval(event.target.value);
                }}
                placeholder="Enter S. No"
                aria-label="Enter S. No"
              />
            </div>
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                id="find-input"
                onChange={(event) => {
                  setnewtaskName(event.target.value);
                }}
                placeholder="Enter New Task Name"
                aria-label="Enter New Task Name"
              />
            </div>
            <div className="input-group mb-1">
              <input
                type="text"
                className="form-control"
                onChange={(event) => {
                  setnewtaskDesc(event.target.value);
                }}
                id="find-input"
                placeholder="Enter New Task Description"
                aria-label="Enter New Task Description"
              />
            </div>
            <div>
              <button
                className="btn btn-warning mb-5"
                type="button"
                id="button-addon2-form"
                onClick={updateList}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          className="btn btn-danger ml-5 mb-3"
          type="button"
          onClick={deleteAll}
          id="button-addon2"
        >
          Delete All Data
        </button>
      </div>
      <button
        className="btn btn-primary ml-5"
        onClick={readList}
        type="button"
        id="button-addon2"
      >
        Show the Task List
      </button>

      <div className="App">
        <h2 className="h2 mt-4 mb-5">Task List</h2>
        {taskList.map((val, key) => {
          return (
            <div key={key}>
              <h6 className="h6">Task {val.sNo}</h6>
              <h4>Title: {val.taskName}</h4>
              <p>Description: {val.taskDesc}</p>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => deletefromList(val._id)}
                id="button-addon2-form">
                Delete
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
