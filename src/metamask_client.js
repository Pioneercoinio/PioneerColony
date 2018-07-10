import MetaMaskConnector from 'node-metamask';

import NetworkLoader from '@colony/colony-js-contract-loader-network';
import { providers } from "ethers";
import EthersAdapter from "@colony/colony-js-adapter-ethers";
import ColonyNetworkClient from "@colony/colony-js-client";

import { createPioneerColony } from './pioneercolony';

const PRT_ADDRESS = "0xf8686353053b8a9b1b2c71b7b9f38b64e10979d5";

const connector = new MetaMaskConnector({
  port: 3333, // this is the default port
  onConnect() { console.log('MetaMask client connected') }, // Function to run when MetaMask is connected (optional)
});

console.log('Now go to http://localhost:3333 in your MetaMask enabled web browser.');

connector.start().then(() => {

  const loader = new NetworkLoader({ network: "rinkeby" });

  const provider = new providers.Web3Provider(connector.getProvider());
  const wallet = provider.getSigner();

  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  });

  const networkClient = new ColonyNetworkClient({ adapter });

  console.log(Object.getPrototypeOf(networkClient));

  const { colonyId, colonyAddress } = createPioneerColony(networkClient, PRT_ADDRESS);

  console.log(`Created Pioneer Colony id: ${colonyId}, address: ${colonyAddress}`);

  // When done close connection and clean up
  connector.stop();
});