import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/index.css";
import localFont from "next/font/local";
import "react-toastify/dist/ReactToastify.css";
import SubscribersContextProvider from "context/SubscribersContext";
import { GoogleAnalytics } from "../components";

const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
});
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
});

function MyApp({ Component, pageProps }: AppProps) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <main className={`${clashDisplay.variable} ${generalSans.variable}  `}>
      {googleAnalyticsId ? <GoogleAnalytics ga_id={googleAnalyticsId} /> : null}
      <SubscribersContextProvider>
		<Head>
			<link rel="icon" href="/favicon-32x32.png" />
		</Head>
        <Component {...pageProps} />
      </SubscribersContextProvider>
    </main>
  );
}

export default MyApp;
