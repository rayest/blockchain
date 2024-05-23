import logo from './logo.svg';
import './App.css';

// 手动编写关于 web3 和 合约相关的代码
import { simpleStorage } from "./abi/abi";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

// 如果合约部署到测试网络，将会生成一个合约地址，并保存在 abi 文件中，可以直接复制使用
const contractAddress = "0x24164F46A62a73de326E55fe46D1239d136851d8";
const storageContract = new web3.eth.Contract(simpleStorage, contractAddress);





function App() {
  // 使用 useState（0） 将保存用户声明的 uint256
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  const numberSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await storageContract.methods.set(number).estimateGas();
    const post = await storageContract.methods.set(number).send({
      from: account,
      gas,
    });
  };

  const numberGet = async (t) => {
    t.preventDefault();
    const post = await storageContract.methods.get().call();
    setGet(post);
  };



  return (
    <div className="main">
      <div className="card">
        <form className="form" onSubmit={numberSet}>
          <label>
            Set your uint256:
            <input
              className="input"
              type="text"
              name="name"
              onChange={(t) => setUint(t.target.value)}
            />
          </label>
          <button className="button" type="submit" value="Confirm">
            Confirm
          </button>
        </form>
        <br />
        <button className="button" onClick={numberGet} type="button">
          Get your uint256
        </button>
        {getNumber}
      </div>
    </div>
  );
}

export default App;
