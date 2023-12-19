'use client'

export default function AddTask({ setOpenInput, openInput }:any){

    return(
        <div className="flex justify-center md:justify-start">
            <button onClick={() => setOpenInput(true)}>
                Criar Tarefa
            </button>
        </div>
    )
}