"use client";
import { useAuth } from "@/app/auth/Provider";
import StepBack from "@/app/components/StepBack";
import { IsLoadingMap, PromoCode } from "@/app/lib/all_interfaces";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { AdminAddPromoCode, AdminDeletePromoCode } from "../../lib/actions";

interface Props {
  promoCodes: PromoCode[];
}

const AdminPromoCodes = ({ promoCodes }: Props) => {
  const { user } = useAuth();
  const [isLoadingMap, setIsLoadingMap] = useState<IsLoadingMap>({});
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsLoadingMap((prevState) => ({
        ...prevState,
        [id]: true,
      }));
      const response = await AdminDeletePromoCode(id);
      if (response === "success") {
        toast.success("Zľavový kód bol odstránený");
      } else {
        toast.error("Niekde nastala chyba.");
      }
    } catch (error) {
      toast.error("Niekde nastala chyba.");
    }
    setIsLoadingMap((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoadingAdd(true);
      const response = await AdminAddPromoCode(data);
      if (response === "success") {
        toast.success("Zľavový kód bol pridaný");
        reset();
      } else {
        toast.error("Niekde nastala chyba.");
      }
    } catch (error) {
      toast.error("Niekde nastala chyba.");
    }
    setIsLoadingAdd(false);
  };

  return (
    <>
      <div className=" ">
        <Toaster />
        {user && (
          <>
            <div className="flex flex-row justify-between items-center">
              <h2>Zľavové kódy</h2>
              <StepBack />
            </div>

            <table className="admin_section_promo_codes mt-8">
              <thead>
                <tr className="bg-tertiary">
                  <th>Kód</th>
                  <th>Zľava v %</th>
                  <th>Odstrániť</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((promo, index) => (
                  <tr key={index}>
                    <td className="text-center  flex items-center justify-center">
                      {promo.kod}
                    </td>
                    <td className="text-center flex items-center justify-center">
                      {promo.zlava}
                    </td>

                    <td className="flex justify-center">
                      <button
                        className="btn btn--secondary"
                        onClick={() => handleDelete(promo.id)}
                        disabled={isLoadingMap[promo.id]}
                      >
                        {isLoadingMap[promo.id] ? (
                          <ClipLoader
                            size={20}
                            color={"#32a8a0"}
                            loading={true}
                          />
                        ) : (
                          "Odstrániť"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h5 className="mt-24 text-black mb-4">Pridať zľavový kód</h5>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[300px] flex flex-col gap-4"
            >
              <div className="flex flex-row items-center justify-between">
                <p>Kód</p>
                <input type="text" className="" {...register("kod")} required />
              </div>
              <div className="flex flex-row items-center justify-between">
                <p>Zľava v %</p>
                <input
                  type="text"
                  className=""
                  {...register("zlava")}
                  required
                />
              </div>
              <button
                className="btn btn--secondary"
                type="submit"
                disabled={isLoadingAdd}
              >
                {isLoadingAdd ? (
                  <ClipLoader size={20} color={"#32a8a0"} loading={true} />
                ) : (
                  "Pridať"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AdminPromoCodes;
