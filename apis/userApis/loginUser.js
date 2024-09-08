import axios from "../axios";

export default async function loginUserApi(bodyData){
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, bodyData)
}