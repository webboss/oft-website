import React from "react"
import ctl from "@netlify/classnames-template-literals"

import { NLink } from "../../nlink"
// import CloseIcon from "svgs/close.svg"
import Container from "../../container"
import { Text } from "../../text"
import menulist from "../../../config/menu.json"
import Image from "next/image"

const Menu = ({ onToggle }) => {
	return (
		<div className={navWrapperStyle}>
			<Container>
				<header className={headerStyle}>
					<button className={closeButtonStyle} onClick={onToggle}>
						Close
						{/* <CloseIcon width={32} className='md:w-[32px] w-[20px]' /> */}
					</button>

					<NLink to='/'>
						<Image
							alt='Otherfaces of Tech'
							src='/assets/images/otherfaces.tech.png'
							width={160}
							height={120}
							className='md:w-auto w-[120px]'
						/>
					</NLink>
					<div></div>
				</header>
				<nav>
					<ul className={listWrapper}>
						{menulist.map(menuItem => {
							const { title, url, href } = menuItem
							return (
								<Text
									variant='h3'
									as='li'
									color='primary-100'
									className='md:mb-[36px] mb-[32px]'>
									<NLink
										{...menuItem}
										key={url || href}
										activeClassName={activePageLink}>
										{title}
									</NLink>
								</Text>
							)
						})}
					</ul>
				</nav>
			</Container>
		</div>
	)
}

const closeButtonStyle = ctl(`
p-0
m-0
`)

const navWrapperStyle = ctl(`
w-full
h-full
bg-black
fixed
left-0
right-0
top-0
z-[999]
`)

const listWrapper = ctl(`
text-right
lg:pr-[80px]
md:mt-[40px]
mt-[100px]
`)

const activePageLink = ctl(`
gradient-blue-to-red
bg-clip-text
text-transparent
`)

const headerStyle = ctl(`
flex
justify-between
items-center
py-[24px]
`)

export { Menu }
