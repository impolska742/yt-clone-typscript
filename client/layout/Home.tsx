import { Anchor, AppShell, Box, Header, Navbar } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UploadVideo from '../components/UploadVideo'
import { useMe } from '../context/me'

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, refetch } = useMe()
    return (
        <AppShell
            padding="md"
            navbar={
                <Navbar width={{ base: 300 }} height={500} p="xs">
                    Side Item
                </Navbar>
            }
            header={
                <Header height={60} p="xs">
                    <Box sx={() => ({ display: 'flex' })}>
                        <Box sx={() => ({ flex: '1' })}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width="100px"
                                height="40px"
                            />
                        </Box>

                        {!user ? (
                            <>
                                <Link href="/auth/login" passHref>
                                    <Anchor ml="lg" mr="lg">
                                        Login
                                    </Anchor>
                                </Link>

                                <Link href="/auth/register" passHref>
                                    <Anchor ml="lg" mr="lg">
                                        Register
                                    </Anchor>
                                </Link>
                            </>
                        ) : (
                            <UploadVideo />
                        )}
                    </Box>
                </Header>
            }
        >
            {children}
        </AppShell>
    )
}

export default HomePageLayout
