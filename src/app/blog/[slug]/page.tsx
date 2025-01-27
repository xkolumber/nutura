import BlogPageSlug from "@/app/components/BlogComponents/BlogPageSlug";

const Page = ({ params }: { params: { slug: string } }) => {
  return <BlogPageSlug slug={params.slug} />;
};

export default Page;
