import React from 'react'
import '../../styles/global.css'
import '../../styles/navbar.css'
import '../../styles/footer.css'
import '../../styles/searchbar.css'

import Layout from '../../components/Layout'

export default function MyApp({ Component, pageProps }) {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
