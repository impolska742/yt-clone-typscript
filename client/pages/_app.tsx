import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import Head from 'next/head'
import { NotificationsProvider } from '@mantine/notifications'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MeContextProvider } from '../context/me'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page)

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
                    colorScheme: 'light',
                }}
            >
                <NotificationsProvider>
                    <QueryClientProvider client={queryClient}>
                        <MeContextProvider>
                            {getLayout(
                                <main>
                                    <Component {...pageProps} />
                                </main>,
                            )}
                        </MeContextProvider>
                    </QueryClientProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    )
}

export default MyApp
