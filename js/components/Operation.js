import React, {useState} from "react";
import {deleteOperation, editOperation, postOperation} from "../api/operations";
import {deleteTask} from "../api/tasks";

const Operation = ({operation, onRemoveOperation, status, setOperations}) => {


    const [timeLocal, setTimeLocal] = useState(0);
    const [changeTime, setChangeTime] = useState(operation.timeSpent)
    const [showFormTime, setShowFormTime] = useState(false);


    function formatTime(total) {
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        if(hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }


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
        const sumTime = timeLocal + changeTime
        setChangeTime(sumTime);
        const data = {description: operation.description, timeSpent: sumTime}

        editOperation(operation.id, data);
        setTimeLocal(0);
        setShowFormTime(false)
    }

    const deleteOperationAPI = (e) => {
        e.preventDefault();
        deleteOperation(operation, onRemoveOperation)
    }




    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {operation.description}

                {changeTime > 0 ?
                <span className="badge badge-success badge-pill ml-2">{formatTime(changeTime)}</span>
                    : null
                }
            </div>

            {showFormTime ?
                <form>
                    <div className="input-group input-group-sm">
                        <input type="number"
                               className="form-control"
                               placeholder="Spent time in minutes"
                               style={{width: '12rem'}}
                               onChange={handleSetTimeLocal}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" onClick={saveTime}><i className="fas fa-save"></i>
                            </button>
                            <button className="btn btn-outline-dark" onClick={cancelFormNoSet}><i
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