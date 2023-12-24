import { GetStaticProps } from "next"
import Container from "../components/container"
import MoreStories from "../components/more-stories"
import HeroPost from "../components/hero-post"
import Layout from "../components/layout"
import { getAllPostsForHome } from "../lib/api"

export default function Index({ allPosts: { edges }, preview }) {
	const heroPost = edges[0]?.node
	const morePosts = edges.slice(1)

	return (
		<Layout
			title='Other Faces of Tech'
			ignoreSiteName={true}
			description="Let's help you put a face your career in tech. Through stories, roadmaps, and resources">
			<Container>
				{heroPost && (
					<HeroPost
						title={heroPost.title}
						coverImage={heroPost.featuredImage}
						date={heroPost.date}
						author={heroPost.author}
						slug={heroPost.slug}
						excerpt={heroPost.excerpt}
					/>
				)}
				{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			</Container>
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
