import { abi, CONTRACT_ADDRESS } from "./constants.js"
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js"

const connectButton = document.getElementById("connectButton")
const disConnectButton = document.getElementById("disconnectButton")
const helloButton = document.getElementById("helloButton")
const balanceButton = document.getElementById("balanceButton")
const nameButton = document.getElementById("nameButton")
const symbolButton = document.getElementById("symbolButton")
const transferButton = document.getElementById("transferButton")

connectButton.onclick = connect
disConnectButton.onclick = disConnect
nameButton.onclick = name
balanceButton.onclick = balance
symbolButton.onclick = symbol
helloButton.onclick = hello
transferButton.onclick = transfer

async function name() {
    console.log("sending...")
    let signer = null

    let provider
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }

    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.BrowserProvider(window.ethereum)
        signer = await provider.getSigner()

        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        console.log(contract)

        // 调用合约的方法
        let tx = await contract.name()
        console.log(tx)
    }
}

async function symbol() {
    console.log("sending...")
    let signer = null
    let provider = null
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.BrowserProvider(window.ethereum)

        signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        console.log(contract)

        // 调用合约的方法
        let tx = await contract.symbol()
        console.log(tx)
    }
}

async function connect() {
    // 在这里将执行一些 metamask 的代码
    if (typeof window.ethereum !== "undefined") {
        // 如果 MetaMask 安装了, window.ethereum 就会被定义
        console.log("MetaMask is installed!")
        await window.ethereum
            .request({ method: "eth_requestAccounts" }) // 请求用户授权, 会调用 MetaMask 的授权弹窗，用户点击确认后，返回一个 Promise 对象，里面包含了用户的账户信息
            .then((accounts) => {
                console.log(accounts)
            })
            .catch((error) => {
                console.log(error)
            })
        document.getElementById("connectButton").innerHTML = "Connected"
    } else {
        console.log("MetaMask is not installed!")
        document.getElementById("connectButton").innerHTML =
            "Please install MetaMask"
    }
}

// window.onload = async () => {
//     // 刷新页面时，先检查是否已经安装
//     if (typeof window.ethereum !== "undefined") {
//         console.log("onload check. MetaMask is installed!")
//         document.getElementById("connectButton").innerHTML = "Connected"
//     }
// }

// 断开和 metamask 的链接
async function disConnect() {}

//
async function hello() {
    console.log("sending...")
    let signer = null

    let provider
    if (window.ethereum == null) {
        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed,
        // so they only have read-only access
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }

    if (typeof window.ethereum !== "undefined") {
        // provider: 用于与以太坊网络进行通信
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)

        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        signer = await provider.getSigner()

        // contract: 用于调用合约的方法, 从 abi 和 address 中获取
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        console.log(contract)

        // 调用合约的方法
        let tx = await contract.hello("rayest")
        console.log(tx)
    }
}

async function balance() {
    console.log("sending...")
    let signer = null
    let provider = null
    if (window.ethereum == null) {
        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed,
        // so they only have read-only access
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }
    if (typeof window.ethereum !== "undefined") {
        // provider: 用于与以太坊网络进行通信
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)

        // It also provides an opportunity to request access to write
        // operations,which will be performed by the private key
        // that MetaMask manages for the user.

        signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        console.log(contract)

        // 调用合约的方法
        let tx = await contract.balanceOf(signer.getAddress())
        console.log(tx)
    }
}

async function transfer() {
    console.log("sending...")
    const ethAmount = "0.01"
    let signer = null
    let provider = null
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()
    }
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.BrowserProvider(window.ethereum)

        signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
        console.log(contract)

        let rawTx = {
            to: CONTRACT_ADDRESS,
            value: ethers.parseEther(ethAmount), // 这个字符串表示的是以 ether 为单位的数量，然后返回一个 BigNumber 对象，表示的是相同数量的 wei。
            data: contract.interface.encodeFunctionData("transfer", [
                "0x072607E7886504cf137e40fd9dF8c263154E961B",
                1, // 1 token
            ]),
        }

        // provider.estimateGas(rawTx).then((gasEstimate) => {
        //     rawTx.gasLimit = gasEstimate
        // })
        

        let tx = await signer.sendTransaction(rawTx)
        console.log(tx)

        // 监听事件
        let receipt = await listenTransferEvent(tx, provider)
    }
}

function listenTransferEvent(tx, provider) {}
