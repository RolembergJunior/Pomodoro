import PomooroTimer from "./components/pomodoro-timer"

export default function Home(): JSX.Element {
  return (
    <body>
      <PomooroTimer 
        defaultPomodoroTimer={5} 
        shortRestTime={5} 
        longRestTime={5} 
        cycles={2}
      />
    </body>
  )
}
