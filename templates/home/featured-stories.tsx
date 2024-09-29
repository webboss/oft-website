import React from "react"

import { Button, Text, Container } from "components"
import { Hr } from "components/hr"

import { ArticlePreviewList, ArticlePreviewProps } from "components/article"
import Image from "next/image"

export const HomeFeaturedStories = ({
	stories,
}: {
	stories: ArticlePreviewProps[]
}) => {
	const firstItem = stories[0] as ArticlePreviewProps
	const remainingItems = stories.slice(1)

	return (
		<div className='pt-[120px] pb-[160px]  relative' id='recent-stories'>
			<Hr className='absolute xl:top-[200px] top-[152px] md:block hidden left-0 w-full ' />
			<Container>
				<section className='grid grid-cols-12 gap-3 md:text-left text-center'>
					<div className='gradient-blue-to-red p-[1px] md:col-span-5  rounded col-span-12 '>
						<div className=' overflow-hidden relative'>
							<div className='absolute bg-gradient-to-t rounded filter mix-blend-multiply from-black to-white  z-10 opacity-80   left-0 right-0 top-0 w-full h-full' />
							<Image
								alt={firstItem.title}
								height={516}
								width={1000}
								src={firstItem.featuredImage.node.sourceUrl}
								className='rounded md:h-[516px] h-[356px] object-cover'
							/>
						</div>
					</div>
					<div></div>
					<div className='md:col-span-5 col-span-12 flex flex-col justify-center'>
						<div>
							<Text variant='h2'>{firstItem.title}</Text>
							<Text
								variant='p18'
								value={firstItem.role}
								className=' mt-1 mb-4 '
							/>

							<Button
								href={`/story/${firstItem.slug}`}
								variant='alternative'
								size='large'
								text='Read Story'
							/>
						</div>
					</div>
				</section>

				<ArticlePreviewList articles={remainingItems} />
			</Container>
		</div>
	)
}
