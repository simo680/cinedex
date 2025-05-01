import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Modal from "../../Modal";
import OpenEyeIcon from "../../../assets/open-eye.svg?react";
import CloseEyeIcon from "../../../assets/close-eye.svg?react";
import supabase from "../../../services/supabase/supabase";

const AuthModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isRegister, setIsRegister] = useState(false);
  const [visible, setVisible] = useState(true);

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: data.email,
            password: data.password,
          });

        if (signUpError) throw signUpError;

        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: signUpData.user.id,
            username: data.username,
          },
        ]);

        if (profileError) throw profileError;

        onClose();
      } else {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          });

        if (signInError) throw signInError;

        onClose();
      }
    } catch (error) {
      alert("Ошибка: " + error.message);
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isRegister && (
          <div>
            <label htmlFor="username" className="mb-2.5 block font-semibold">
              Логин
            </label>
            <input
              id="username"
              type="text"
              placeholder="Введите свой логин"
              {...register("username", {
                required: "Введите имя",
                pattern: {
                  value: /^[a-zA-Z0-9_-]{3,15}$/,
                  message: "Имя должно содержать только буквы и цифры",
                },
              })}
              className={clsx(
                "w-full rounded border px-4 py-2 focus:outline-none",
                errors.password
                  ? "border-[var(--accent)] bg-[var(--accent)]/40"
                  : "border-[var(--primary)]",
              )}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-2.5 block font-semibold">
            Почта
          </label>
          <input
            id="email"
            type="email"
            placeholder="Введите почту"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value:
                  /^(?=.{1,254}$)(?=^[^@\s]{1,64}@)[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            })}
            className={clsx(
              "w-full rounded border px-4 py-2 focus:outline-none",
              errors.password
                ? "border-[var(--accent)] bg-[var(--accent)]/40"
                : "border-[var(--primary)]",
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-2.5 block font-semibold">
            Пароль
          </label>
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              id="password"
              placeholder="Введите пароль"
              {...register("password", {
                required: "Введите пароль",
                pattern: {
                  value: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})$/,
                  message:
                    "Пароль должен содержать минимум 6 символов, включая хотя бы одну заглавную букву, одну строчную букву и одну цифру.",
                },
              })}
              className={clsx(
                "w-full rounded border px-4 py-2 focus:outline-none",
                errors.password
                  ? "border-[var(--accent)] bg-[var(--accent)]/40"
                  : "border-[var(--primary)]",
              )}
            />

            <div
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              onClick={() => setVisible(() => setVisible(!visible))}
            >
              {visible ? (
                <OpenEyeIcon className="h-[20px] w-[20px]" />
              ) : (
                <CloseEyeIcon className="h-[20px] w-[20px]" />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="hover:bg-[var(--accent)]-700 w-full cursor-pointer rounded bg-[var(--accent)] py-2"
        >
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
      <div className="flex items-center justify-center gap-1 text-center">
        <p className="mt-4 text-center text-sm opacity-50">
          {isRegister ? "Уже есть аккаунт?" : "У вас нет аккаунта?"}
        </p>
        <p className="mt-4 text-center text-sm">
          <button
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
            className="cursor-pointer underline"
          >
            {isRegister ? "Войдите" : "Зарегистрируйтесь"}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;
