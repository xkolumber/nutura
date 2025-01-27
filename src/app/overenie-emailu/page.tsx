import React from "react";
import AdminLoginElement from "../components/AdminSection/AdminLoginElement";

const Page = () => {
  return (
    <div className="main_section additional_padding m-auto flex justify-center flex-col items-center">
      <h2 className="text-center">Overenie emailu</h2>
      <p className="text-center max-w-[600px]">
        Na Vašu emailovú adresu bol zaslaný potvrdzovací email. Prosíme Vás, aby
        ste si skontrolovali svoju emailovú schránku a klikli na odkaz v emaili
        na potvrdenie Vašej emailovej adresy. Potom sa môžte prihlásiť do nášho
        systému.
      </p>
      <AdminLoginElement />
    </div>
  );
};

export default Page;
