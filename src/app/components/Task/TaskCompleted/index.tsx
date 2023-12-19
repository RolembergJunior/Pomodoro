

export default function TaskCompleted({ numberPomodoros, id, children }){
    return(
        <div id={id} className=" flex items-center justify-between p-5 bg-slate-100 mt-5 mb-2 m-auto  w-[100%] md:w-[500px] h-14">
            <div className="flex gap-2">
                <img src="./check_fill.png" alt="chek outline" width={30} />
                <p>{children}</p>
            </div>
             <p>{ numberPomodoros }/{ numberPomodoros }</p>
        </div>
    )
}