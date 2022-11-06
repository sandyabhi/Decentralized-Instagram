import { Contract, ethers, providers } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { formatEther } from "ethers/lib/utils";
import { CONTRACT_ADDRESS, abi } from "../constants";

export const ProfileCard = ({ img, txt, author, tip }) => {
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

  return (
    <div className="max-w-sm  bg-gradient-to-b from-blue-900 to-black rounded-lg border border-gray-200 shadow-md">
      <img className="rounded-t-lg" src={`https://${img}.ipfs.w3s.link`} />
      <div className="px-3 h-30">
        <p className="text-base">{txt}</p>
      </div>
      <div className="pt-4 mb-3 flex justify-center items-center">
        <p className="p-1 w-[50%] items-center  text-sm bg-gradient-to-br from-blue-500 to-black rounded-md shadow-lg text-center">
          {tip.toString()}
        </p>
      </div>
    </div>
  );
};
