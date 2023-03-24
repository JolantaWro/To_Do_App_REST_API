import React, {useState} from 'react';
import Operation from "./Operation";
import {postOperation} from "../api/operations";

const Operations = ({taskID, form, setForm, operationsAll, setOperations, status}) => {
    const [operationLocal, setOperationLocal] = useState("")

    const onRemoveOperation = (idOperationToDelete) => {
        setOperations((prevState) => {
            return prevState.id !== idOperationToDelete;
        })

    }

    const submitHandler = (e) => {
        e.preventDefault();
        setOperations(prev => [...prev, operationLocal])
        setOperationLocal("")
        setForm(false);
    }
    //taskID={id} form={showForm} setForm={setShowForm} operations={operations} setOperations={setOperations} status={status} />


    return (
        <div>
            {
                form &&
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Operation description"
                                   value={operationLocal}
                                   onChange={e => setOperationLocal(e.target.value)} />

                            <div className="input-group-append">
                                <button className="btn btn-info">
                                    Add
                                    <i className="fas fa-plus-circle ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }

            <ul className="list-group list-group-flush">
                {
                    operationsAll.map(operation => <Operation key={operation.id} description={operation.description}
                                                           id={operation.id}
                                                           onRemoveOperation={onRemoveOperation}
                                                           timeSpent={operation.timeSpent} status={operation.status}/>)
                }
            </ul>
        </div>
    )
};

export default Operations;