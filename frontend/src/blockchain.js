import Web3 from "web3";

let web3;
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
}

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [/* paste ABI */];

const contract = new web3.eth.Contract(abi, contractAddress);

export const issue = async (hash, ipfs, account) => {
  await contract.methods.issueCertificate(hash, ipfs, account)
    .send({ from: account });
};

export const verify = async (hash) => {
  return await contract.methods.verifyCertificate(hash).call();
};