"use client";
import React, { useEffect, useState } from "react";
import { Blog } from "../lib/interface_blog";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { urlFor } from "../lib/sanityImageUrl";
import Link from "next/link";
import ImageForPages from "./ImageForPages";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";

const BlogComponent = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const articles = await response.json();

        setData(articles);

        if (response.ok) {
          setIsLoading(false);
        } else {
          console.error("failed");
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  function getFormatedDate(data: string) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, "0");
    const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = ` ${day}.${monthNumber}.${year}`;

    return formattedDate;
  }

  return (
    <div>
      {" "}
      <Navbar />
      <ImageForPages />
      <Navbar2 />
      <div className="main_section mt-32 md:mt-0">
        <h1>BLOG</h1>
        {isLoading ? (
          <ClipLoader size={40} color={"#174218"} loading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data.map((article, index) => (
              <Link
                className=" border-black border rounded-2xl"
                key={index}
                href={`/blog/${article.slug.current}`}
              >
                <Image
                  src={urlFor(article.photo1).url()}
                  width={500}
                  height={500}
                  priority={true}
                  className="w-full h-[267px] object-cover rounded-t-2xl"
                  alt="Intro produktového obrázku"
                />

                <div className="p-4">
                  <h5>{article.title}</h5>
                  <p>{getFormatedDate(article._createdAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className=""></div>
      </div>
    </div>
  );
};

export default BlogComponent;
