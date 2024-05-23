
// 具体内容直接从编译好的 build/contracts/SimpleStorage.json 中复制过来(abi)
export const simpleStorage = [
    {
        constant: false,
        inputs: [
            {
                name: "x",
                type: "uint256",
            },
        ],
        name: "set",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "get",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
];