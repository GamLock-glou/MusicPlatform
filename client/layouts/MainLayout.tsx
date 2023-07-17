import NavBar from '@/components/NavBar'
import { Player } from '@/components/Player/Player'
import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import ico from '@/public/favicon.ico'

type MainLayoutProps = {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => {
  return (
    <>
      <Head>
        <title>{title || 'Music Platform'}</title>
        <meta name='description' content={'Music Platform ' + description} />
        <meta name='robots' content="index, follow" />
        <meta name='keyword' content={keywords || "Music, tracks, artists"} />
        <meta name='viewport' content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container className='container'>
        {children}
      </Container>
    </>
  )
}

export default MainLayout
