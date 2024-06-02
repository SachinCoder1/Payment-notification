import { create } from "@web3-storage/w3up-client";

export const storageClient: any = async () => {
  try {
    console.log("calling storage client: ");
    const client = await create();
    const myAccount = await client.login("sachinhlo232@gmail.com");
    while (true) {
      const res = await myAccount.plan.get();
      if (res.ok) break;
      console.log("Waiting for payment plan to be selected...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await client.setCurrentSpace(
      `did:key:${process.env.NEXT_PUBLIC_WEB3_STORAGE_DID}`
    );
    console.log("client:", client)

    return client;

  } catch (error) {
    console.log("err: ", error);
  }
};

export const uploadToIpfs = async (data: any) => {
  try {
    const client = await storageClient();
    console.log("jsonObect", data);
    const jsonString = JSON.stringify(data);
    const jsonBlob = new Blob([jsonString], { type: "application/json" });
    const jsonFile = new File([jsonBlob], "data.json");
    const cid = await client.uploadFile(jsonFile);
    console.log(`Stored file with CID: ${cid}`);
    return cid;
  } catch (error) {
    console.log("error occured while uploading:", error);
  }
};
