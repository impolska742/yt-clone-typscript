import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import { NotificationsProvider } from '@mantine/notifications'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>YouTube Clone</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <MantineProvider
                withGlobalStyles
                withCSSVariables
                withNormalizeCSS
                theme={{
                    colorScheme: 'dark',
                }}
            >
                <NotificationsProvider>
                    <Component {...pageProps} />
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}

export default MyApp
