import styles from "./header.module.css"
import EventNoteIcon from '@mui/icons-material/EventNote';
import Button from "@/components/atoms/button/button";
import { useRecoilState } from "recoil";
import { isLoginComponent } from "@/utils/recoil-states";
import { cookie } from "@/apis/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header(){
    const [isLogin,setIsLoggin] = useRecoilState(isLoginComponent)
    const [token, setToken] = useState(null);
    const router = useRouter()

    useEffect(() => {
        setToken(cookie.userToken);
    }, []);

    function handleLogout(){
        cookie.clearAllCookies()
        router.push('/')
    }

    return(
        <header className={styles.mainWrapper}>
            <picture>
                <EventNoteIcon style={{color:"#fff", fontSize:"2rem"}} />
            </picture>
            {!token && 
            <div className={styles.btnWrapper}>
                <Button text="Login" isPrimaryBtn={isLogin ? false : true} handleClick={()=>setIsLoggin(true)}/>
                <Button text="SignUp"  isPrimaryBtn={isLogin ? true : false} handleClick={()=>setIsLoggin(false)}/>
            </div>}
            {token && <div className={styles.btnWrapper}>
                <Button text="Logout"  handleClick={()=>handleLogout()} customStyle={styles.logoutBtn}/>
            </div>}
        </header>
    )
}