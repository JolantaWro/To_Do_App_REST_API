import React, {useState, useEffect} from "react";
import {getOperationsAll, postOperation} from "../api/operations";
import Operations from "./Operations";

const Task = ({title, description, id, status, onRemoveTask}) => {
    const [operationsAll, setOperations] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newOperation, setNewOperation] = useState("");
    const [statusTask, setStatusTask] = useState(status)

    useEffect(() => {
        getOperationsAll(id, setOperations);
    }, []);




    //metoda do usuniecia z tablicy operacji o podanym ID
    // metoda  z zapytaniem do API informacji o ukonczonym zadaniu FINISH

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const data = {description: newOperation, timeSpent: 0}
    //     postOperation(id, data, setOperations);
    //     setShowForm(false);
    // }
    const handleAddOperation = () => {
        const data = {description: newOperation, timeSpent: 0}
        postOperation(id, data, setOperations);
        setShowForm(false);
    }

    // useEffect(() => {
    //     handleAddOperation()
    // },[newOperation])





    return (
        <section className="card mt-5 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h5>{title}</h5>
                    <h6 className="card-subtitle text-muted">{description}</h6>
                </div>


                <div>
                    {/* Przyciski "Add operation" i "Finish" mają być widoczne
                        tylko jeżeli status zadania jest "open"*/}

                    {statusTask &&
                        <>
                            <button
                                className="btn btn-info btn-sm mr-2"
                                onClick={() => setShowForm(true)}>Add operation
                                <i className="fas fa-plus-circle ml-1"></i>
                            </button>

                            <button className="btn btn-dark btn-sm">Finish
                                <i className="fas fa-archive ml-1"></i>
                            </button>
                        </>
                    }

                    {/*Przycisk usuwania ma być widoczny tylko
                            jeżeli nie ma żadnych operacji w zadaniu */}



                        <button className="btn btn-outline-danger btn-sm ml-2">
                            <i className="fas fa-trash false"></i>
                        </button>

                </div>
            </div>

            <Operations taskID={id} form={showForm} setForm={setShowForm} operationsAll={operationsAll}
                        setOperations={setOperations} status={statusTask} />


        </section>
    );
};

export default Task;