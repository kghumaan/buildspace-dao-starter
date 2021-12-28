import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x145D19230E0851DACBe65f15991eE694E1ED8239",  // from script 2
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Praying Hands",
        description: "This NFT will give you access to LangarDAO!",
        image: readFileSync("scripts/assets/praying_hands.gif"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()