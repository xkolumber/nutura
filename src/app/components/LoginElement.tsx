"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../auth/Provider";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { doRevalidate } from "../lib/functionsServer";

const LoginElement = () => {
  const router = useRouter();
  const { user, login, logout, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      await login(data.email, data.password);
      toast.success("Prihlásenie bolo úspešné");
      doRevalidate("/admin");
      //   router.push("/admin");
    } catch (err) {
      toast.error("Meno alebo heslo sú nesprávne");
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8  pt-56 pb-56">
      <Toaster />
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
            className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            {isLoading ? (
              <ClipLoader
                size={20}
                color={"#32a8a0 mt-4 mb-4"}
                loading={isLoading}
              />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginElement;
