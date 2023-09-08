import React from "react";
import { differenceInDays, differenceInHours } from "date-fns";

const Task = ({ taskObj, onComplete }) => {
  const deadlineDate = new Date(taskObj.deadline);
  const currentDate = new Date();
  const daysDiff = differenceInDays(deadlineDate, currentDate);
  const hoursDiff = differenceInHours(deadlineDate, currentDate);

  let remainingTimeMessage = "";
  let bgColorClass = ""; // Arka plan rengi için sınıf

  if (hoursDiff > 168) {
    remainingTimeMessage = `${daysDiff} gün kaldı`;
    bgColorClass = "bg-[#23CF12]";
  } else if (hoursDiff > 48) {
    remainingTimeMessage = `${daysDiff} gün kaldı`;
    bgColorClass = "bg-[#E78E1D]";
  } else if (hoursDiff > 0) {
    remainingTimeMessage = `${hoursDiff} saat kaldı`;
    bgColorClass = "bg-[#E54513]";
  } else {
    remainingTimeMessage = "Süre doldu";
    bgColorClass = "bg-[#fecc91]";
  }

  return (
    <div
      className={`bg-white leading-normal shadow-[0_4px_5px_0_rgb(0_0_0_/_10%)] mt-4 p-6 rounded-[5px] `}
    >
      <h3 className="text-lg text-[#c8781a]">{taskObj.title}</h3>
      <div className="text-xs pt-1">
        son teslim:{" "}
        <span
          className={`inline-block px-2 py-[3px] rounded-sm ${bgColorClass}`}
        >
          {remainingTimeMessage}
        </span>
      </div>
      <p className=" text-sm text-[#444] pt-2 pb-3 px-0">
        {taskObj.description}
      </p>
      <div>
        {taskObj.people.map((p) => (
          <span
            className="inline-block text-sm border mr-1 mb-1.5 px-3 py-[5px] rounded-[30px] border-solid border-[#ccc];
"
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="block bg-[#fecc91] shadow-[0_4px_5px_0_rgb(0_0_0_/_5%)] cursor-pointer ml-auto px-3 py-2 rounded-[3px] border-0;
        "
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
};

export default Task;
