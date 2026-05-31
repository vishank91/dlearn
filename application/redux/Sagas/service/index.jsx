export async function createRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        response = await response.json()
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}

export async function createMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}`, {
            method: "POST",
            headers: {
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}


export async function getRecord(collection) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        console.log(response)
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}

export async function updateRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}/${payload.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        response = await response.json()
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}

export async function updateMultipartRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}/${payload.get("id")}`, {
            method: "PUT",
            headers: {
            },
            body: payload
        })
        response = await response.json()
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}


export async function deleteRecord(collection, payload) {
    try {
        let response = await fetch(`${process.env.BACKEND_API_URL}/${collection}/${payload.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        return response
    } catch (error) {
        // console.log(error)
        return []
    }
}