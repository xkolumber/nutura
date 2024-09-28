import StepBack from "@/app/components/StepBack";
import { FireBasePayment } from "@/app/lib/all_interfaces";
import { getDate, getTime } from "@/app/lib/functionsClient";

interface Props {
  data_payment: FireBasePayment;
}

const AdminInitializePayment = ({ data_payment }: Props) => {
  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <h2>Detail objednávky</h2>
          <StepBack />
        </div>

        <br />

        <h5>Číslo objednávky</h5>
        <p>{data_payment.number_order}</p>

        <br />
        <h5>Obchod</h5>
        <p>Symbiom</p>

        <br />
        <h5>Osobné údaje</h5>
        <p>id: {data_payment.id}</p>
        <p>Meno a Priezvisko: {data_payment.name}</p>
        <p>Email: {data_payment.email}</p>
        <p>Telefónné číslo: {data_payment.telephone_number}</p>
        <br />

        <h5>Poznámka</h5>
        <p>{data_payment.note}</p>
        <br />

        <h5>Dodacie údaje</h5>
        <p>{data_payment.city}</p>
        <p>{data_payment.street}</p>
        <p>{data_payment.psc}</p>
        <p>{data_payment.country}</p>
        <br />

        <h5>Fakturačné údaje</h5>
        <p>{data_payment.invoice_name}</p>
        <p>{data_payment.invoice_city}</p>
        <p>{data_payment.invoice_street}</p>
        <p>{data_payment.invoice_psc}</p>
        <p>{data_payment.invoice_country}</p>
        <p>Názov spoločnosti: {data_payment.invoice_company}</p>
        <p>IČO:{data_payment.invoice_ico}</p>
        <p>DIČ:{data_payment.invoice_dic}</p>
        <p>IČ: DPH{data_payment.invoice_icdph}</p>
        <br />

        <h5>Čas objednávky</h5>
        <p>Dátum: {getDate(data_payment.createdAt)}</p>
        <p>Čas: {getTime(data_payment.createdAt)}</p>
        <br />

        <h5>Typ objednávky</h5>
        <p>{data_payment.type_payment}</p>
        <br />

        <h5>Objednané produkty</h5>
        {data_payment.products.map((product, index) => (
          <div key={index} className="flex flex-row">
            <p>{product.product_name} - </p>
            <p>{product.quantity} ks - </p>

            <p> {product.price} €</p>
          </div>
        ))}
        <br />
        <h5>Cena: {data_payment.price}€</h5>
        <br />
      </div>
    </>
  );
};

export default AdminInitializePayment;
