import axios from "../axios";

export default async function createTaskApi(bodyData){
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, bodyData)
}