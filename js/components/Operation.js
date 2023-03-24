import React, {useState} from "react";
import {postOperation} from "../api/operations";

const Operation = ({description, id, onRemoveOperation, timeSpent, status}) => {
    const [timeLocal, setTimeLocal] = useState(null)
    const [showFormTime, setShowFormTime] = useState(false);
    // const {
    //     description,
    //     timeSpent,
    //     addedDate,
    //     id,
    //     task
    // } = data;
    const submitHandlerTime = (e) => {
        e.preventDefault();
        const data = {}
        postOperation(id, data, setOperations);
        setShowForm(false);
    }


    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {description}

                {/*/!*<!-- Czas wyświetlany tylko jeżeli większy od 0    -->*/}
                {timeSpent > 0 ?
                <span className="badge badge-success badge-pill ml-2">{timeSpent}</span>
                    : null }
            </div>


            {/*<!-- Formularz wyświetlany po naciśnięciu "Add time", po zapisie czasu znika -->*/}
            {showFormTime &&
                <form onSubmit={submitHandlerTime}>
                    <div class="input-group input-group-sm">
                        <input type="number"
                               class="form-control"
                               placeholder="Spent time in minutes"
                               style="width: 12rem"
                               value={timeLocal} onChange={e => setTimeLocal(parseInt(e.target.value))} />
                        <div class="input-group-append">
                            <button class="btn btn-outline-success" type="submit"><i class="fas fa-save"></i></button>
                            <button class="btn btn-outline-dark" type="submit"><i class="fas fa-times false"></i></button>
                        </div>
                    </div>
                </form>
            }



            {/*// <!-- div wyświetlany domyślnie, znika po wciśnięciu "Add time" -->*/}
            {!showFormTime &&
                <div>
                    {/*// <!-- Przycisk widoczny tylko jeżeli status zadania jest "open" -->*/}
                    {status === "open" ?
                        <button className="btn btn-outline-success btn-sm mr-2" onClick={() => setShowFormTime(true)}>
                            Add time
                            <i className="fas fa-clock ml-1"></i>
                        </button>
                        : <h5>status NIE Open</h5> }

                    <button className="btn btn-outline-danger btn-sm" onClick={(e) => onRemoveOperation(e)}><i className="fas fa-trash"></i></button>
                </div>
            }
        </li>
    );
};

export default Operation;