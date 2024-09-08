import axios from "../axios";

export default async function deleteTaskApi(bodyData){
    return await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, {
        data : bodyData
    })
}