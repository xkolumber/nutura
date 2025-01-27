"use client";
import { useAuth } from "@/app/auth/Provider";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const AdminLoginElement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithGmail } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await login(data.email, data.password);

      if (response === "neovereny-mail") {
        window.location.href = `/overenie-emailu?email=${data.email}`;
      }
      setData({
        ...data,
        email: "",
        password: "",
      });
      window.location.href = "/admin";
    } catch (err: any) {
      const errorMessage = err?.message || "An unknown error occurred";
      console.error("Login error:", errorMessage);

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams) {
      const search_email = searchParams.get("email");
      if (search_email) {
        setData({
          ...data,
          email: search_email,
        });
      }
    }
  }, [searchParams]);

  return (
    <>
      <Toaster />
      <form
        action=""
        onSubmit={handleLogin}
        className="flex flex-col justify-center registration w-full max-w-[400px] "
      >
        <p className="font-bold mt-8 mb-1">Emailová adresa *</p>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          placeholder="Zadajte váš email"
          required
          className="border border-gray-300 rounded-md p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 ease-in-out hover:border-gray-400 placeholder-gray-400"
        />

        <div className="flex flex-row justify-between mt-4 mb-1">
          <p className="font-bold ">Heslo *</p>
        </div>

        <input
          type="password"
          name="password"
          onChange={(e: any) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          placeholder="Heslo"
          value={data.password}
          required
          className="border border-gray-300 rounded-md p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 ease-in-out hover:border-gray-400 placeholder-gray-400"
        />

        <button
          className={`btn btn--secondary !mt-8 !max-w-none ${
            (isLoading || data.email === "" || data.password === "") &&
            "disabledPrimaryBtn"
          } `}
          type="submit"
          disabled={isLoading || data.email === "" || data.password === ""}
        >
          {isLoading ? (
            <ClipLoader
              size={20}
              color={"#00000"}
              loading={isLoading}
              className="ml-16 mr-16"
            />
          ) : (
            <p className="text-black font-semibold hover:text-black ">
              Prihlásiť sa
            </p>
          )}
        </button>
      </form>
    </>
  );
};

export default AdminLoginElement;
