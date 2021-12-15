import pkg from "@terra-money/terra.js";
const { MsgExecuteContract } = pkg;
import pkg from "./setup.mjs";
const { terra, wallet, BLUNA, LUNA_BLUNA_PAIR } = pkg;

async function cnstx(price) {
  const execute = new MsgExecuteContract(
    wallet.key.accAddress, // sender
    BLUNA, // contract account address
    {
      increase_allowance: {
        spender: LUNA_BLUNA_PAIR,
        amount: "10000000000001",
      },
    },
    { uluna: 10000 } // query msg
  );
  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });
  const txResult = await terra.tx.broadcast(executeTx);
}
cnstx(priceLB);