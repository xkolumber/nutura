"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../auth/Provider";
import { useRouter } from "next/navigation";

const AdminHeader = () => {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {user && (
        <div className="flex flex-row justify-between main_section !pb-0">
          <Link href={"/admin"}>Admin</Link>
          <p
            onClick={handleLogout}
            className="text-black font-medium cursor-pointer"
          >
            Odhlásiť sa
          </p>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
