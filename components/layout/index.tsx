import * as React from "react"
import { MainFooter } from "./footer"
import { NavBar } from "./navbar"
import ctl from "@netlify/classnames-template-literals"
import { ToastContainer } from "react-toastify"
import Meta from "../meta"

interface LayoutProps {
	description?: string
	title: string
	ignoreSiteName?: true | false
	children: React.ReactElement | React.ReactElement[]
}
const Layout = ({
	description,
	title,
	ignoreSiteName = false,
	children,
}: LayoutProps) => {
	return (
		<>
			<Meta
				title={title}
				description={description}
				ignoreSiteName={ignoreSiteName}
			/>
			<NavBar />
			<main className='relative'>{children}</main>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				closeButton={false}
				hideProgressBar={true}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				className='!rounded-full'
				style={{ fontFamily: "ClashDisplay" }}
			/>
			<MainFooter />

			<div
				className={`radial-gradient-blue  top-[50%] right-0 ${gradientItemStyle}`}
			/>
			<div
				className={`radial-gradient-red  top-[20%] left-0 ${gradientItemStyle}`}
			/>
		</>
	)
}

const gradientItemStyle = ctl(`
w-[500px] h-[500px] rounded-full opacity-20 fixed z-[-1] pointer-events-none
`)

export default Layout
