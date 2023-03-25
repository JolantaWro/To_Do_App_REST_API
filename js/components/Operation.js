import React, {useState} from "react";
import {deleteOperation, postOperation} from "../api/operations";
import {deleteTask} from "../api/tasks";

const Operation = ({operation, onRemoveOperation, status, setOperations}) => {
    const [timeLocal, setTimeLocal] = useState(null);
    const [changeTime, setChangeTime] = useState(operation.timeSpent)
    const [showFormTime, setShowFormTime] = useState(false);

    const handleSetTimeLocal = (e) => {
        e.preventDefault();
        setTimeLocal(parseInt(e.target.value))
    }

    const viewFormToSet = (e) => {
        e.preventDefault();
        setShowFormTime(true);
    }

    const cancelFormNoSet = (e) => {
        e.preventDefault();
        setShowFormTime(false);
    }
    const saveTime = (e) => {
        e.preventDefault();
        setChangeTime(prevState => prevState + timeLocal);
        const data = {description: operation.description, timeSpent: changeTime}

        editOperation(operation.id, data, setOperations);
        setTimeLocal(0);
    }

    const deleteOperationAPI = (e) => {
        e.preventDefault();
        deleteOperation(operation, onRemoveOperation)
    }




    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {operation.description}

                {operation.timeSpent > 0 ?
                <span className="badge badge-success badge-pill ml-2">{operation.timeSpent}</span>
                    : null
                }
            </div>

            {showFormTime ?
                <form>
                    <div className="input-group input-group-sm">
                        <input type="number"
                               className="form-control"
                               placeholder="Spent time in minutes"
                               style="width: 12rem"
                               onChange={handleSetTimeLocal}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" type="submit" onClick={saveTime}><i className="fas fa-save"></i>
                            </button>
                            <button className="btn btn-outline-dark" type="submit" onClick={cancelFormNoSet}><i
                                className="fas fa-times false"></i></button>
                        </div>
                    </div>
                </form>
                :
                    <div>
                        {status === "open" ?
                            <button className="btn btn-outline-success btn-sm mr-2" onClick={viewFormToSet}>
                                Add time
                                <i className="fas fa-clock ml-1"></i>
                            </button>
                            : null
                        }
                        <button className="btn btn-outline-danger btn-sm" onClick={deleteOperationAPI}><i className="fas fa-trash"></i></button>
                    </div>

            }

        </li>
    );
};

export default Operation;