import { abi, CONTRACT_ADDRESS } from "./constants.js"
import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js"

const connectButton = document.getElementById("connectButton")
const disConnectButton = document.getElementById("disconnectButton")
const sendButton = document.getElementById("sendButton")
const balanceButton = document.getElementById("balanceButton")
const receiveButton = document.getElementById("receiveButton")
connectButton.onclick = connect
disConnectButton.onclick = disConnect
sendButton.onclick = send
balanceButton.onclick = balance
receiveButton.onclick = receive

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
async function send() {
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
async function receive() {}

async function balance() {}
