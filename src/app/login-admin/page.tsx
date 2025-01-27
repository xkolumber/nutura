import React from "react";
import AdminLoginElement from "../components/AdminSection/AdminLoginElement";

const Page = () => {
  return (
    <div className="min-h-screen m-auto flex justify-center items-center flex-col !pt-24">
      <div className="border border-black p-16 lg:p-32 rounded-[8px] m-6 w-full max-w-[350px] md:max-w-[500px]">
        <h4 className="pb-4 text-center">Admin prihlásenie</h4>
        <AdminLoginElement />
      </div>
    </div>
  );
};

export default Page;
