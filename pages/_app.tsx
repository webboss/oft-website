import { AppProps } from "next/app"
import "../styles/index.css"
import localFont from "next/font/local"

const clashDisplay = localFont({
	src: [
		{
			path: "../fonts/ClashDisplay-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/ClashDisplay-Medium.otf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-primary",
})
const generalSans = localFont({
	src: [
		{
			path: "../fonts/GeneralSans-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../fonts/GeneralSans-Medium.otf",
			weight: "500",
			style: "normal",
		},
	],
	variable: "--font-secondary",
})
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main className={`${generalSans.variable} ${clashDisplay.variable} `}>
			<Component {...pageProps} />
		</main>
	)
}

export default MyApp
