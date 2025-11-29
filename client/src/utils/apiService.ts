


const baseUrl = "http://localhost:7000"


const get = async (url:string) => {
    return await fetch(`${baseUrl}${url}`).then(res => res.json()).catch(e => console.error(e))
}


export default{get}
