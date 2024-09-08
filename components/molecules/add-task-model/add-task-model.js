import DialogModel from "@/components/organisms/dialog/dialog-model"
import styles from "./add-task-model.module.css"
import CloseIcon from '@mui/icons-material/Close';
import Button from "@/components/atoms/button/button";
import { useState } from "react";

export default function OpenTaskModel({
    isOpen = false,
    setIsOpen = ()=>{},
    errorMsg='',
    setErrorMsg = ()=>{},
    handleSubmit = ()=>{},
    title = '',
    description ='',
    heading = '',
    isViewing = false
}){
    const [taskDetails, setTaskDetails] = useState({
        title,
        description
    })

    function handleChange(key,value){
        if(isViewing) return
        setErrorMsg('')
        setTaskDetails({
            ...taskDetails,
            [key] : value
        })
    }


    return (
        <DialogModel isOpen={isOpen}>
            <div className={styles.mainWrapper}>
                <p className={styles.heading}>{heading || "Add Task"}</p>
                <input
                    type="text"
                    placeholder="Enter Title"
                    className={styles.input}
                    onChange={(e)=>handleChange("title",e.target.value)}
                    value={taskDetails.title}
                    disabled = {isViewing}
                />
                <input
                    type="text"
                    placeholder="Enter Description"
                    className={styles.input}
                    onChange={(e)=>handleChange("description",e.target.value)}
                    value={taskDetails.description}
                    disabled = {isViewing}
                />
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <div className={styles.btnWrapper}>
                    {!isViewing && <Button text={heading ? "Save" :"Add Task"} customStyle={styles.addTaskBtn} handleClick={()=>handleSubmit(taskDetails)}/>}
                    <Button text="Cancel" handleClick={()=>setIsOpen(false)} isPrimaryBtn={false}/>
                </div>
            </div>
        </DialogModel>
    )
}