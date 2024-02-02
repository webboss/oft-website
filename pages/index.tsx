import { GetStaticProps } from "next";
import { Layout, Partners, Newsletter } from "components";
import { getAllCategory, getAllPostsForHome } from "../lib/api";
import { HomeFeaturedStories, HomeHeader } from "templates/home";
import { Resources } from "components/resources";

export default function Index({ allPosts: { edges }, allCategory, preview }) {
  const storyNodes = edges.map((edge) => edge.node);

  return (
    <Layout
      title="Other Faces of Tech"
      ignoreSiteName={true}
      description="Let's help you put a face your career in tech. Through stories, roadmaps, and resources"
    >
      <HomeHeader />

      {storyNodes.length > 0 && <HomeFeaturedStories stories={storyNodes} />}

      <Newsletter />
      <div className="pt-[90px]">
        <Resources allCategoryQuery={allCategory} />
      </div>
      <div className="md:mt-[122px] mt-[59px] mb-[90px]">
        <Partners />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await getAllPostsForHome(preview);
  const allCategory = await getAllCategory();

  return {
    props: { allPosts, preview, allCategory },
    revalidate: 10,
  };
};
