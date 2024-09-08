import Button from "@/components/atoms/button/button"
import styles from "./login-form.module.css"
import {  useSetRecoilState } from "recoil"
import { isLoginComponent } from "@/utils/recoil-states"
import { useState } from "react"
import loginUserApi from "@/apis/userApis/loginUser"
import { isValidEmail } from "@/utils/helper"
import { useRouter } from "next/navigation"
import { cookie } from "@/apis/cookies"

export default function LoginForm(){
    const setIsLogin = useSetRecoilState(isLoginComponent)
    const [userDetails,setUserDetails] = useState({})
    const [errorMsg,setErrorMsg] = useState('')
    const [isSubmitting,setIsSubmitting] = useState(false)
    const router = useRouter()
    
    function handleChange(key,value){
        setErrorMsg('')
        setUserDetails({
            ...userDetails,
            [key] : value
        })
    }

    async function handleSubmit(){
        try{
            if(isSubmitting) return
            setIsSubmitting(true)
            const {email,password} = userDetails || {}
            if(!email || !password){
                setErrorMsg("Email and password are required.")
                setIsSubmitting(false)
                return
            }
            if(!isValidEmail(email)){
                setErrorMsg("Please enter a valid email.")
                setIsSubmitting(false)
                return
            }
            const data = await loginUserApi(userDetails)
            if(data){
                cookie.userToken = data
                router.push("/task")
            }
        }catch(error){
            console.log(error.message)
            setErrorMsg(error.message)
        }finally{
            setIsSubmitting(false)
        }
    }

    return(
        <div className={styles.wrapper}>
            <h1>Login</h1>
            <div className={styles.formInputs}>
                <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    onChange={(e)=>handleChange("email",e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={(e)=>handleChange("password",e.target.value)}
                />
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <Button text={isSubmitting ? "Proceeding..." :"Login"} customStyle={styles.loginBtn} handleClick={()=>handleSubmit()}/>
                <p className={styles.signUp}>Don't have an account? <span onClick={()=>setIsLogin(false)}>SignUp</span></p>
                <Button text="Login With Google" customStyle={styles.gogleBtn}/>
            </div>
        </div>
    )
}