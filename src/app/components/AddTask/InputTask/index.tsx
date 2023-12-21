'use client'

import {  useState } from "react"
import { v4 as uuidv4 } from '../../../../../node_modules/uuid';
import { PropsTasks, InputTaskProps } from "@/type";


export default function InputTask({ onSave, setCloseInput }:InputTaskProps) {
    const [saveText, setSaveText] = useState('');
    const [saveNumberPomodoros, setSaveNumberPomodoros] = useState<Number>(0);
    const [inputedTask, setinputedTask] = useState<PropsTasks>({} as PropsTasks)

    function setSave( e:string ){
            setSaveText(e)
    }

    function setNumber(e:React.ChangeEvent<HTMLInputElement>){

        if(parseInt(e.target.value) < 0){
            return null
        }
        const newNumber = parseInt(e.target.value)

        setSaveNumberPomodoros(newNumber);
        
        setinputedTask({...inputedTask, name: saveText, numberPomodoros: newNumber, id: uuidv4()});

    }


    return(
        <div className="text-end bg-slate-400 p-6 w-[100%] xl:w-[700px] m-auto rounded-xl">
            <div className="flex justify-center items-center">
                <input className="w-[500px] h-14 p-4 rounded-md mr-1 border-solid" onChange={(e) => setSave(e.target.value)} type="text" placeholder="Tarefa"/>
                    <div>
                        <input className="text-center w-14 h-14 rounded-md border-solid" value={saveNumberPomodoros.toString()} type="number" onChange={(e) => setNumber(e)} />
                    </div>      
            </div>
            <div>
                
            </div>
            <div>
                <button type="reset" onClick={ () =>  setCloseInput(false)} className="bg-red-700 h-16 rounded-lg mr-3">Cancelar</button>
                <button type="submit" onClick={() => onSave(inputedTask)} className="h-16 rounded-lg">Salvar</button>
            </div>
        </div>
       
    )
}