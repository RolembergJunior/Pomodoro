
export interface Props{
    defaultPomodoroTimer: number,
    shortRestTime: number,
    longRestTime: number,
    cycles: number
}

export  interface ArrayPropsTasks {
    name: string; id: string; numberPomodoros: number
}

export interface PropsInputTask{
    children: string,
    pomodoroNumber: number,
    completedTask: Function,
    id:string,
    allProps: ArrayPropsTasks[],
    setProps: (e:ArrayPropsTasks[]) => void,
    setIsNewTask: (e:boolean) => void,
    isNewTask: Boolean,
    setCurrentCycles: (e:number) => void,
    currentCycles: number
}

export interface InputTaskProps{
    onSave: (e:ArrayPropsTasks) => void,
    setCloseInput: (e:boolean) => void
}