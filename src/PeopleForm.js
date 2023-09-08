import React, { useState } from "react";

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState("");

  function handleIsimChange(e) {
    setIsim(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitFn(isim);
    setIsim("");
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="title">
          İsim
        </label>
        <input
          className="block w-full border text-sm leading-normal p-[5px] rounded-[3px] border-solid border-[#ccc];
          "
          id="title"
          name="title"
          type="text"
          onChange={handleIsimChange}
          value={isim}
        />
        {kisiler.includes(isim) && (
          <p className="text-xs text-[rgb(230,43,43)] pt-[3px]">
            Bu isim daha önce eklenmiş
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          className="block w-full bg-[#fecc91] text-[rgba(0,0,0,0.6)] cursor-pointer shadow-[0_4px_5px_0_rgb(0_0_0_/_5%)] px-4 py-3 rounded-[3px] border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none;
"
          type="submit"
          disabled={isim.length === 0 || kisiler.includes(isim)}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
