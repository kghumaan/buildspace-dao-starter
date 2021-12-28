import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

import dotenv from "dotenv";
dotenv.config();

const app = sdk.getAppModule("0x661ADc44cF28ab5566A8F8769a980890f72838E7");  // address is printed out from script 1

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      // The collection's name, ex. CryptoPunks
      name: process.env.DAO_NAME,
      // A description for the collection.
      description: process.env.DAO_DESCRIPTION,
      // The image for the collection that will show up on OpenSea.
      image: readFileSync("scripts/assets/praying_hands.png"),
      // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
      // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
      // you can set this to your own wallet address if you want to charge for the drop.
      //   primarySaleRecipientAddress: ethers.constants.AddressZero,
      primarySaleRecipientAddress: process.env.WALLET_ADDRESS,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})()