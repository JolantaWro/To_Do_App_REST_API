

import React, {useState, useEffect} from "react";
import {getOperationsAll, postOperation} from "../api/operations";
import Operations from "./Operations";
import {deleteTask, editTask} from "../api/tasks";

const Task = ({task, onRemoveTask}) => {

    const [operationsAll, setOperations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [statusTask, setStatusTask] = useState(task.status)

    const viewForm = (e) => {
        e.preventDefault();
        setShowForm((prevState) => {
            if(prevState) {
                return false
            } else {
                return true
            }
        })
    }

    const deleteTaskAPI = (e) => {
        e.preventDefault();
        deleteTask(task, onRemoveTask)
    }

    const closedTask = (e) => {
        e.preventDefault();
        const data = {title: task.title, description: task.description, status: "closed"};
        editTask(task.id, data);
        setStatusTask("closed")
    }

    useEffect(() => {
        getOperationsAll(task.id, setOperations);
    }, []);




    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{task.title}</h5>
                    <h6 className="card-subtitle text-muted">{task.description}</h6>
                </div>


                <div>
                    {/* Przyciski "Add operation" i "Finish" mają być widoczne
                        tylko jeżeli status zadania jest "open"*/}

                    {task.status !== "open" ? null :
                        <>
                            <button
                                className="btn btn-info btn-sm mr-2"
                                onClick={viewForm}>Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>

                            <button className="btn btn-dark btn-sm" onClick={closedTask}>Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    }

                    {/*Przycisk usuwania ma być widoczny tylko
                            jeżeli nie ma żadnych operacji w zadaniu */}


                    {operationsAll.length !== 0 ? null :
                        <button className="btn btn-outline-danger btn-sm ml-2" value={task.id} onClick={deleteTaskAPI}>
                            <i className="fas fa-trash false"></i>
                        </button>
                    }

                </div>
            </div>

            <Operations taskID={task.id} form={showForm} setForm={setShowForm} operationsAll={operationsAll}
                        setOperations={setOperations} status={statusTask} />


        </section>
    );
};

export default Task;
