import { Contract, ethers, providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { formatEther } from "ethers/lib/utils";
import { CONTRACT_ADDRESS, abi } from "../constants";

export const Card = ({ img, txt, author, tip }) => {
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected]);

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const getDaoContractInstance = (providerOrSigner) => {
    return new Contract(CONTRACT_ADDRESS, abi, providerOrSigner);
  };

  const buyMeCoffee = async (id) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = getDaoContractInstance(signer);

      const txn = await contract.buyMeCoffee(0);
      setLoading(true);

      console.log(txn);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm  bg-gradient-to-b from-blue-900 to-black rounded-lg border border-gray-200 shadow-md">
      <img className="rounded-t-lg" src={`https://${img}.ipfs.w3s.link`} />
      <div className="px-3 h-30">
        <p className="text-base">{txt}</p>
      </div>
      <div className="pt-4 mb-3 flex justify-center items-center">
        <button
          className="p-1 w-24 items-center text-gray-50 text-sm bg-gradient-to-r from-indigo-900 to-violet-600 rounded-md shadow-lg"
          onClick={() => buyMeCoffee({ author })}
        >
          Tip
        </button>
      </div>
    </div>
  );
};

/*
<div className="mb-5 block rounded-lg border bg-white border-gray-200 shadow-md;">
      <img className="w-full" src={`https://${img}.ipfs.w3s.link`} />
      <div className="px-6 py-4 h-30">
        <p className="text-gray-700 text-base bg-blue-50">{txt}</p>
      </div>
      <div className="px-2 mb-3 flex justify-center items-center">
        <button
          className="p-2 w-22 items-center text-gray-50 text-sm bg-gradient-to-r from-indigo-900 to-violet-600 rounded-full shadow-lg"
          onClick={() => buyMeCoffee({ author })}
        >
          Subscribe
        </button>
      </div>
    </div>
*/
