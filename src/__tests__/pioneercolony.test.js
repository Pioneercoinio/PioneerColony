// Import the prerequisites
import { providers, Wallet, Contract } from "ethers";
import { EthersAdapter } from "@colony/colony-js-adapter-ethers";
import { TrufflepigLoader } from "@colony/colony-js-contract-loader-http";

// Import the ColonyNetworkClient
import { ColonyNetworkClient } from "@colony/colony-js-client";

import { createPioneerColony } from "../pioneercolony";

const Token = artifacts.require("Token");

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
const provider = new providers.JsonRpcProvider("http://localhost:8545/");

// The following methods use Promises
const truffleClient = async () => {
  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  const { privateKey } = await loader.getAccount(0);

  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(privateKey, provider);

  // Create an adapter (powered by ethers)
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  });

  // Connect to ColonyNetwork with the adapter!
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // Let"s deploy a new ERC20 token for our Colony.
  // You could also skip this step and use a pre-existing/deployed contract.
  const tokenAddress = await networkClient.createToken({
    name: "Pioneer Reputation Token",
    symbol: "PRT"
  });
  console.log("Token address: " + tokenAddress);

  return { networkClient, tokenAddress };
};

describe("Create Pioneer Colony", () => {
  test(
    "Example logs successful results",
    async () => {
      const { networkClient, tokenAddress } = truffleClient();

      const token = new Contract(tokenAddress, abi, provider);
      
      const { colonyId, colonyAddress } = createPioneerColony(networkClient, tokenAddress);

      expect(colonyId).not.toBeNull();
      expect(colonyAddress).not.toBeNull();
    },
    20000
  );
});
