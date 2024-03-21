import React from "react";

const HomePageContactUs = () => {
  return (
    <div className="border tight_section border-secondary contact_us rounded-[20px]  flex flex-col justify-center items-center mb-16">
      <h1 className="mb-8 md:mb-12">Napíšte nám</h1>
      <p className="uppercase font-bold">Meno a priezvisko</p>
      <input type="text" className="" placeholder="..." />
      <p className="uppercase font-bold">e-mail</p>
      <input type="text" className="" placeholder="..." />
      <p className="uppercase font-bold">Telefónne číslo</p>
      <input type="text" className="" placeholder="..." />
      <p className="uppercase font-bold">Správa</p>
      <textarea cols={50} rows={10} className="" placeholder="..." />
      <button className=" btn btn--fourthtiary">Odoslať</button>
    </div>
  );
};

export default HomePageContactUs;
