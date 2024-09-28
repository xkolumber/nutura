import React from "react";
import Image from "next/image";

import Link from "next/link";
import StepBack from "./StepBack";
import { FireBasePayment } from "../lib/all_interfaces";
import { getDate, getTime } from "../lib/functionsClient";

interface Props {
  data: FireBasePayment[];
}

const AdminInitializePayments = ({ data }: Props) => {
  return (
    <div>
      <StepBack />
      <h2 className="mb-8">Inicializované platby</h2>
      {data.length > 0 ? (
        <table className="admin_section_real">
          <thead>
            <tr className="bg-tertiary">
              <th className="text-left">Objednávka</th>

              <th className="text-left">Čas</th>
              <th className="hidden md:block text-left">Meno, adresa</th>
              <th className="hidden md:grid  col-span-2">Tovar</th>
              <th className="hidden md:block text-right">Cena</th>
              <th className="text-right">Info</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment, index) => (
              <tr key={index} className="pt-4 pb-4 md:pt-0 md:pb-0">
                <td className="flex flex-col">
                  <p>{payment.number_order}</p>
                  <p className="font-medium">{payment.state}</p>
                </td>
                <td className="text-left">
                  {getDate(payment.createdAt)}, {getTime(payment.createdAt)}
                </td>

                {/* <div className="w-full hidden md:flex justify-start"> */}
                <td className="flex-col flex">
                  <p>{payment.name}</p>
                  <p>{payment.city}</p>
                  <p>{payment.street}</p>
                  <p>{payment.psc}</p>
                  <p>{payment.country}</p>
                </td>
                {/* </div> */}
                {payment.products && (
                  <td className="hidden md:grid col-span-2 ml-20 2xl:ml-28 3xl:ml-36">
                    {payment.products.map((product, index) => (
                      <div key={index} className="flex flex-row justify-start">
                        <p>{product.product_name}-</p>
                        <p>{product.quantity}ks-</p>

                        <p>{product.price}€</p>
                      </div>
                    ))}
                  </td>
                )}

                <td className="hidden md:flex justify-end w-full">
                  <p className="">{payment.price} €</p>
                </td>

                <td className="text-right">
                  <Link
                    href={`/admin/inicializovane-platby/${payment.id} `}
                    className="underline cursor-pointer"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5>Nenáchádzajú sa tu žiadne nezaplatené objednávky.</h5>
      )}
    </div>
  );
};

export default AdminInitializePayments;
