import { AppProps } from "next/app"
import "../styles/index.css"
import localFont from "next/font/local"
import "react-toastify/dist/ReactToastify.css"
import SubscribersContextProvider from "context/SubscribersContext"

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
			<SubscribersContextProvider>
				<Component {...pageProps} />
			</SubscribersContextProvider>
		</main>
	)
}

export default MyApp
