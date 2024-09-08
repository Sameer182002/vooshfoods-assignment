'use client';
import styles from "./board.module.css";
import { useEffect, useState } from "react";
import SectionWiseBoard from "@/components/sections/section-wise-board/section-wise-board";
import getAllTaskApi from "@/apis/taskApis/getAllTask";
import { TASK_STATUSES } from "@/utils/constants";
import updateTaskApi from "@/apis/taskApis/updateTask";

export default function Board({
    isUpdated,
    setIsUpdated
}) {
    const [tasks, setTasks] = useState({
        pending: [],
        completed: [],
        inProgress: []
    });

    const [dragTask, setDragTask] = useState(null);

    async function handleDragAndDrop(status) {
        if (!dragTask) return;
        console.log(dragTask)
        const data = await updateTaskApi({
            ...dragTask,
            status
        })
        setIsUpdated(data?.updatedAt)
        setDragTask(null); 
    }

    async function getTasks(){
        try{
            const data = await getAllTaskApi()
            setTasks(data)
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        getTasks();
    },[isUpdated])

    

    return (
        <>
            <div></div>
            <div className={styles.boardsWrapper}>
                    <SectionWiseBoard
                        title="To Do"
                        status= {TASK_STATUSES.pending}
                        data={tasks?.pending}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
                    <SectionWiseBoard
                        title="In Progress"
                        status={TASK_STATUSES.inProgress}
                        data={tasks?.inProgress}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
                    <SectionWiseBoard
                        title="Done"
                        status={TASK_STATUSES.completed}
                        data={tasks?.completed}
                        handleDragAndDrop={handleDragAndDrop}
                        setDragTask={setDragTask}
                        setIsUpdated = {setIsUpdated}
                    />
            </div>
        </>
    );
}
