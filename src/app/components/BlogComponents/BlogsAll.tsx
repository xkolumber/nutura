"use client";
import React from "react";
import { getBlogs } from "../../lib/functionsServer";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import BlogComponent from "./BlogComponent";
import { Blog } from "../../lib/all_interfaces";

const BlogsAll = () => {
  const { data, error, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: () => getBlogs(),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {data && <BlogComponent data={data} />}
      {isLoading && (
        <div className=" min-h-screen">
          <ClipLoader size={20} color={"#00000"} loading={true} />
        </div>
      )}
      {error && (
        <div className="">
          <p>Chyba pri načítaní dát.</p>
        </div>
      )}
    </>
  );
};

export default BlogsAll;
