import '../assets/Uniswap.css'

import { useCallback, useEffect, useState } from 'react'
import { CurrentConfig, Environment } from '../config'
import {
  connectBrowserExtensionWallet,
  getProvider,
  getWalletAddress,
  TransactionState,
} from '../libs/providers'
import { createTrade, executeTrade, TokenTrade } from '../libs/trading'
import { displayTrade } from '../libs/utils'
import { getCurrencyBalance, wrapETH } from '../libs/wallet'
import { quote } from '../libs/quote'
import { SwapRoute } from '@uniswap/smart-order-router'
import { generateRoute } from '../libs/routing'
import { executeRoute } from '../libs/routing'


const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on('block', callback) // 通过 provider 的 on 方法监听 block 事件
    return () => {
      subscription?.removeAllListeners()
    }
  })
}

const Uniswap = () => {
  const [trade, setTrade] = useState<TokenTrade>()
  const [txState, setTxState] = useState<TransactionState>(TransactionState.New)

  const [tokenInBalance, setTokenInBalance] = useState<string>()
  const [tokenOutBalance, setTokenOutBalance] = useState<string>()
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const [route, setRoute] = useState<SwapRoute | null>(null)

  // 获取 Quote 报价
  const [outputAmount, setOutputAmount] = useState<string>("0")
  const onQuote = useCallback(async () => {
    setOutputAmount(await quote())
  }, [])


  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber: number) => {
    refreshBalances()
    setBlockNumber(blockNumber)
  })

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider()
    const address = getWalletAddress()
    if (!address || !provider) {
      return
    }

    setTokenInBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.in)
    )
    setTokenOutBalance(
      await getCurrencyBalance(provider, address, CurrentConfig.tokens.out)
    )
  }, [])

  // Event Handlers
  const onConnectWallet = useCallback(async () => {
    if (await connectBrowserExtensionWallet()) {
      refreshBalances()
    }
  }, [refreshBalances])

  const onCreateTrade = useCallback(async () => {
    refreshBalances()
    setTrade(await createTrade())
  }, [refreshBalances])

  const onTrade = useCallback(async (trade: TokenTrade | undefined) => {
    if (trade) {
      setTxState(await executeTrade(trade))
    }
  }, [])

  // route
  const onCreateRoute = useCallback(async () => {
    setRoute(await generateRoute())
  }, [])

  const executeSwap = useCallback(async (route: SwapRoute | null) => {
    if (!route) {
      console.log('route is null')
      // todo add alert message
      return
    }
    setTxState(TransactionState.Sending)
    setTxState(await executeRoute(route))
  }, [])

  return (
    <div className="App">
      <div className="wallet">
        {CurrentConfig.rpc.mainnet === '' && (
          <span className="error">Please set your mainnet RPC URL in config.ts</span>
        )}
        {CurrentConfig.env === Environment.WALLET_EXTENSION &&
          getProvider() === null && (
            <span className="error">
              Please install a wallet to use this example configuration
            </span>
          )}
        <h4>{`Wallet Address: ${getWalletAddress()}`}</h4>
        {CurrentConfig.env === Environment.WALLET_EXTENSION &&
          !getWalletAddress() && (
            <button onClick={onConnectWallet}>Connect Wallet</button>
          )}
      </div>

      <div className="trade">
        <h5>
          Lesson One: Trade
        </h5>

        <span>
          Trading {CurrentConfig.tokens.amountIn} {CurrentConfig.tokens.in.symbol}{' '}
          for {CurrentConfig.tokens.out.symbol}
        </span>

        <span>{trade && `Constructed Trade: ${displayTrade(trade)}`}</span>

        <button onClick={onCreateTrade}>
          <p>Create Trade</p>
        </button>

        <span>{`Block Number: ${blockNumber + 1}`}</span>

        <span>{`Transaction State: ${txState}`}</span>

        <span>{`${CurrentConfig.tokens.in.symbol} Balance: ${tokenInBalance}`}</span>

        <span>{`${CurrentConfig.tokens.out.symbol} Balance: ${tokenOutBalance}`}</span>

        <div className="trade-button">
          <button
            onClick={() => wrapETH(100)}
            disabled={getProvider() === null || CurrentConfig.rpc.mainnet === ''}>
            <p>Wrap ETH</p>
          </button>

          <button
            onClick={() => onTrade(trade)}
            disabled={
              trade === undefined ||
              txState === TransactionState.Sending ||
              getProvider() === null ||
              CurrentConfig.rpc.mainnet === ''
            }>
            <p>Trade</p>
          </button>
        </div>

      </div>

      <div className="quote">
        <h5>
          Lesson Two: Quote
        </h5>

        <span>{`Input Amount: ${CurrentConfig.tokens.amountIn} ${CurrentConfig.tokens.in.symbol}`}</span>
        <span>{`Output Amount: ${outputAmount} ${CurrentConfig.tokens.out.symbol}`}</span>
        <button onClick={onQuote}>
          <p>Quote</p>
        </button>
      </div>

      <div className="route">
        <h5>
          Lesson Three: Route
        </h5>
        <span>
          {`Token In (${CurrentConfig.tokens.in.symbol}) Balance: ${tokenInBalance}`}
        </span>
        <span>
          {`Token Out (${CurrentConfig.tokens.out.symbol}) Balance: ${tokenOutBalance}`}
        </span>
        <div className='route-button'>
          <button onClick={onCreateRoute}>
            <p>Create Route</p>
          </button>
          <button onClick={() => executeSwap(route)}>
            <p>Swap Using Route</p>
          </button>
        </div>

        <div className='mint-position'>
          <h5>
            Lesson X: Mint Position
          </h5>
          <button>
            <p>Mint Position</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Uniswap
