"use client";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface FormData {
  name: string;
  email: string;
  message: string;
  tel_number: string;
}

const HomePageContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,

          email: data.email,
          tel_number: data.tel_number,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (result.status === 200) {
        reset();
        toast.success("Správa bola úspešne odoslaná");
        console.log("Email sent successfully!");
        setIsLoading(false);
      } else {
        toast.error("Oops, niečo sa pokazilo. Neváhajte nás kontaktovať.");
        console.error("Failed to send email");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="mb-16 section_space">
      <form
        className="border tight_section border-secondary contact_us rounded-[20px]  flex flex-col justify-center items-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <Toaster />
        <h1 className="mb-8 md:mb-12">Napíšte nám</h1>
        <p className="uppercase font-bold">Meno a priezvisko</p>
        <input
          type="text"
          className=""
          placeholder="..."
          {...register("name")}
          required
        />
        <p className="uppercase font-bold">e-mail</p>
        <input
          type="text"
          className=""
          placeholder="..."
          {...register("email")}
          required
        />
        <p className="uppercase font-bold">Telefónne číslo</p>
        <input
          type="text"
          className=""
          placeholder="..."
          {...register("tel_number")}
          required
        />
        <p className="uppercase font-bold">Správa</p>
        <textarea
          cols={50}
          rows={10}
          className=""
          placeholder="..."
          {...register("message")}
          required
        />

        <button
          className={`btn btn--fourthtiary min-w-[10rem] ${
            isLoading && "disabledBtn"
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader
              size={20}
              color={"#ffffff"}
              loading={isLoading}
              className="ml-12 mr-12 mt-2 mb-2"
            />
          ) : (
            "Odoslať"
          )}
        </button>
      </form>
    </div>
  );
};

export default HomePageContactUs;
