"use client";
import React, { useEffect, useState } from "react";
import { EshopBasicProducts } from "./HomePageProducts";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import InputCircle from "./InputCircle";
import CheckboxCircle from "./CheckboxCircle";
import CheckboxCircle2 from "./CheckBoxCircle2";

import { CartItem } from "../counter/store";
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebase/config";

interface Props {
  products: EshopBasicProducts[];
  cart: CartItem[];
}

const CheckoutContinuation = ({ products, cart }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [fullName2, setFullName2] = useState("");
  const [invoiceData, setInvoiceData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [couponCode, setCouponCode] = useState(0);
  const [priceDoprava, setPriceDoprava] = useState(4);
  const [isDobierka, setIsDobierka] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("platba_kartou");
  const [finalPrice, setFinalPrice] = useState("");
  const [customerData, setCustomerData] = useState({
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
    price: finalPrice,
    products: JSON.parse(localStorage.getItem("cart_nutura") || "[]"),
    psc: "",
    street: "",
    telephone_number: "",
    type_payment: "platba_kartou",
  });

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

  const getLastNumberOrder = async () => {
    try {
      const db = getFirestore(auth.app);
      const numberCollectionRef = collection(db, "cislo_poslednej_objednavky");

      const querySnapshot = await getDocs(numberCollectionRef);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { cislo_objednavky: increment(1) });

        const updatedDocSnapshot = await getDoc(docRef);
        const updatedDocData = updatedDocSnapshot.data();
        const cisloObjednavky = updatedDocData!.cislo_objednavky;
        return cisloObjednavky;
      } else {
        throw new Error("Number document not found");
      }
    } catch (error) {
      console.error("Error fetching order number:", error);
      throw error;
    }
  };

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: FieldValues) => {
    if (!checked1) {
      toast.error("K zahájeniu objednávky je potrebný súhlas.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const number_order = await getLastNumberOrder();
    const date_time = new Date().getTime();

    // if (selectedPayment === "platba_kartou") {
    //   setIsLoading(true);
    //   try {
    //     sessionStorage.setItem("customerData", JSON.stringify(customerData));
    //     sessionStorage.setItem("number_order", number_order);
    //     const response = await fetch("/api/comgate-payment", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/x-www-form-urlencoded",
    //       },
    //       body: JSON.stringify({
    //         data: customerData,
    //         number_order: number_order,
    //       }),
    //     });

    //     if (response.ok) {
    //       console.log("Payment initiation successful");
    //       const responseData = await response.text();

    //       const params = responseData.split("&");

    //       const paramObject: { [key: string]: string } = {};

    //       params.forEach((param) => {
    //         const [key, value] = param.split("=");
    //         paramObject[key] = decodeURIComponent(value);
    //       });

    //       const redirectUrl = paramObject["redirect"];
    //       if (redirectUrl) {
    //         window.location.href = decodeURIComponent(redirectUrl);
    //       } else {
    //         console.error("Redirect URL not found in response");
    //       }
    //     } else {
    //       console.error("Failed to initiate payment");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // if (
    //   selectedPayment === "dobierka" ||
    //   selectedPayment === "prevod_na_ucet"
    // ) {
    //   try {
    //     const response = await fetch("/api/email-after-payment", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         data: customerData,
    //         number_order: number_order,
    //       }),
    //     });

    //     if (response.ok) {
    //       localStorage.removeItem("cart2");
    //       console.log("Email sent successfully!");

    //       try {
    //         const response = await fetch("/api/firebase-send-payment-data", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             data: customerData,
    //             date_time: date_time,
    //             number_order: number_order,
    //           }),
    //         });
    //         if (response.ok) {
    //           // localStorage.removeItem("cart2");
    //           console.log("Data sent successfully!");
    //           setIsLoading(false);
    //           window.location.href = "/uspesna_platba";
    //         } else {
    //           console.error("Failed to add data");
    //         }
    //       } catch (error) {
    //         console.error("Error sending data:", error);
    //       }
    //     } else {
    //       console.error("Failed to send email");
    //       setIsLoading(false);
    //     }
    //   } catch (error) {
    //     console.error("Error sending email:", error);
    //     setIsLoading(false);
    //   }
    // }
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
    let price = 0;
    {
      cart.map((item) => {
        const productPrice = getPriceFirebase(item.id);
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

    const decimalCount =
      price % 1 !== 0 ? price.toString().split(".")[1]?.length : 0;
    return decimalCount === 1 ? price.toFixed(2) : price.toFixed(2);
  };

  useEffect(() => {
    setFinalPrice(getAllPrice());
  }, [cart, products]);

  useEffect(() => {
    setFinalPrice(getAllPrice());
  }, [isDobierka, couponCode]);

  console.log(finalPrice);

  console.log(customerData);

  const getPriceFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.cena.toString() : "";
  };

  const getBackgroundFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.produkt_pozadie : "";
  };

  const getPhotoFromFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.produkt_foto : "";
  };
  const getTitleFromFirebase = (id: string): string => {
    const product = products.find((item) => item.id === id);
    return product ? product.nazov : "";
  };

  return (
    <div>
      <h1>Objednávka</h1>
      <div className="flex flex-col xl:flex-row gap-8 w-full">
        <Toaster />
        {currentStep === 1 && (
          <form className="w-full" onSubmit={handleNextStep}>
            <div className="flex flex-row w-full justify-between mb-8">
              <p className="font-medium text-center text-fifthtiary ">
                1. Dodacie údaje
              </p>
              <p className="text-center ">2. Spôsob doručenia</p>
              <p className="text-center ">3. Kontrola a platba</p>
            </div>
            <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna">
              <h5 className="mb-4 md:mb-12 text-secondary">
                Kontaktné a dodacie údaje
              </h5>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full md:w-1/2">
                  <label>*Meno a priezvisko</label>
                  <input
                    type="text"
                    name="name"
                    // value={fullName}
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
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label>*Ulica o.č</label>
                  <input
                    type="text"
                    name="street"
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
                <Link className=" underline" href={"/eshop"}>
                  <p className="!text-secondary">Vrátiť sa do E-shopu</p>
                </Link>
              </div>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <div className="xl:w-[70%]">
            <div className="flex flex-row w-full justify-between mb-8">
              <p className="text-center cursor-pointer">1. Dodacie údaje</p>
              <p className="font-medium text-center text-fifthtiary cursor-pointer">
                2. Spôsob doručenia
              </p>
              <p className="text-center cursor-pointer">3. Kontrola a platba</p>
            </div>
            <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna">
              <div className="flex flex-col gap-4 md:gap-8">
                <div className="w-full">
                  <label>Kontakt</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className="mb-4 3xl:mb-8"
                    value={customerData.email}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>Doručenie</label>
                  <input
                    type="text"
                    name="email"
                    className="mb-4 3xl:mb-8"
                    value={
                      customerData.street +
                      ", " +
                      customerData.psc +
                      ", " +
                      customerData.country
                    }
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna mt-8">
              <h5 className="mb-4 md:mb-12 text-secondary">Spôsob dopravy</h5>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="w-full">
                  <div className="relative">
                    <InputCircle selected={""} paymentOption="fill" />
                    <input
                      type="text"
                      name="name"
                      className="mb-4 !pl-16"
                      value="DPD (do 20kg)"
                      required
                      disabled
                    />
                    <span className="text_inside_input">4.00€</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-8">
                <button className="btn btn--secondary" onClick={handleNextStep}>
                  Pokračovať
                </button>
                <Link className=" underline" href={"/eshop"}>
                  <p className="!text-u">Vrátiť sa do E-shopu</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="xl:w-[70%]">
            <div className="">
              <div className="flex flex-row w-full justify-between mb-8">
                <p className="text-center ">1. Dodacie údaje</p>
                <p className="text-center ">2. Spôsob doručenia</p>
                <p className="font-medium text-center text-fifthtiary ">
                  3. Kontrola a platba
                </p>
              </div>

              <div className="p-6 xl:p-16 bg-secondary rounded-[20px] text-secondary pokladna">
                <h5 className="mb-4 text-secondary">Kontrola a platba</h5>
                <div className="flex flex-col gap-4 md:gap-8">
                  <div className="w-full">
                    <label>Kontakt</label>
                    <input
                      type="text"
                      name="email"
                      onChange={handleChange}
                      className="mb-4  3xl:mb-12"
                      value={customerData.email}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Doručenie</label>
                    <input
                      type="text"
                      name="dorucenie"
                      className="mb-4 3xl:mb-12"
                      value={
                        customerData.street +
                        ", " +
                        customerData.psc +
                        ", " +
                        customerData.country
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label>Doprava</label>
                    <div className="relative">
                      <InputCircle selected={""} paymentOption="fill" />
                      <input
                        type="text"
                        name="name"
                        className="mb-4 !pl-16"
                        value="DPD (do 20kg)"
                        required
                        disabled
                      />
                      <span className="text_inside_input">4.00€</span>
                    </div>
                  </div>

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
                    emailová adresa, telefónne číslo) predávajúcemu Nutura
                    s.r.o. na marketingové účely. Vyjadrenie súhlasu je
                    dobrovoľné.
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-4 mt-4 justify-center md:justify-start">
                <Image
                  src={"/mastercard.svg"}
                  alt="comgate logo"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/visa.svg"}
                  alt="comgate logo"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/apple-pay.svg"}
                  alt="comgate logo"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/google-pay.svg"}
                  alt="comgate logo"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
                <Image
                  src={"/comgate.svg"}
                  alt="comgate logo"
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <button
                className="btn btn--secondary !max-w-none w-full md:!max-w-fit md:min-w-[22rem]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ClipLoader size={20} color={"#32a8a0"} loading={isLoading} />
                ) : (
                  <p className="text-secondary">
                    Objednať s povinnosťou platby
                  </p>
                )}
              </button>
            </div>
          </form>
        )}

        <h5>Sumár objednávky</h5>
        <div className="grid grid-cols-3 gap-4">
          {cart.map((item, index) => (
            <div
              className="flex flex-row bg-[#B6BEA7] p-2 rounded-[6px]"
              key={index}
            >
              <div className="flex flex-col items-center bg-fifthtiary rounded-xl w-full h-full justify-center relative">
                <Image
                  src={getBackgroundFirebase(item.id)}
                  width={0}
                  height={0}
                  priority={true}
                  quality={100}
                  sizes="100vw"
                  className={`absolute w-full h-full object-cover transition-opacity z-10 ease-in `}
                  alt="Produktový obrázok"
                />
                <Image
                  src={getPhotoFromFirebase(item.id)}
                  width={500}
                  height={500}
                  priority={true}
                  quality={100}
                  className="w-full h-[100px]  object-contain z-[1000] "
                  alt="Produktový obrázok"
                />
              </div>

              <div className="flex flex-col w-full justify-center items-center">
                <div className="flex flex-col">
                  <p className=" text-black pt-4  uppercase font-semibold">
                    {getTitleFromFirebase(item.id)}
                  </p>
                  <p>{getPriceFirebase(item.id)}€</p>

                  <div className="flex flex-row justify-between items-center">
                    <p className="uppercase font-medium">Počet kusov</p>
                    <div className="flex flex-row items-center gap-4  ml-12 md:ml-0 scale-125 md:scale-100">
                      <div className="border border-secondary pt-2 pb-2 pl-8 pr-8 rounded-[32px] text-secondary">
                        {item.quantity}
                      </div>
                      {/* <div
                              className="cursor-pointer"
                              onClick={() => increaseQuantity(item.id, 1)}
                            >
                              <IconPlus />
                            </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h5>{parseFloat(finalPrice) + 4} €</h5>
      </div>
    </div>
  );
};

export default CheckoutContinuation;
