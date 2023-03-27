import { API_KEY, API_URL } from "./constants";

/**
 * Fetch all operations
 * @param {string} id - ID of task
 * @param {function} successCallback - Function that saves incoming data
 */
export const getOperationsAll = async (idTask, successCallback) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${idTask}/operations`, {
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




export const postOperation = async (id, operation, successCallback) => {

    try {
        const response = await fetch(`${API_URL}/tasks/${id}/operations`, {
            body: JSON.stringify(operation),
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

export const deleteOperation = async (operation, successCallback) => {

    try {
        const response = await fetch(`${API_URL}/operations/${operation.id}`, {
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


        successCallback(operation);
    } catch (err) {
        console.log(err);
    }
};

export const editOperation = async (id, operation) => {
    try {
        const response = await fetch(`${API_URL}/operations/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: API_KEY,
            },
            method: "PUT",
            body: JSON.stringify(operation),
        });

        const data = await response.json();

        if (data.error) {
            throw new Error("Błąd!");
        }

    } catch (err) {
        console.log(err);
    }
};