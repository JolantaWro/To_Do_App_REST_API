import React, {useState, useEffect} from "react";
import NewTask from "./NewTask";
import {getTasks} from "../api/tasks";
import Task from "./Task";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    const onNewTask = (newTask) => {
        setTasks((prevState) => [...prevState, newTask])
    }

    const onRemoveTask = (idTaskToDelete) => {
        setTasks((prevState) => {
            return prevState.id !== idTaskToDelete;
        })

    }



    useEffect(() => {
        getTasks(setTasks);
    }, []);
    console.log(tasks)

    return (
        <>
            <NewTask onNewTask={setTasks} />

            {
                tasks.map(task => {
                    return <Task title={task.title} description={task.description} id={task.id} key={task.id}
                                 status={task.status} onRemoveTask={setTasks} />
                })
            }
        </>
    );
};

export default Home;
