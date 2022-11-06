export const CONTRACT_ADDRESS = "0xafA7AA3B5680293521b98552B234cb93B8BD3a53";

export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "hash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tipAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable",
        name: "author",
        type: "address",
      },
    ],
    name: "PostTipped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address payable",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "postTxt",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "postImg",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tipAmount",
        type: "uint256",
      },
    ],
    name: "postCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "postTxt",
        type: "string",
      },
      {
        internalType: "string",
        name: "postImg",
        type: "string",
      },
    ],
    name: "addPost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "buyMeCoffee",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPost",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "author",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "postTxt",
            type: "string",
          },
          {
            internalType: "string",
            name: "postImg",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tipAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Social.Post[]",
        name: "_posts",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyPost",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "author",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "postTxt",
            type: "string",
          },
          {
            internalType: "string",
            name: "postImg",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tipAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Social.Post[]",
        name: "_posts",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "profiles",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
