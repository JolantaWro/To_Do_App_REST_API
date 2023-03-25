import React, {useState, useEffect} from "react";
import NewTask from "./NewTask";
import {getTasks} from "../api/tasks";
import Task from "./Task";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    const onNewTask = (newTask) => {
        setTasks((prevState) => [...prevState, newTask])
    }

    const onRemoveTask = (taskToRemove) => {
        setTasks(prevState => prevState.filter(task => task.id !== taskToRemove.id));
    }


    useEffect(() => {
        getTasks(setTasks);
    }, []);


    return (
        <>
            <NewTask onNewTask={onNewTask} />

            {
                tasks.map(task => {
                    return <Task task={task} onRemoveTask={onRemoveTask} key={task.id} />
                })
            }
        </>
    );
};

export default Home;