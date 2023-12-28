import React from "react"
import { Br, Container, Text } from "components"

interface ResourceHeaderProps {
	title?: string
	totalCount: number
}
export const ResourcesHeader = ({ title, totalCount }: ResourceHeaderProps) => {
	return (
		<header>
			<Container className=' pt-[50px] md:pt-[100px] px-5 pb-[40px] text-center max-w-[1000px]'>
				<Text variant='h2'>
					{totalCount}+ resources to kickstart your <Br on='desktop' />{" "}
					{title ? `${title} career` : "non-coding career in tech."}
				</Text>
				<Text variant='p16'>
					*PS: This is only a directory, we have no affiliation with the brands
					listed
				</Text>
			</Container>
		</header>
	)
}
