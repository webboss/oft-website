import React from "react"
import { useForm } from "react-hook-form"
import { Container, Input, Newsletter, Text, Layout } from "components"
import ctl from "@netlify/classnames-template-literals"

import { ResourceCategory, ResourcesHeader } from "templates/resources"
import SearchIcon from "svgs/search.svg"
import SearchInfoIcon from "svgs/search-info.svg"
import { getallResources } from "lib/api"
import { GetStaticProps } from "next"

const ResourcePage = ({ resourceCategoryQuery }) => {
	const { register, watch } = useForm({
		mode: "onChange",
		defaultValues: { search: "" },
	})

	const allResourcesCategory = resourceCategoryQuery.nodes.filter(
		category =>
			!!category.resources?.nodes || !!category.resources?.nodes?.length
	)

	const searchQuery = watch("search")

	const totalItems = allResourcesCategory.reduce(
		(acc, item) => {
			console.log(item.resources.length);
			console.log(item.resources);
			return acc + item.resources.nodes.length
		},
		0
	)

	
	const searchResources = items => {
		const lowercaseSearchQuery = searchQuery?.toLowerCase()?.trim()

		const categoryFilter = items.filter(category =>
			category.name.toLowerCase().includes(lowercaseSearchQuery)
		)
		return categoryFilter
	}

	const filteredResult = searchQuery
		? searchResources(allResourcesCategory)
		: allResourcesCategory

	return (
		<Layout
			title='Resources'
			description='Carefully selected books, schools, courses to kickstart and supercharge your non-coding career in tech '>
			<ResourcesHeader totalCount={totalItems} />
			<div className={searchWrapperStyle}>
				<SearchIcon className='md:w-7 w-[24px]' />
				<Input
					placeholder='Search Resources e.g Product Design'
					className={searchInputStyle}
					register={register("search")}
				/>
			</div>
			<Container className={formContainerStyle}>
				{filteredResult.length ? (
					filteredResult.map((resourceCategory, index) => {
						const { name, resources } = resourceCategory
						return (
							<ResourceCategory
								key={`resource-category-${index}`}
								title={name}
								list={resources.nodes}
							/>
						)
					})
				) : (
					<div className={emptyStateContainer}>
						<SearchInfoIcon />
						<Text variant='p16' className='mt-8 leading-10'>
							<>
								We couldn’ t find anything matching to your search. <br />
								Try again with different terms
							</>
						</Text>
					</div>
				)}
			</Container>
			<section>
				<Newsletter />
			</section>
		</Layout>
	)
}

export default ResourcePage

export const getStaticProps: GetStaticProps = async () => {
	const allResources = await getallResources()

	return {
		props: { resourceCategoryQuery: allResources.categories },
		revalidate: 10,
	}
}

const formContainerStyle = ctl(`
mb-[160px]
`)

const searchWrapperStyle = ctl(`
    flex
    items-center
    !border-[1.5px]
    !md:border-2
    rounded-full
    px-4
    md:px-14
    max-w-[700px]
    md:mx-auto
    mb-20
    mx-5
`)

const searchInputStyle = ctl(`
    placeholder:text-[#4B4B4B]
    border-none
    pb-0
    rounded-none
`)

const emptyStateContainer = ctl(`
  mx-auto
  flex
  flex-col
  items-center
  justify-center
  text-center
`)
