import { API_KEY, API_URL } from "./constants";

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
export const getOperationsAll = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
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

export const getOperationOne = async (id, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/operations/${id}`, {
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




export const postOperation = async (id, task, successCallback) => {
    console.log(task);
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            body: JSON.stringify(task),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        successCallback(prev => [...prev, data.data]);
    } catch (err) {
        console.log(err);
    }
};

export const deleteOperation = async (id, successCallback) => {
    console.log("z API",id);
    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
        });

        const data = await response.json();

        if (data.error || typeof successCallback !== "function") {
            throw new Error("Błąd!");
        }

        // sprawdz id, czy task czy operation
        successCallback((prevState) => {
            return prevState.id !== id;
        });
    } catch (err) {
        console.log(err);
    }
};

