


const baseUrl = "http://localhost:7000"


 const get = async (url: string) => {
    return await fetch(`${baseUrl}${url}`).then(res => res.json()).catch(e => console.error(e))
}


 const post = async (url: string, data) => {
    return await fetch(`${baseUrl}${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        }


    })
}

const put = async (url: string, data) => {
    return await fetch(`${baseUrl}${url}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": 'application/json'
        }


    })
}


export default {get,post,put}
