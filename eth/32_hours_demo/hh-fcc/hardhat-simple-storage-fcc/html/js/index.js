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
