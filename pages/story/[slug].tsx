import { useRouter } from "next/router"
import ErrorPage from "next/error"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps } from "next"
import { Container, Layout, Text } from "components"
import PostTitle from "../../components/post-title"
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api"
import parse, { Element } from "html-react-parser"
import { sanitize } from "isomorphic-dompurify"
import { readingTime } from "reading-time-estimator"
import Image from "next/image"
import Share from "templates/stories/share"
import CopyButton from "templates/stories/copy-button"
import { Hr } from "components/hr"
import { ArticlePreviewList } from "components/article"
import type { DOMNode, HTMLReactParserOptions } from "html-react-parser"

const Blockquote = ({ node }) => {
	// const urlLength = `${url}`.length;
	const urlLength = 8
	const tweetLength = 280
	const expectedStringLength = tweetLength - urlLength

	const firstParagraph = `${node[0].children[0].data}`.substring(
		0,
		expectedStringLength
	)
	return (
		<div
			className='bg-primary-200
	  bg-opacity-5 p-6 rounded-3xl my-4'>
			<blockquote>
				{node.map(nodeItem => {
					const Element = nodeItem.name
					return <Element>{nodeItem.children[0].data}</Element>
				})}
			</blockquote>
			<div>
				{/* <Button
			onClick={() =>
			  popupWindow(
				`https://twitter.com/share?text=${firstParagraph}&url=${url}`
			  )
			}
		  >
			Tweet this
		  </Button> */}
			</div>
		</div>
	)
}

const MetaData = ({ date, readTime = 4 }) => {
	return (
		<div className='flex md:justify-start justify-between gap-10 mb-[22px]'>
			<Text value={date} variant='p18' className=' uppercase ' />
			<Text
				value={`${readTime} Mins Read`}
				variant='p18'
				className=' uppercase '
			/>
		</div>
	)
}

const Author = ({ author }) => {
	const authorInfo = author.node

	const { firstName, lastName, name } = authorInfo

	const hasFullname = firstName && lastName
	const fullName = firstName + " " + lastName

	const nameToShow = hasFullname ? fullName : name

	return (
		<div className='mb-[22px] flex items-center'>
			<Image
				src='/assets/images/avatar.png'
				alt=''
				width={42}
				height={42}
				className='md:mr-[19px] mr-[10px] md:w-[42px] w-[28px] md:h-[42px] h-[28px]'
			/>

			<Text value={nameToShow} variant='p18' className=' uppercase !mb-0' />
		</div>
	)
}
export default function Post({ post, posts, preview }) {
	const router = useRouter()
	if (router.isFallback) {
		return (
			<Layout title='Story'>
				<PostTitle>Loading…</PostTitle>
			</Layout>
		)
	}
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	// const morePosts = posts?.edges.map(edge => edge.node)

	// const readTime = readingTime(post?.content)
	// const purifiedContent = sanitize(post?.content?.replace(/\n/gi, ""))

	// const featuredImage = post?.featuredImage
	return (
		<Layout title={router.isFallback ? "Loading..." : post?.title}>
			<p>Story</p>
			{/* <Container className='md:py-[100px] py-[50px] '>
				<article>
					<Head>
						<meta
							property='og:image'
							content={post.featuredImage?.node.sourceUrl}
						/>
					</Head>

					<header className='article-header'>
						<MetaData date={post?.date} readTime={readTime.minutes} />
						<Author author={post?.author} />
						<Text variant='h3'>
							The weird symbole here is em-dash 
							{post?.title} &#8212; {post?.role}
						</Text>

						<Image
							width={2000}
							height={1000}
							alt={`${post?.title}`}
							src={featuredImage?.node.sourceUrl}
							className='w-full object-top  md:rounded-[100px] rounded-[50px] md:h-auto h-[370px] my-[45px] '
						/>
					</header>
					<section className='flex md:flex-row flex-col-reverse justify-between relative'>
						<aside>
							<div className='md:sticky md:mt-0 mt-8 top-4'>
								<Text variant='p16' value='SHARE' />
								<Share title={post?.title} />
								<CopyButton />
							</div>
						</aside>
						<div className='article max-w-[738px] flex-grow-0'>
							<div dangerouslySetInnerHTML={{ __html: post?.content }} />
							{/* {parse(purifiedContent, {
								replace: (domNode: DOMNode) => {
									if (
										domNode instanceof Element &&
										domNode.name === "blockquote"
									) {
										return <Blockquote node={domNode.children} />
									}
								},
							})} 
						</div>
						<div />
					</section>
				</article>
			</Container>
			<Hr />
			<Container className='mb-[116px]'>
				<ArticlePreviewList heading='More Stories' articles={morePosts} />
			</Container> */}
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({
	params,
	preview = false,
	previewData,
}) => {
	// const data = await getPostAndMorePosts(params?.slug, preview, previewData)

	// console.log({ data })

	return {
		props: {
			preview,
			post:  null,
			posts: null,
		},
		// revalidate: 10,
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const allPosts = await getAllPostsWithSlug()

	return {
		paths: allPosts.edges.map(({ node }) => `/story/${node.slug}`) || [],
		fallback: true,
	}
}
