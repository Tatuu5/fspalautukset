import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const submitToServer = (personData) => {
    const request = axios.post(baseUrl, personData)
    console.log('Data submitted', request.data)
    return request.then(response => response.data)
}


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


const deleteFromServer = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    return (
    axios.delete(url)
    )
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { submitToServer, getAll, deleteFromServer, updatePerson }






