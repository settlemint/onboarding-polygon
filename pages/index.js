import { createMuiTheme, withTheme } from '@material-ui/core/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Chain from '../components/chain';
import styles from '../styles/Home.module.css';



const searchTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2F80ED',
    },
  },
  shape: {
    borderRadius: '10px'
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '12px'
    }
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        "box-shadow": '0px 7px 7px #0000000A;',
        "-webkit-box-shadow": '0px 7px 7px #0000000A;',
        "-moz-box-shadow": '0px 7px 7px #0000000A;',
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '14px'
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12.5px 14px'
      },
      notchedOutline: {
        borderColor: "#FFF",
      }
    },
  },
});

const fetcher = (...args) => fetch(...args).then(res => res.json())

function Home({ changeTheme, theme }) {
  const data = [
    {"name":"Polygon Mainnet","chain":"Polygon","network":"mainnet","rpc":["https://polygon-rpc.com/","https://rpc-mainnet.matic.network","https://matic-mainnet.chainstacklabs.com","https://rpc-mainnet.maticvigil.com","https://rpc-mainnet.matic.quiknode.pro","https://matic-mainnet-full-rpc.bwarelabs.com"],"faucets":[],"nativeCurrency":{"name":"MATIC","symbol":"MATIC","decimals":18},"infoURL":"https://polygon.technology/","shortName":"MATIC","chainId":137,"networkId":137,"slip44":966,"explorers":[{"name":"polygonscan","url":"https://polygonscan.com/","standard":"EIP3091"}]}]

  const [ layout, setLayout ] = useState('grid')
  const [ search, setSearch ] = useState('')
  const [ hideMultichain, setHideMultichain ] = useState('1')
  const router = useRouter()
  if (router.query.search) {
    setSearch(router.query.search)
    delete router.query.search
  }

  const onSearchChanged = (event) => {
    setSearch(event.target.value)
  }

  const handleLayoutChanged = (event, newVal) => {
    if(newVal !== null) {
      setLayout(newVal)
      localStorage.setItem('yearn.finance-invest-layout', newVal ? newVal : '')
    }
  }

  const addNetwork = () => {
    window.open('https://github.com/ethereum-lists/chains', '_blank')
  }

  const closeMultichain = (perma) => {
    setHideMultichain('1')
    localStorage.setItem('chainlist.org-hideMultichain', perma ? '1' : '0')
  }

  useEffect(() => {
    const multi = localStorage.getItem('chainlist.org-hideMultichain')
    if(multi) {
      setHideMultichain(multi)
    } else {
      setHideMultichain('0')
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Polygon Onboarding</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
<div style={{color: 'white'}}>
  <h1 style={{color: 'white'}}>Add the Polygon network to your wallet</h1>

  <ol>
    <li>Click the 'Connect' button below</li>
    <li>Press 'Add to Metamask'</li>
    <li>Press 'Approve' in the popup</li>
    <li>Press 'Switch Network'</li>
  </ol>
</div>
              {
                data && data.filter((chain) => {
                  if(search === '') {
                    return true
                  } else {
                    //filter
                    return (chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                    chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                    chain.name.toLowerCase().includes(search.toLowerCase()) ||
                    (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase()))
                  }
                }).map((chain, idx) => {
                  return <Chain chain={ chain } key={ idx } />
                })
              }

      </main>
    </div>
  )
}

export default withTheme(Home)

// export const getStaticProps  = async () => {
//
//   try {
//     const chainsResponse = await fetch('https://chainid.network/chains.json')
//     const chainsJson = await chainsResponse.json()
//
//     return {
//       props: {
//         chains: chainsJson
//       },
//       revalidate: 60,
//     }
//   } catch (ex) {
//     return {
//       props: {
//         chains: []
//       }
//     }
//   }
//
// }
