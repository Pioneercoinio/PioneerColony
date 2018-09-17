import { toBN } from "web3-utils";

export default async function createPioneerColony(networkClient, tokenAddress) {
  // Create a cool Colony!
  const {
    eventData: { colonyId, colonyAddress }
  } = await networkClient.createColony.send({ tokenAddress });

  // Congrats, you've created a Colony!
  console.log(`Colony ID: ${colonyId}`);
  console.log(`Colony address: ${colonyAddress}`);

  // For a colony that exists already, you just need its ID:
  const colonyClient = await networkClient.getColonyClient(colonyId);

  // const rewardAmount = 115000;

  // // Assign reward amount to colony
  // await colonyClient.token.transfer.send({
  //   destinationAddress: colonyAddress,
  //   amount: rewardAmount
  // });

  return { colonyId, colonyAddress };
}
