import { GetStaticProps } from "next"
import Layout from "../components/layout"
import { Partners, Newsletter } from "components"
import { getAllPostsForHome } from "../lib/api"
import { HomeFeaturedStories, HomeHeader } from "templates/home"

export default function Index({ allPosts: { edges }, preview }) {
	const storyNodes = edges.map(edge => edge.node)

	return (
		<Layout
			title='Other Faces of Tech'
			ignoreSiteName={true}
			description="Let's help you put a face your career in tech. Through stories, roadmaps, and resources">
			<HomeHeader />

			<HomeFeaturedStories stories={storyNodes} />

			<Newsletter />
			<div className='md:mt-[122px] mt-[59px] mb-[90px]'>
				<Partners />
			</div>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const allPosts = await getAllPostsForHome(preview)

	return {
		props: { allPosts, preview },
		revalidate: 10,
	}
}
