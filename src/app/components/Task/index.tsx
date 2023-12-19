'use client'

import { PropsInputTask } from "@/type";
import { useEffect, useState } from "react";


export default function Task({ children, pomodoroNumber, completedTask, id, allProps, setProps, setIsNewTask, isNewTask, setCurrentCycles, currentCycles }:PropsInputTask){

    let idProcurado = id;


    useEffect(() =>{ 

            if(allProps[0].id === idProcurado){
                if(currentCycles === pomodoroNumber){
                    setIsNewTask(true)
                        // Item que você deseja remover
                    let itemParaRemover = id;

                    // Remove o item usando filter
                    const listaDeItens = allProps.filter(item => item.id !== itemParaRemover);
                    
                    // Armazena item concluído
                    const saveCompletedTask = allProps.filter(item => item.id === itemParaRemover);
                    
                    setProps(listaDeItens)
                    completedTask(saveCompletedTask);
                    return setCurrentCycles(0);

                } else if(!isNewTask){
                    setCurrentCycles(currentCycles)
            } 
        }
    },[currentCycles,setCurrentCycles,allProps,isNewTask,setIsNewTask]);



    return(
        <div id={id} className=" flex items-center justify-between p-5 bg-slate-100 mt-5 mb-2 m-auto md:w-[500px] w-[100%] h-14">
            <div className="flex gap-2">
                <img src={currentCycles === pomodoroNumber ? "./check_fill.png" : "./check_out.png"} alt="chek outline" width={30} />
                <p>{children}</p>
            </div>
             <p>{ allProps[0].id === idProcurado ? currentCycles : 0}/{pomodoroNumber}</p>
        </div>
    )
}