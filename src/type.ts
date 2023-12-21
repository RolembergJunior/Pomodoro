
export interface Props{
    defaultPomodoroTimer: number,
    shortRestTime: number,
    longRestTime: number,
    cycles: number
}

export  interface PropsTasks {
    name: string; 
    id: string ; 
    numberPomodoros: number; 
}

export interface PropsInputTask{
    children: string,
    pomodoroNumber: number,
    completedTask: Function,
    id:string,
    allTasks: PropsTasks[],
    setAllTasks: (e:PropsTasks[]) => void,
    setIsNewTask: (e:boolean) => void,
    isNewTask: Boolean,
    setCurrentCycles: (e:number) => void,
    currentCycles: number
}

export interface InputTaskProps{
    onSave: (e:PropsTasks) => void,
    setCloseInput: (e:boolean) => void
}