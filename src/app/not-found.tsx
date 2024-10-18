import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[700px]">
      <h2 className="text-center">Zadanú stránku sa nepodarilo nájsť.</h2>
      <div className="flex flex-row gap-4">
        {" "}
        <Link href="/" className="btn btn--secondary">
          Domov
        </Link>
        <Link href="/obchod" className="btn btn--secondary">
          E-shop
        </Link>
      </div>
    </div>
  );
}
