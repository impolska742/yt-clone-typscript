import { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

Document.getInitialProps = createGetInitialProps()
