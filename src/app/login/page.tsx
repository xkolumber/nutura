"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../auth/Provider";

const Login = () => {
  const router = useRouter();
  const { user, login, logout, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      router.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  pt-56 pb-56">
      <h1 className="text-center my-3">Login</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm  justify-center items-center">
        <form onSubmit={handleLogin} className="">
          <div className="mb-3">
            <label className="block font-medium leading-6 text-gray-900">
              Email
            </label>

            <input
              onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email}
              required
              type="email"
              placeholder="Vložte email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset  focus:ring-black"
            />
          </div>

          <div className="mb-3">
            <label className="block font-medium leading-6 text-gray-900">
              Heslo
            </label>
            <input
              onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password}
              required
              type="password"
              placeholder="Vložte heslo"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset  focus:ring-black"
            />
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
