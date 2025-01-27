"use client";
import { auth } from "@/app/firebase/config";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../auth/Provider";
import { FireBasePayment } from "../lib/all_interfaces";
import { categories, getDate, getTime } from "../lib/functionsClient";
import { GetPayments } from "../lib/functionsServer";

interface LastVisibleMap {
  [key: string]: any;
}

const DatabaseSection = () => {
  const { data, error, isLoading } = useQuery<FireBasePayment[]>({
    queryKey: ["admin_orders"],
    queryFn: () => GetPayments(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const { user } = useAuth();
  const [isExpedovana, setIsExpedovana] = useState(false);
  const [isStorno, setIsStorno] = useState(false);

  const [receivedOrders, setReceivedOrders] = useState<FireBasePayment[]>([]);
  const [expedovaneOrders, setExpedovaneOrders] = useState<FireBasePayment[]>(
    []
  );
  const [stornoOrders, setStornoOrders] = useState<FireBasePayment[]>([]);

  const [filteredData, setFilteredData] = useState<FireBasePayment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("prijatá");
  const [perPage] = useState(10);
  const [lastVisibleMap, setLastVisibleMap] = useState<LastVisibleMap>({});

  useEffect(() => {
    if (data) {
      setReceivedOrders(data);
      setFilteredData(data);
    }
  }, [data]);

  const fetchNeededOrders = async (state: string) => {
    try {
      const db = getFirestore(auth.app);
      const q = query(
        collection(db, "nutura_platby"),
        where("state", "==", state),
        orderBy("number_order", "desc"),
        limit(perPage)
      );
      const querySnapshot = await getDocs(q);

      const allData: FireBasePayment[] = [];

      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      setLastVisibleMap((prevLastVisibleMap) => ({
        ...prevLastVisibleMap,
        [state]: newLastVisible,
      }));

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FireBasePayment;
        const order: FireBasePayment = {
          ...data,
          id: doc.id,
        };
        allData.push(order);
      });

      if (state === "expedovaná") {
        setIsExpedovana(true);
        setExpedovaneOrders(allData);
        setFilteredData(allData);
      }

      if (state === "storno") {
        setIsStorno(true);
        setStornoOrders(allData);
        setFilteredData(allData);
      }
    } catch (error) {
      console.error("Error fetching received orders:", error);
    }
  };

  const handleCategoryChange = async (state: string) => {
    setSelectedCategory(state);

    if (state === "expedovaná" && !isExpedovana) {
      await fetchNeededOrders(state);
    } else if (state === "expedovaná" && isExpedovana) {
      setFilteredData(expedovaneOrders);
    } else if (state === "storno" && !isStorno) {
      fetchNeededOrders(state);
    } else if (state === "storno" && isStorno) {
      setFilteredData(stornoOrders);
    } else {
      setFilteredData(receivedOrders);
    }
  };

  const loadMore = async () => {
    try {
      const db = getFirestore(auth.app);
      const q = query(
        collection(db, "nutura_platby"),
        where("state", "==", selectedCategory),
        orderBy("number_order", "desc"),
        startAfter(lastVisibleMap[selectedCategory]),
        limit(perPage)
      );
      const querySnapshot = await getDocs(q);

      setLastVisibleMap((prevLastVisibleMap) => ({
        ...prevLastVisibleMap,
        [selectedCategory]: querySnapshot.docs[querySnapshot.docs.length - 1],
      }));

      {
        !querySnapshot.docs[querySnapshot.docs.length - 1] &&
          toast.error("Neexistujú ďalšie objednávky");
      }

      const newData: FireBasePayment[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as FireBasePayment;
        const order: FireBasePayment = {
          ...data,
          id: doc.id,
        };
        newData.push(order);
      });

      {
        selectedCategory === "prijatá" &&
          setReceivedOrders((prevData) => [...prevData, ...newData]);
      }
      {
        selectedCategory === "storno" &&
          setStornoOrders((prevData) => [...prevData, ...newData]);
      }
      {
        selectedCategory === "expedovaná" &&
          setExpedovaneOrders((prevData) => [...prevData, ...newData]);
      }

      setFilteredData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching received orders:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="">
        <h2 className="mb-8">Databáza platieb</h2>

        <div className="flex flex-row items-center mb-8 gap-8">
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="block  appearance-none bg-primary border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer w-full md:w-auto"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {isLoading && (
          <ClipLoader size={20} color={"#000000"} loading={isLoading} />
        )}
        {error && <p>Chyba pri načítaní dát.</p>}

        {filteredData.length > 0 && (
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
              {filteredData.map((payment, index) => (
                <tr key={index} className="pt-4 pb-4 md:pt-0 md:pb-0">
                  <td className="flex flex-col">
                    <p>{payment.number_order}</p>
                    <p className="font-medium">
                      {" "}
                      {payment.comgate_status === "paid" && "zaplatená"}
                      {payment.comgate_status === "initialize" &&
                        "inicializovaná"}
                      {payment.comgate_status === "storno" && "storno"}
                      {payment.comgate_status === "cancelled" && "zrušená"}
                      {payment.comgate_status === "authorized" &&
                        "autorizovaná"}
                    </p>
                  </td>
                  <td className="text-left">
                    {getDate(payment.createdAt)}, {getTime(payment.createdAt)}
                  </td>

                  <div className="w-full hidden md:flex justify-start">
                    <td className="flex-col flex">
                      <p>{payment.name}</p>
                      <p>{payment.city}</p>
                      <p>{payment.street}</p>
                      <p>{payment.psc}</p>
                      <p>{payment.country}</p>
                    </td>
                  </div>
                  {payment.products && (
                    <td className="hidden md:grid col-span-2 ml-20 2xl:ml-28 3xl:ml-36">
                      {payment.products.map((product, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-start"
                        >
                          <p>{product.product_name}-</p>
                          <p>{product.quantity}ks-</p>
                          <p>{product.price}€</p>
                        </div>
                      ))}
                    </td>
                  )}

                  <div className="hidden md:flex justify-end w-full">
                    <td className="">{payment.price} €</td>
                  </div>

                  <td className="text-right">
                    <Link
                      href={`/admin/platba/${payment.id} `}
                      className="underline cursor-pointer"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {selectedCategory === "expedovaná" && (
          <p
            onClick={loadMore}
            className="text-red-950 font-semibold cursor-pointer"
          >
            Načítať ďalšie objednávky
          </p>
        )}
      </div>
    </>
  );
};

export default DatabaseSection;
