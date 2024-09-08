import axios from "../axios";

export default async function getAllTaskApi(queryData){
    return await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, {
        params : queryData
    })
}