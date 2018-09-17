import MetaMaskConnector from "node-metamask";

import Web3 from "web3";
import NetworkLoader from "@colony/colony-js-contract-loader-network";
import { providers } from "ethers";
import EthersAdapter from "@colony/colony-js-adapter-ethers";
import ColonyNetworkClient from "@colony/colony-js-client";

import createPioneerColony from "./pioneercolony";

const PRT_ADDRESS = "0xf8686353053b8a9b1b2c71b7b9f38b64e10979d5";

function getNetworkFromId(id) {
  return (
    {
      1: "mainnet",
      3: "ropsten",
      4: "rinkeby"
    }[id] || "local"
  );
}

const connector = new MetaMaskConnector({
  port: 3333, // this is the default port
  onConnect() {
    console.log("MetaMask client connected");
  } // Function to run when MetaMask is connected (optional)
});

console.log("Now go to http://localhost:3333 in your MetaMask enabled web browser.");

connector
  .start()
  .then(async () => {
    // Create instance of web3 and set metamask provider
    const web3 = new Web3(connector.getProvider());

    // Get network from instance of web3 with metamask provider
    const network = getNetworkFromId(await web3.eth.net.getId());

    console.log('Metamask is connected to the ' + network + ' network');

    const loader = new NetworkLoader({ network });
    const provider = new providers.Web3Provider(web3.currentProvider, network);
    const wallet = provider.getSigner();

    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet
    });

    const networkClient = new ColonyNetworkClient({ adapter });
    await networkClient.init();

    console.log(`Creating Pioneer Colony`);
    const { colonyId, colonyAddress } = await createPioneerColony(networkClient, PRT_ADDRESS);

    console.log(`Created Pioneer Colony id: ${colonyId}, address: ${colonyAddress}`);

    // When done close connection and clean up
    connector.stop();
  })
  .catch(() => {
    console.log("Error when starting connector.");
  });
