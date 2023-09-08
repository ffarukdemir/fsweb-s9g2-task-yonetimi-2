import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const tasksCopy = [...tasks];
    const ilgiliTask = tasksCopy.filter((t) => t.id === id)[0];
    ilgiliTask.status = "yapıldı";
    setTasks(tasksCopy);

    toast.success(`Tebrikler! "${ilgiliTask.title}" tamamlandı!`);
  }

  return (
    <div className="h-screen flex">
      <div
        className="bg-white flex-[0_0_360px] overflow-auto border-r-[#f3d4b0] border-r border-solid;
"
      >
        <div
          className="pt-8 pb-6 px-8 border-b-[#ddd] border-b border-solid;
"
        >
          <h2 className="text-2xl pb-2">Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div
          className="pt-8 pb-6 px-8 border-b-[#ddd] border-b border-solid;
"
        >
          <h2 className="text-2xl pb-2">Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div
        className="flex-1 flex justify-center flex-wrap gap-8 overflow-auto pt-8 pb-6 px-8;
"
      >
        <div className="flex-1 min-w-[240px] max-w-[360px]">
          <h2 className="text-2xl pl-3">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="flex-1 min-w-[240px] max-w-[360px]">
          <h2 className="text-2xl pl-3">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
