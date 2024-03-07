"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../auth/Provider";
import { auth } from "@/app/firebase/config";
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
import toast, { Toaster } from "react-hot-toast";

interface LastVisibleMap {
  [key: string]: any;
}

const DatabaseSection = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpedovana, setIsExpedovana] = useState(false);
  const [isStorno, setIsStorno] = useState(false);

  //   const [receivedOrders, setReceivedOrders] = useState<FireBasePayment[]>([]);
  //   const [expedovaneOrders, setExpedovaneOrders] = useState<FireBasePayment[]>(
  //     []
  //   );
  //   const [stornoOrders, setStornoOrders] = useState<FireBasePayment[]>([]);

  //   const [filteredData, setFilteredData] = useState<FireBasePayment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("prijatá");
  const [perPage] = useState(10);
  const [lastVisibleMap, setLastVisibleMap] = useState<LastVisibleMap>({});

  //   useEffect(() => {
  //     const fetchReceivedOrders = async () => {
  //       try {
  //         const db = getFirestore(auth.app);
  //         const q = query(
  //           collection(db, "platby"),
  //           where("state", "==", "prijatá"),
  //           orderBy("number_order", "desc")
  //         );
  //         const querySnapshot = await getDocs(q);

  //         const newLastVisible =
  //           querySnapshot.docs[querySnapshot.docs.length - 1];

  //         setLastVisibleMap((prevLastVisibleMap) => ({
  //           ...prevLastVisibleMap,
  //           [selectedCategory]: newLastVisible,
  //         }));

  //         const receivedOrders: FireBasePayment[] = [];

  //         querySnapshot.forEach((doc) => {
  //           const data = doc.data() as FireBasePayment;
  //           const order: FireBasePayment = {
  //             ...data,
  //             id: doc.id,
  //           };
  //           receivedOrders.push(order);
  //         });

  //         setReceivedOrders(receivedOrders);

  //         setFilteredData(receivedOrders);
  //       } catch (error) {
  //         console.error("Error fetching received orders:", error);
  //       }
  //     };

  //     fetchReceivedOrders();
  //   }, []);

  const getDate = (time: string) => {
    const createdAtDate = new Date(time);

    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1;
    const year = createdAtDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  const getTime = (time: string) => {
    const createdAtDate = new Date(time);
    const hour = createdAtDate.getHours().toString().padStart(2, "0");
    const minute = createdAtDate.getMinutes().toString().padStart(2, "0");
    const second = createdAtDate.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hour}:${minute}:${second}`;
    return formattedTime;
  };

  const categories = ["prijatá", "expedovaná", "storno"];

  //   const fetchNeededOrders = async (state: string) => {
  //     try {
  //       const db = getFirestore(auth.app);
  //       const q = query(
  //         collection(db, "platby"),
  //         where("state", "==", state),
  //         orderBy("number_order", "desc"),
  //         limit(perPage)
  //       );
  //       const querySnapshot = await getDocs(q);

  //       const allData: FireBasePayment[] = [];

  //       const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  //       setLastVisibleMap((prevLastVisibleMap) => ({
  //         ...prevLastVisibleMap,
  //         [state]: newLastVisible,
  //       }));

  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data() as FireBasePayment;
  //         const order: FireBasePayment = {
  //           ...data,
  //           id: doc.id,
  //         };
  //         allData.push(order);
  //       });

  //       {
  //         state === "expedovaná" && (
  //           <>
  //             {setIsExpedovana(true)}
  //             {setExpedovaneOrders(allData)}
  //             {setFilteredData(allData)}
  //           </>
  //         );
  //       }
  //       {
  //         state === "storno" && (
  //           <>
  //             {setIsStorno(true)}
  //             {setStornoOrders(allData)}
  //             {setFilteredData(allData)}
  //           </>
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching received orders:", error);
  //     }
  //   };

  const handleCategoryChange = async (state: string) => {
    setSelectedCategory(state);

    //   if (state === "expedovaná" && !isExpedovana) {
    //     await fetchNeededOrders(state);
    //   } else if (state === "expedovaná" && isExpedovana) {
    //     setFilteredData(expedovaneOrders);
    //   } else if (state === "storno" && !isStorno) {
    //     fetchNeededOrders(state);
    //   } else if (state === "storno" && isStorno) {
    //     setFilteredData(stornoOrders);
    //   } else {
    //     setFilteredData(receivedOrders);
    //   }
  };

  //   const loadMore = async () => {
  //     try {
  //       const db = getFirestore(auth.app);
  //       const q = query(
  //         collection(db, "platby"),
  //         where("state", "==", selectedCategory),
  //         orderBy("number_order", "desc"),
  //         startAfter(lastVisibleMap[selectedCategory]),
  //         limit(perPage)
  //       );
  //       const querySnapshot = await getDocs(q);

  //       setLastVisibleMap((prevLastVisibleMap) => ({
  //         ...prevLastVisibleMap,
  //         [selectedCategory]: querySnapshot.docs[querySnapshot.docs.length - 1],
  //       }));

  //       {
  //         !querySnapshot.docs[querySnapshot.docs.length - 1] &&
  //           toast.error("Neexistujú ďalšie objednávky");
  //       }

  //       const newData: FireBasePayment[] = [];

  //       querySnapshot.forEach((doc) => {
  //         const data = doc.data() as FireBasePayment;
  //         const order: FireBasePayment = {
  //           ...data,
  //           id: doc.id,
  //         };
  //         newData.push(order);
  //       });

  //       {
  //         selectedCategory === "prijatá" &&
  //           setReceivedOrders((prevData) => [...prevData, ...newData]);
  //       }
  //       {
  //         selectedCategory === "storno" &&
  //           setStornoOrders((prevData) => [...prevData, ...newData]);
  //       }
  //       {
  //         selectedCategory === "expedovaná" &&
  //           setExpedovaneOrders((prevData) => [...prevData, ...newData]);
  //       }

  //       setFilteredData((prevData) => [...prevData, ...newData]);
  //     } catch (error) {
  //       console.error("Error fetching received orders:", error);
  //     }
  //   };

  return (
    <>
      {user && (
        <>
          <Toaster />
          <div className="main_section">
            <h2 className="mb-8">Databáza platieb</h2>

            <div className="flex flex-row items-center mb-8 gap-8">
              <select
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="block  appearance-none bg-secondary border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer w-full md:w-auto"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Link href={"/admin/zlavove_kody"}>
                <p className="underline text-black">Zľavové kódy</p>
              </Link>
              <Link href={"/admin/produkty"}>
                <p className="underline text-black">Produkty</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DatabaseSection;
