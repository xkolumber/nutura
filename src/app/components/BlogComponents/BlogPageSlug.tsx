"use client";
import { Blog } from "@/app/lib/all_interfaces";
import { getDataBlog } from "@/app/lib/functionsServer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ClipLoader } from "react-spinners";
import BlogPageSlugClient from "./BlogPageSlugClient";

interface Props {
  slug: string;
}

const BlogPageSlug = ({ slug }: Props) => {
  const queryClient = useQueryClient();

  const cachedElements = queryClient.getQueryData<Blog[]>(["blogs"]) || [];
  const cachedElement = cachedElements.find(
    (object) => object.slug.current === slug
  );
  const directCachedElement = queryClient.getQueryData<Blog>(["blogs", slug]);

  const initialElementData = directCachedElement || cachedElement;

  const {
    data = initialElementData,
    error,
    isLoading,
  } = useQuery<Blog | null>({
    queryKey: ["blogs", slug],
    queryFn: async () => await getDataBlog(slug),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !initialElementData,
  });
  return (
    <div>
      {data && <BlogPageSlugClient data_article={data} />}
      {isLoading && (
        <div className="own_edge">
          <div className="main_section mt-16 md:mt-0">
            <ClipLoader size={20} color={"#00000"} loading={true} />
          </div>
        </div>
      )}
      {error && (
        <div className="own_edge">
          <div className="main_section mt-16 md:mt-0">
            <p>Chyba pri načítaní dát.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPageSlug;
