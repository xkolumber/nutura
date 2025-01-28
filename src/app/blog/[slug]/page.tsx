import BlogPageSlug from "@/app/components/BlogComponents/BlogPageSlug";
import { Blog } from "@/app/lib/all_interfaces";
import { getDataBlog } from "@/app/lib/functionsServer";
import { urlFor } from "@/app/lib/sanityImageUrl";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = (await getDataBlog(params.slug)) as Blog;

  if (data !== null) {
    return {
      title: data.title,
      description: data.content[0].children[0].text,
      openGraph: {
        title: data.title,
        description: data.content[0].children[0].text,
        images: [
          {
            url: urlFor(data.photo1).url(),
            alt: "Titulná fotka",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
  return {
    title: "Error",
    description: "An error occurred while fetching the blog data.",
    openGraph: {
      title: "Error",
      description: "An error occurred while fetching the blog data.",
      images: [
        {
          url: "error-image-url",
          alt: "Error image",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogPageSlug slug={params.slug} />;
};

export default Page;
