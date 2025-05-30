"use client";

import { ClipLoader } from "react-spinners";

import SelectOptionPayment from "@/app/components/SelectOptionPayment";
import StepBack from "@/app/components/StepBack";
import { FireBasePayment } from "@/app/lib/all_interfaces";
import { formatPrice, getDate, getTime } from "@/app/lib/functionsClient";
import { GetAdminPayment } from "@/app/lib/functionsServer";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const AdminPaymentId = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const cachedProducts =
    queryClient.getQueryData<FireBasePayment[]>(["admin_orders"]) || [];
  const cachedProduct = cachedProducts.find((item) => item.id === id);
  const directCachedProduct = queryClient.getQueryData<FireBasePayment>([
    "admin_orders",
    id,
  ]);

  const initialProductData = directCachedProduct || cachedProduct;

  const {
    data: foundData = initialProductData,
    error,
    isLoading,
  } = useQuery<FireBasePayment | undefined>({
    queryKey: ["admin_orders", id],
    queryFn: () => GetAdminPayment(id),
    enabled: !initialProductData,
  });

  return (
    <>
      <div className=" ">
        {isLoading && (
          <ClipLoader size={20} color={"#000000"} loading={isLoading} />
        )}

        {foundData && (
          <>
            <div className="flex flex-row justify-between items-center">
              <h2>Detail objednávky</h2>
              <StepBack />
            </div>

            <br />
            <h5>Osobné údaje</h5>
            <p>id: {foundData.id}</p>
            <p>Meno a Priezvisko: {foundData.name}</p>
            <p>Email: {foundData.email}</p>
            <p>Telefónné číslo: {foundData.telephone_number}</p>
            <br />

            {foundData.note != "" && (
              <>
                <h5>Poznámka</h5>
                <p>{foundData.note}</p>
                <br />
              </>
            )}

            <h5>Dodacie / kontaktné údaje</h5>
            <p>{foundData.city}</p>
            <p>{foundData.street}</p>
            <p>{foundData.psc}</p>
            <p>{foundData.country}</p>
            <br />

            {foundData.invoice_ico && (
              <>
                <h5>Fakturačné údaje</h5>
                <p>{foundData.invoice_name}</p>
                <p>{foundData.invoice_city}</p>
                <p>{foundData.invoice_street}</p>
                <p>{foundData.invoice_psc}</p>
                <p>{foundData.invoice_country}</p>
                <p>Názov spoločnosti: {foundData.invoice_company}</p>
                <p>IČO:{foundData.invoice_ico}</p>
                <p>DIČ:{foundData.invoice_dic}</p>
                <p>IČ: DPH{foundData.invoice_icdph}</p>
                <br />
              </>
            )}

            <h5>Kuriér </h5>
            <p>{foundData.type_transport}</p>
            <br />

            {foundData.packeta_address && (
              <div className="">
                <h5>Packeta - Výdajné miesto Z-Box:</h5>
                <p>{foundData.packeta_address.name}</p>
                <p>
                  {foundData.packeta_address.street},{" "}
                  {foundData.packeta_address.city}
                </p>
                <p>{foundData.packeta_address.zip}</p>
                <br />
              </div>
            )}

            <h5>Čas objednávky</h5>
            <p>Dátum: {getDate(foundData.createdAt)}</p>
            <p>Čas: {getTime(foundData.createdAt)}</p>
            <br />

            <h5>Typ platby</h5>
            <p>{foundData.type_payment}</p>
            <br />

            <h5>Objednané produkty</h5>
            {foundData.products.map((product, index) => (
              <div key={index} className="flex flex-row">
                <p>{product.product_name} - </p>
                <p>{product.quantity} ks - </p>
                {product.discount ? (
                  <div className="flex flex-row items-center gap-4 pl-2">
                    <p className="font-bold">
                      {formatPrice(product.price_discount)} €
                    </p>

                    <p className="line-through">
                      {formatPrice(product.price)} €
                    </p>
                  </div>
                ) : (
                  <p>{formatPrice(product.price)} €</p>
                )}
              </div>
            ))}
            <br />
            <h5>Cena: {foundData.price}€</h5>
            <br />
            <h5>Stav objednávky</h5>
            <SelectOptionPayment id={foundData.id} value={foundData.state} />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default AdminPaymentId;
