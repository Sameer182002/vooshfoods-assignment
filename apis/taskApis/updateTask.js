import axios from "../axios";

export default async function updateTaskApi(bodyData){
    return await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, bodyData)
}