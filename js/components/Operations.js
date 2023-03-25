import React, {useState} from 'react';
import Operation from "./Operation";
import {deleteOperation, postOperation} from "../api/operations";

const Operations = ({taskID, form, setForm, operationsAll, setOperations, status}) => {
    const [operationDescription, setOperationDescription] = useState("");

    // const onRemoveOperation = (idOperation) => {
    //     deleteOperation(idOperation, setOperations)
    // }
    const onRemoveOperation = (operationToRemove) => {
        setOperations(prevState => prevState.filter(operation => operation.id !== operationToRemove.id))
    }


    const submitHandler = (e) => {
        e.preventDefault();
        const data = {description: operationDescription, timeSpent: 0}
        postOperation(taskID, data, setOperations);
        setOperationDescription("")
        setForm(false);
    }



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
                                   value={operationDescription}
                                   onChange={e => setOperationDescription(e.target.value)} />

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
                    operationsAll.map(operation => <Operation key={operation.id} operation={operation} status={status}
                                                              onRemoveOperation={onRemoveOperation}
                                                              setOperations={setOperations}/>)
                }
            </ul>
        </div>
    )
};

export default Operations;
