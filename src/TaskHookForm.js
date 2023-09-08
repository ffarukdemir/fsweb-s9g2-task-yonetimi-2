import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  function mySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    toast.success(data.title + " başarıyla eklendi");
    reset({
      title: "",
      description: "",
      deadline: "",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="form-line">
        <label className="text-sm block pb-1.5" htmlFor="title">
          Başlık
        </label>
        <input
          className="block w-full border text-sm leading-normal p-[5px] rounded-[3px] border-solid border-[#ccc];
        "
          {...register("title", { required: "Task başlığı yazmalısınız" })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && (
          <p className="text-xs text-[rgb(230,43,43)] pt-[3px]">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <label className="text-sm block pb-1.5" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="block w-full border text-sm leading-normal p-[5px] rounded-[3px] border-solid border-[#ccc]; "
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter içermelidir",
            },
          })}
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className="text-xs text-[rgb(230,43,43)] pt-[3px]">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <label className="text-sm block pb-1.5">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label
              className="text-sm border inline-flex items-center cursor-pointer mr-2 mb-2 pl-1 pr-2 py-1.5 rounded-[3px] border-solid border-[#ccc];
            "
              key={p}
            >
              <input
                {...register("people", {
                  required: "Lütfen en az 1 kişi seçin",
                  validate: {
                    maxKisi: (value) =>
                      value.length < 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="text-xs text-[rgb(230,43,43)] pt-[3px]">
            {errors.people.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <label className="text-sm block pb-1.5" htmlFor="deadline">
          Son teslim
        </label>
        <input
          className="block w-full border text-sm leading-normal p-[5px] rounded-[3px] border-solid border-[#ccc];
        "
          {...register("deadline", {
            required: "Son teslim tarihi seçmelisiniz",
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className="text-xs text-[rgb(230,43,43)] pt-[3px]">
            {errors.deadline.message}
          </p>
        )}
      </div>

      <div className="form-line">
        <button
          className="block w-full bg-[#fecc91] text-[rgba(0,0,0,0.6)] cursor-pointer shadow-[0_4px_5px_0_rgb(0_0_0_/_5%)] px-4 py-3 rounded-[3px] border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none;
"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
