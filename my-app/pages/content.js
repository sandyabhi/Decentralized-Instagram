import { Contract, providers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { Card } from "../components/Card";
import Layout from "../components/Layout";
import { CONTRACT_ADDRESS, abi } from "../constants";

function Content() {
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [postdata, setPostdata] = useState("");

  const web3ModalRef = useRef();

  //////////////////////////////
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

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPost = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const contract = getDaoContractInstance(provider);

      const txn = await contract.getAllPost();
      setLoading(true);

      let posts = await Promise.all(
        txn.map(async (i) => {
          console.log(i);
          let post = {
            auth: i.author,
            id: i.id,
            tip: i.tipAmount,
            txt: i.postTxt,
            img: i.postImg,
          };

          return post;
        })
      );

      setPostdata(posts);

      console.log(posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

      getAllPost();
    }
  }, [walletConnected]);

  return (
    <Layout title="Content">
      <div className="p-4 bg-slate-900">
        <p className="text-center text-xl border-1 mb-3">Explore</p>
        <main>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {postdata.length > 1 ? (
              postdata.map((post, key) => (
                <Card
                  key={key}
                  img={post.img}
                  txt={post.txt}
                  author={post.auth}
                  tip={post.tip}
                />
              ))
            ) : (
              <div className="text-xl p-3">Loading...</div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default Content;
