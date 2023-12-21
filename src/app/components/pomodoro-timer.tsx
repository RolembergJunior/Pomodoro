'use client'
import { Props, PropsTasks } from "@/type";
import '../style.css'
import { useEffect, useState, useCallback, Children } from "react";
import { useInterval } from "../hooks/use-interval";
import Button from "./Button";
import Timer from "./Timer";
import secondsToTime from "../utils/secondsToTime";
import InputTask from "./AddTask/InputTask";
import AddTask from "./AddTask";
import Task from "./Task";
import TaskCompleted from "./Task/TaskCompleted";



export default function PomooroTimer(props:Props): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer)
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtManager, setCyclesQtManager] = useState(new Array(props.cycles - 1).fill(true));
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] =useState(0);
    const [isOpenInput, setisOpenInput] = useState<Boolean>(false);
    const [allTasks, setallTasks] = useState<PropsTasks[]>([]);
    const [allTasksCompleted, setAllTasksCompleted] = useState< PropsTasks[] >([]);
    const [isNewTask, setIsNewTask] = useState<Boolean>(false)
    const [currencyCycles, setCurrencyCycles]  = useState(0)

    useInterval(() => {
        setMainTime(mainTime - 1)
        if(working) setFullWorkingTime(fullWorkingTime + 1);
    }, timeCounting ? 1000 : null)



    const configureWorking = useCallback(() =>{
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.defaultPomodoroTimer);
        setIsNewTask(false)
    },[
    setTimeCounting,
    setWorking,
    setResting,
    setMainTime
    ])
    
    function configureRest(long:boolean){
        setWorking(false)
        setTimeCounting(true)
        setResting(true)

        if(long){
            setMainTime(props.longRestTime)
        } else {
            setMainTime(props.shortRestTime)
        }
    }


    useEffect(() =>{

        if(working){
            document.body.classList.add('working')
        } else{
            document.body.classList.remove('working')
        }

        if(mainTime > 0) return;

        if(working && cyclesQtManager.length > 0) {
            configureRest(false);
            cyclesQtManager.pop();
        } else if(working && cyclesQtManager.length <= 0) {
            configureRest(true);
            setCyclesQtManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1)
            setCurrencyCycles(currencyCycles +  1)
        }

        if(working) setNumberOfPomodoros(numberOfPomodoros + 1)
        if(resting) configureWorking()

    }, [
    working,
    resting,
    mainTime,
    cyclesQtManager,
    numberOfPomodoros,
    completedCycles,
    configureRest,
    setCyclesQtManager,
    props.cycles,
    configureWorking
    ])

    function handleOnSave( props:PropsTasks ){  
        setallTasks([...allTasks, props])

        setisOpenInput(false)
    }

    function completedTask(taskCompleted: PropsTasks[]){
        setTimeCounting(false);


        let concatArrays:PropsTasks[] = [...allTasksCompleted, ...taskCompleted ]

        setAllTasksCompleted(concatArrays)

    }

    return(
        <div className="pomodoro">
            <h1>Você está: { working ? 'Trabalhando' : 'Descansando'}</h1>
            <Timer seconds={mainTime} />
            <div className="controls gap-1">
                <Button text="Trabalhar" onclick={() => configureWorking()}/>
                <Button text="Descansar" onclick={() => configureRest()}/>
                <Button  classname={!working && !resting ? 'hidden' : ''} text={timeCounting ? 'Pause' : 'Play'} onclick={() => setTimeCounting(!timeCounting)} />
            </div>
            <p>Ciclos concluídos: {completedCycles}</p>
            <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
            <p>Pomodoros concluídos: {numberOfPomodoros}</p>
            <AddTask 
                setOpenInput={setisOpenInput} 
                openInput={isOpenInput}
            />
            { isOpenInput ? <InputTask setCloseInput={setisOpenInput}  onSave={handleOnSave} /> : null }
            <div>
                { allTasks.map( (task, index) => (
                <Task 
                key={index} 
                id={task.id} 
                setCurrentCycles={setCurrencyCycles} 
                currentCycles={currencyCycles} 
                setIsNewTask={setIsNewTask} 
                isNewTask={isNewTask} 
                setAllTasks={setallTasks} 
                allTasks={allTasks} 
                completedTask={completedTask} 
                pomodoroNumber={task.numberPomodoros}>
                    { task.name }
                </Task>
                ))}
            </div>
            <div>
                <h1 className="mt-5">TASKS COMPLETADAS</h1>
                { allTasksCompleted === undefined ? null : allTasksCompleted.map( (task, index) =>(
                    <TaskCompleted key={index} id={task.id} numberPomodoros={task.numberPomodoros} >{task.name}</TaskCompleted>
                ))}
            </div>
        </div>
    )
}