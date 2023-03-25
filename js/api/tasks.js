import { API_KEY, API_URL } from "./constants";
/**
 * Fetch all tasks
 * @param {function} successCallback - Function that saves incoming data
 */
export const getTasks = async (successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};


export const postTask = async (task, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
            method: "POST",
            body: JSON.stringify(task),
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(data.data);
    } catch (err) {
        console.log(err);
    }
};

export const editTask = async (id, task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
            method: "PUT",
            body: JSON.stringify(task),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error("Błąd!");
        }

    } catch (err) {
        console.log(err);
    }
};

export const deleteTask = async (task, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${task.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
            method: "DELETE",
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }
        successCallback(task);

    } catch (err) {
        console.log(err);

    }
};