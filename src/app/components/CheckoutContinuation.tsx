"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import CheckboxCircle from "./Icons/CheckboxCircle";
import CheckboxCircle2 from "./Icons/CheckBoxCircle2";
import InputCircle from "./InputCircle";

import useCartStore, { CartItem } from "../counter/store";
import { DataState, ShopSectionProduct } from "../lib/all_interfaces";
import { getLastNumberOrder } from "../lib/functionsServer";
import {
  checkIfDiscountFirebase,
  getBackgroundFirebase,
  getPhotoFromFirebase,
  getPriceDoprava,
  getPriceFirebase,
  getPriceFirebaseTruePrice,
  getSlugFromFirebase,
  getTitleFromFirebase,
  getTypePayment,
} from "../lib/functionsClient";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import IconMinus from "./Icons/IconMinus";
import IconPlus from "./Icons/IconPlus";

interface Props {
  products: ShopSectionProduct[];
  cart: CartItem[];
  changeTrue: () => void;
}

interface PacketaWidget {
  pick(
    apiKey: string,
    callback: (point: any) => void,
    options: any,
    inElement: HTMLElement
  ): void;
}

declare const Packeta: { Widget: PacketaWidget };

const CheckoutContinuation = ({ products, cart, changeTrue }: Props) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseFromCart = useCartStore((state) => state.decreaseFromCart);

  const [selectedPickupPoint, setSelectedPickupPoint] = useState<any>(null);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [fullName2, setFullName2] = useState("");
  const [invoiceData, setInvoiceData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [couponCode, setCouponCode] = useState(0);
  const [priceDoprava, setPriceDoprava] = useState(0);
  const [isDobierka, setIsDobierka] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [stockError, setStockError] = useState(false);
  const [finalPrice, setFinalPrice] = useState("");
  const [buttonHovered, setButtonHovered] = useState(false);
  const [loadingElement, setLoadingElement] = useState(false);
  const [customerData, setCustomerData] = useState<DataState>({
    agreement: false,
    city: "",
    country: "",
    email: "",
    invoice_name: "",
    invoice_company: "",
    invoice_ico: "",
    invoice_dic: "",
    invoice_icdph: "",
    invoice_street: "",
    invoice_city: "",
    invoice_psc: "",
    invoice_country: "",
    name: "",
    orderItems: products,
    note: "",
    packeta_address: null,
    price: finalPrice,
    price_transport: 0,
    products: JSON.parse(localStorage.getItem("cart_nutura") || "[]"),
    psc: "",
    street: "",
    telephone_number: "",
    type_payment: "",
    type_transport: "",
  });
  const [typeTransport, setTypeTransport] = useState("");

  const isValidName = (fullName: string) => {
    const [firstName, lastName] = fullName.split(" ");
    return firstName && lastName;
  };
  const handleNextStep = (e: any) => {
    e.preventDefault();
    if (
      customerData.psc.length < 5 ||
      (customerData.invoice_psc.length < 5 && customerData.invoice_psc !== "")
    ) {
      toast.error("PSČ má nesprávny tvar");
      return;
    }
    if (customerData.telephone_number.length < 7) {
      toast.error("Telefónne číslo má málo čísel");
      return;
    }
    if (
      customerData.street.length < 3 ||
      (customerData.invoice_street.length < 3 &&
        customerData.invoice_street !== "")
    ) {
      toast.error("Ulica má málo znakov");
      return;
    }
    if (
      customerData.city.length < 3 ||
      (customerData.invoice_city.length < 3 && customerData.invoice_city !== "")
    ) {
      toast.error("Mesto má málo znakov");
      return;
    }
    if (
      customerData.country.length < 4 ||
      (customerData.invoice_country.length < 3 &&
        customerData.invoice_country !== "")
    ) {
      toast.error("Krajina má málo znakov");
      return;
    }

    if (
      customerData.invoice_ico.length < 8 &&
      customerData.invoice_ico !== ""
    ) {
      toast.error("IČO má málo znakov");
      return;
    }
    if (
      customerData.invoice_dic.length < 10 &&
      customerData.invoice_dic !== ""
    ) {
      toast.error("DIČ má málo znakov");
      return;
    }

    if (
      customerData.invoice_company.length < 3 &&
      customerData.invoice_company !== ""
    ) {
      toast.error("Názov spoločnosti má málo znakov");
      return;
    }

    if (fullName2.length > 0) {
      if (isValidName(fullName) && isValidName(fullName2)) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.error("Meno a priezvisko nie je v správnom tvare");
      }
    } else {
      if (isValidName(fullName)) {
        setCurrentStep(currentStep + 1);
      } else {
        toast.error("Meno a priezvisko nie je v správnom tvare");
      }
    }
  };

  console.log(customerData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "name") {
      setFullName(value);
    }
    if (name === "invoice_name") {
      setFullName2(value);
    }

    if (name === "checkbox_") {
      setInvoiceData((prevValue) => !prevValue);
    }
  };

  const handleSelectDoprava = (
    doprava_price: number,
    type_tranposrt: string
  ) => {
    setTypeTransport(type_tranposrt);
    setPriceDoprava(doprava_price);

    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      price_transport: doprava_price,
      type_transport: type_tranposrt,
    }));

    if (type_tranposrt === "Packeta - Výdajné miesto Z-Box") {
      openPacketaWidget();
    } else {
      setSelectedPickupPoint(null);
      setCustomerData((prevCustomerData) => ({
        ...prevCustomerData,
        packeta_address: null,
      }));
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: FieldValues, e: any) => {
    e.preventDefault();

    if (priceDoprava === 0) {
      toast.error("Vyberte si spôsob dopravy.");
      setIsLoading(false);
      return;
    }

    if (selectedPayment === "") {
      toast.error("Zvoľte typ platby");
      setIsLoading(false);
      return;
    }

    if (!checked1) {
      toast.error("K zahájeniu objednávky je potrebný súhlas.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    const number_order = await getLastNumberOrder();
    const date_time = new Date().getTime();

    if (selectedPayment === "platba_kartou") {
      setIsLoading(true);
      try {
        const response = await fetch("/api/comgate-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            data: customerData,
            number_order: number_order,
          }),
        });

        if (response.ok) {
          const responseData = await response.text();
          const TransIdMatch = responseData.match(/transId=([^&]+)/);
          const transId = TransIdMatch ? TransIdMatch[1] : null;

          const params = responseData.split("&");
          const paramObject: { [key: string]: string } = {};

          params.forEach((param) => {
            const [key, value] = param.split("=");
            paramObject[key] = decodeURIComponent(value);
          });

          const redirectUrl = paramObject["redirect"];

          const response_data = await fetch("/api/firebase-send-payment-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
              date_time: date_time,
              number_order: number_order,
              status: "initialize",
              id_comgate: transId,
            }),
          });

          if (redirectUrl && response_data.ok) {
            window.location.href = decodeURIComponent(redirectUrl);
          } else {
            toast.error("Niekde nastala chyba, neváhajte nás kontaktovať!");
            console.error("Redirect URL not found in response");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (
      selectedPayment === "dobierka" ||
      selectedPayment === "prevod_na_ucet"
    ) {
      try {
        const response = await fetch("/api/email-after-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: customerData,
            number_order: number_order,
          }),
        });

        if (response.ok) {
          try {
            const response = await fetch("/api/firebase-send-payment-data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: customerData,
                date_time: date_time,
                number_order: number_order,
                status: "paid",
                id_comgate: "null",
              }),
            });
            if (response.ok) {
              console.log("Data sent successfully!");
              setIsLoading(false);
              window.location.href = "/uspesna-platba";
            } else {
              console.error("Failed to add data");
            }
          } catch (error) {
            console.error("Error sending data:", error);
          }
        } else {
          console.error("Failed to send email");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setIsLoading(false);
      }
    }
  };

  const paymentForm = (payment_form: string) => {
    setSelectedPayment(payment_form);

    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      type_payment: payment_form,
    }));

    {
      payment_form === "dobierka" ? setIsDobierka(true) : setIsDobierka(false);
    }
  };

  const handleAgreement1 = () => {
    setChecked1((prevState) => !prevState);
  };

  const handleAgreement2 = () => {
    setChecked2((prevState) => !prevState);

    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      agreement: !checked2,
    }));
  };

  const getAllPrice = () => {
    let price = priceDoprava;
    {
      cart.map((item) => {
        const productPrice = getPriceFirebaseTruePrice(products, item.id);
        if (productPrice !== null) {
          price += item.quantity * parseFloat(productPrice);
        }
      });
    }

    if (couponCode > 0) {
      price *= 1 - couponCode / 100;
    }
    if (isDobierka) {
      price += 2;
    }

    return price.toFixed(2);
  };

  useEffect(() => {
    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      price: getAllPrice(),
    }));
  }, [cart, products, typeTransport, isDobierka, couponCode]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://hd.widget.packeta.com/www/js/library.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPacketaWidget = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();

    const apiKey = process.env.NEXT_PUBLIC_API_PACKETA_CLIENT!;
    const carrierId = 80;
    const country = "cz,sk";

    setLoadingElement(true);
    setIsWidgetOpen(true);

    setTimeout(() => {
      const containerElement = document.getElementById(
        "packeta-widget-container"
      );
      if (containerElement && typeof Packeta !== "undefined") {
        try {
          Packeta.Widget.pick(
            apiKey,
            (point: any) => {
              setSelectedPickupPoint(point);
              setIsWidgetOpen(false);

              setCustomerData((prevCustomerData) => ({
                ...prevCustomerData,
                packeta_address: point,
              }));
            },
            {
              carrierId: carrierId,
              country: country,
            },
            containerElement
          );
        } catch (error) {
          console.error("Error initializing Packeta widget:", error);
          setIsWidgetOpen(false);
        } finally {
          setLoadingElement(false);
        }
      } else {
        console.error("Packeta widget container not found.");
        setIsWidgetOpen(false);
      }
    }, 100);
  };

  const goToProduct = (products: ShopSectionProduct[], id: string) => {
    const slug = getSlugFromFirebase(products, id);
    router.push(`/obchod/produkt/${slug}`);
  };

  const increaseQuantity = (id: string, quantity: number) => {
    addToCart({ id, quantity });
    changeTrue();
  };

  const decreaseQuantity = (id: string) => {
    decreaseFromCart(id);
    changeTrue();
  };

  return (
    <div>
      <h1 className="uppercase md:mb-8">Objednávka</h1>
      {isWidgetOpen && (
        <div className="relative">
          <div
            id="packeta-widget-container"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              backgroundColor: "white",
            }}
          ></div>
        </div>
      )}

      {loadingElement && (
        <div
          className=""
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 10000,
            backgroundColor: "white",
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 z-[888]"
            style={{
              transform: "translate(-50%, -50%)",
            }}
          >
            <ClipLoader size={60} color={"#000000"} loading={true} />
          </div>
        </div>
      )}
      <div className="flex flex-col  gap-8 w-full">
        <Toaster />
        {currentStep === 1 && (
          <form className="w-full" onSubmit={handleNextStep}>
            <div className="dots_with_line mt-8 md:mt-0">
              <span className="dot active"></span>
              {/* <span className="dot"></span> */}
              <span className="dot"></span>
            </div>

            <div className="md:hidden">
              <div className="flex flex-row w-full justify-between mb-8">
                <div className="flex flex-col w-[33%]">
                  <p className="text-left md:text-center ">Kontaktné</p>
                  <p className="text-left md:text-center ">a dodacie údaje</p>
                </div>

                {/* <p className="text-center opacity-60 w-[33%] ">
                  <p className="text-center ">Spôsob</p>
                  <p className="text-center ">dopravy</p>
                </p> */}
                <div className="flex flex-col text-right opacity-60 w-[33%]">
                  <p className=" ">Platba</p>
                </div>
              </div>
            </div>
            {/*pc */}
            <div className="hidden md:block">
              <div className="flex flex-row w-full justify-between mb-8">
                <p className="text-left  w-[33%]  ">
                  Kontaktné a dodacie údaje
                </p>

                <p className="text-right opacity-60  w-[33%] ">Platba</p>
              </div>
            </div>

            <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna">
              <h5 className="mb-4 md:mb-12 text-primary font-normal">
                Kontaktné a dodacie údaje
              </h5>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2">
                  <label>*Meno a priezvisko</label>
                  <input
                    type="text"
                    name="name"
                    value={customerData.name}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label>*Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerData.email}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2">
                  <label>*Telefónne číslo</label>
                  <input
                    type="text"
                    name="telephone_number"
                    value={customerData.telephone_number}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label>*Ulica o.č</label>
                  <input
                    type="text"
                    name="street"
                    value={customerData.street}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2">
                  <label>*Mesto</label>
                  <input
                    type="text"
                    name="city"
                    value={customerData.city}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label>*PSČ</label>
                  <input
                    type="text"
                    name="psc"
                    value={customerData.psc}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2">
                  <label>*Krajina</label>
                  <input
                    type="text"
                    name="country"
                    value={customerData.country}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label>Poznámka k objednávke</label>
                  <input
                    type="text"
                    name="note"
                    value={customerData.note}
                    className="mb-4 3xl:mb-12"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2 flex flex-row gap-4 items-center ">
                  <label className="!text-white !mb-0">
                    Pridať fakturačné údaje
                  </label>
                  <input
                    type="checkbox"
                    name="checkbox_"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {invoiceData && (
                <>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="w-full md:w-1/2">
                      <label>Meno a priezvisko</label>
                      <input
                        type="text"
                        name="invoice_name"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label>*Názov spoločnosti</label>
                      <input
                        type="text"
                        name="invoice_company"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="w-full md:w-1/2">
                      <label>*IČO</label>
                      <input
                        type="text"
                        name="invoice_ico"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-1/2">
                      <div className="w-full md:w-1/2">
                        <label>*DIČ</label>
                        <input
                          type="text"
                          name="invoice_dic"
                          className="mb-4 3xl:mb-12"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="w-full md:w-1/2">
                        <label>IČ DPH</label>
                        <input
                          type="text"
                          name="invoice_icdph"
                          className="mb-4 3xl:mb-12"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="w-full md:w-1/2">
                      <label>*Ulica</label>
                      <input
                        type="text"
                        name="invoice_street"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label>*Mesto</label>
                      <input
                        type="text"
                        name="invoice_city"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    <div className="w-full md:w-1/2">
                      <label>*PSČ</label>
                      <input
                        type="text"
                        name="invoice_psc"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label>*Krajina</label>
                      <input
                        type="text"
                        name="invoice_country"
                        className="mb-4 3xl:mb-12"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-row items-center gap-8">
                <button className="btn btn--secondary" type="submit">
                  Pokračovať
                </button>

                <Link className="  underline" href={"/obchod"}>
                  <p className="  !text-primary underline">
                    Vrátiť sa do E-shopu
                  </p>
                </Link>
              </div>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="">
              <div className="dots_with_line mt-8 md:mt-0">
                <span className="dot " />

                <span className="dot active" />
              </div>

              <div className="md:hidden">
                <div className="flex flex-row w-full justify-between mb-8">
                  <div className="flex flex-col opacity-60  w-[33%]">
                    <p className="text-left md:text-center ">Kontaktné</p>
                    <p className="text-left md:text-center ">a dodacie údaje</p>
                  </div>

                  <div className="flex flex-col text-right  w-[33%]">
                    <p className=" ">Platba</p>
                  </div>
                </div>
              </div>
              {/*pc */}
              <div className="hidden md:block">
                <div className="flex flex-row w-full justify-between mb-8">
                  <p className="opacity-60 w-[33%]">
                    Kontaktné a dodacie údaje
                  </p>

                  <p className="text-right  w-[33%]">Platba</p>
                </div>
              </div>

              <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna">
                <h5 className="mb-4 text-primary">Kontrola a platba</h5>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-full md:w-1/2">
                    <label>*Meno a priezvisko</label>
                    <input
                      type="text"
                      name="name"
                      value={customerData.name}
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label>*Email</label>
                    <input
                      type="email"
                      name="email"
                      className="mb-4 3xl:mb-12"
                      value={customerData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-full md:w-1/2">
                    <label>*Telefónne číslo</label>
                    <input
                      type="text"
                      name="telephone_number"
                      className="mb-4 3xl:mb-12"
                      value={customerData.telephone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label>*Ulica o.č</label>
                    <input
                      type="text"
                      name="street"
                      value={customerData.street}
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-full md:w-1/2">
                    <label>*Mesto</label>
                    <input
                      type="text"
                      name="city"
                      value={customerData.city}
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label>*PSČ</label>
                    <input
                      type="text"
                      name="psc"
                      value={customerData.psc}
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-full md:w-1/2">
                    <label>*Krajina</label>
                    <input
                      type="text"
                      name="country"
                      value={customerData.country}
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label>Poznámka k objednávke</label>
                    <input
                      type="text"
                      name="note"
                      className="mb-4 3xl:mb-12"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 md:gap-8 mt-8">
                  <div className="w-full">
                    <label>Doprava</label>

                    <div
                      className="relative cursor-pointer"
                      onClick={() =>
                        handleSelectDoprava(3.3, "Slovenská pošta")
                      }
                    >
                      <InputCircle
                        selected={typeTransport}
                        paymentOption="Slovenská pošta"
                      />
                      <input
                        type="text"
                        name="name"
                        className="mb-4 !pl-16 cursor-pointer"
                        value="Slovenská pošta"
                        required
                        readOnly
                      />
                      <span className="text_inside_input">3.30 €</span>
                    </div>

                    <div
                      className="relative cursor-pointer"
                      onClick={() =>
                        handleSelectDoprava(
                          3.6,
                          "Packeta - Výdajné miesto Z-Box"
                        )
                      }
                    >
                      <InputCircle
                        selected={typeTransport}
                        paymentOption="Packeta - Výdajné miesto Z-Box"
                      />
                      <input
                        type="text"
                        name="name"
                        className="mb-4 !pl-16 cursor-pointer"
                        value="Packeta - Výdajné miesto Z-Box"
                        required
                        readOnly
                      />
                      <span className="text_inside_input">3.60 €</span>
                    </div>

                    <div
                      className="relative cursor-pointer"
                      onClick={() =>
                        handleSelectDoprava(5, "Packeta - Doručenie na adresu")
                      }
                    >
                      <InputCircle
                        selected={typeTransport}
                        paymentOption="Packeta - Doručenie na adresu"
                      />
                      <input
                        type="text"
                        name="name"
                        className="mb-4 !pl-16 cursor-pointer"
                        value="Packeta - Doručenie na adresu"
                        required
                        readOnly
                      />
                      <span className="text_inside_input">5.00 €</span>
                    </div>
                  </div>
                  {selectedPickupPoint && (
                    <div className="">
                      <label>Výdajné miesto</label>
                      <p className="text-primary">{selectedPickupPoint.name}</p>
                      <p className="text-primary">
                        {selectedPickupPoint.street}, {selectedPickupPoint.city}
                      </p>
                      <p className="text-primary">{selectedPickupPoint.zip}</p>
                    </div>
                  )}

                  <div className="w-full flex flex-col ">
                    <label>Možnosti platby</label>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div
                        className="relative cursor-pointer"
                        onClick={() => paymentForm("platba_kartou")}
                      >
                        <InputCircle
                          selected={selectedPayment}
                          paymentOption="platba_kartou"
                        />
                        <input
                          type="text"
                          name="name"
                          className="mb-4 !pl-16 cursor-pointer"
                          value="Platba kartou"
                          readOnly
                          required
                        />
                      </div>

                      {typeTransport != "Packeta - Výdajné miesto Z-Box" && (
                        <div
                          className="relative cursor-pointer"
                          onClick={() => paymentForm("prevod_na_ucet")}
                        >
                          <InputCircle
                            selected={selectedPayment}
                            paymentOption="prevod_na_ucet"
                          />
                          <input
                            type="text"
                            name="name"
                            className="mb-4 !pl-16 cursor-pointer"
                            value=" Prevodom na účet"
                            required
                            readOnly
                          />
                        </div>
                      )}

                      {typeTransport != "Packeta - Výdajné miesto Z-Box" && (
                        <div
                          className="relative cursor-pointer"
                          onClick={() => paymentForm("dobierka")}
                        >
                          <InputCircle
                            selected={selectedPayment}
                            paymentOption="dobierka"
                          />
                          <input
                            type="text"
                            name="name"
                            className="mb-4 !pl-16 cursor-pointer"
                            value="Dobierka (2.00 €)"
                            required
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row gap-4 mt-8">
                  <div onClick={handleAgreement1}>
                    <CheckboxCircle isChecked={checked1} />
                  </div>

                  <span className="!text-white !mb-0">
                    Súhlasím s{" "}
                    <Link href={"/obchodne-podmienky"} className="underline">
                      obchodnými podmienkami a podmienkami o ochrane súkromia
                    </Link>
                  </span>
                </div>
                <div className="w-full flex flex-row gap-4 mt-8">
                  <div onClick={handleAgreement2}>
                    <CheckboxCircle2 isChecked={checked2} />
                  </div>
                  <span className="!text-white !mb-0">
                    Súhlasím so spracovaním mojich osobných údajov (meno,
                    emailová adresa, telefónne číslo) predávajúcemu Enmery
                    s.r.o. na marketingové účely. Vyjadrenie súhlasu je
                    dobrovoľné.
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-4 mt-4 justify-center md:justify-start">
                <Image
                  src={"/mastercard.svg"}
                  alt="comgate logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/visa.svg"}
                  alt="comgate logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/apple-pay.svg"}
                  alt="comgate logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/google-pay.svg"}
                  alt="comgate logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/comgate.svg"}
                  alt="comgate logo"
                  width={100}
                  height={100}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <button
                className={`btn btn--secondary uppercase !max-w-none w-full md:!max-w-fit md:min-w-[22rem] xl:h-[50px] ${
                  isLoading && "cursor-none"
                }`}
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
              >
                {isLoading ? (
                  <ClipLoader size={20} color={"#000000"} loading={isLoading} />
                ) : (
                  "Objednať s povinnosťou platby"
                )}
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-col md:flex-row mt-8 gap-16">
          <div className="flex flex-col md:w-1/2">
            <h4>Sumár objednávky</h4>

            <div className="flex flex-row items-center justify-between w-full border-b border-b-secondary pt-4 pb-4">
              <h6 className="font-light">Doprava</h6>
              <p>{priceDoprava === 0 ? "-" : `${priceDoprava.toFixed(2)} €`}</p>
            </div>
            <div className="flex flex-row items-center justify-between w-full border-b border-b-secondary pt-4 pb-4">
              <h6 className="font-light">
                Typ platby{" "}
                {selectedPayment === "" ? "" : getTypePayment(selectedPayment)}
              </h6>
              <p>
                {selectedPayment === ""
                  ? "-"
                  : getPriceDoprava(selectedPayment)}
              </p>
            </div>

            <div className="flex flex-row items-center justify-between mb-8 gap-4 pt-2 pb-2 w-full">
              <h5>Spolu</h5>
              <h5 className="">{getAllPrice()} € s DPH</h5>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-1/2">
            {cart.map((item, index) => {
              return (
                <div
                  className="flex flex-row bg-[#B6BEA7] p-4 rounded-[6px]  gap-4 md:h-[140px]  3xl:h-[160px]"
                  key={index}
                >
                  <div className="flex flex-col items-center bg-fifthtiary rounded-xl max-w-[100px] 3xl:max-w-[150px]  w-full h-full justify-center relative ">
                    <Image
                      src={getBackgroundFirebase(products, item.id)}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 20vw, (max-width: 1200px) 20px, 40px"
                      priority={true}
                      quality={100}
                      className={`absolute w-full h-full object-cover transition-opacity z-10 ease-in cursor-pointer `}
                      alt="Produktový obrázok"
                      onClick={() => goToProduct(products, item.id)}
                    />
                    <Image
                      src={getPhotoFromFirebase(products, item.id)}
                      width={500}
                      height={500}
                      sizes="(max-width: 768px) 20vw, (max-width: 1200px) 20px, 40px"
                      priority={true}
                      quality={100}
                      className="w-full h-[100px]  object-contain z-[1000]  cursor-pointer "
                      alt="Produktový obrázok"
                      onClick={() => goToProduct(products, item.id)}
                    />
                  </div>

                  <div className="flex flex-col w-full justify-between">
                    <p className=" text-black  uppercase font-bold">
                      {getTitleFromFirebase(products, item.id)}
                    </p>

                    <div className="flex flex-col justify-between ">
                      <p className="uppercase font-medium">Počet kusov</p>
                      {/* <div className="flex flex-row items-center gap-4 ">
                        <div className="border border-secondary  3xl:pt-1 3xl:pb-1 pl-[1.5rem] pr-[1.5rem] rounded-[32px] text-secondary">
                          {item.quantity}
                        </div>
                      </div> */}
                      <div className="flex flex-row items-center gap-4 ">
                        <div
                          className="cursor-pointer"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <IconMinus />
                        </div>

                        <div className="border border-secondary  3xl:pt-1 3xl:pb-1 pl-[1.5rem] pr-[1.5rem] rounded-[32px] text-secondary">
                          {item.quantity}
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => increaseQuantity(item.id, 1)}
                        >
                          <IconPlus />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      {" "}
                      {products ? (
                        <>
                          {checkIfDiscountFirebase(products, item.id) ? (
                            <div className="flex flex-row items-center gap-4">
                              <p className="font-bold">
                                {getPriceFirebaseTruePrice(products, item.id)} €
                              </p>

                              <p className="line-through">
                                {getPriceFirebase(products, item.id)} €
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="font-bold">
                                {getPriceFirebase(products, item.id)} €
                              </p>
                            </>
                          )}
                        </>
                      ) : (
                        <Skeleton count={1} />
                      )}{" "}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContinuation;
