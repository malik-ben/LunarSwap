import pkgMsg from "@terra-money/terra.js";
const { MsgExecuteContract } = pkgMsg;
import pkg from "./setup.mjs";
const { terra, wallet } = pkg;



let BL, LB;
//Get pair prices and total share
const makeMove = async () => {
  const result = await terra.wasm.contractQuery(
    process.env.LUNA_BLUNA_PAIR_TEST,
    { pool: {} }
  );
  BL = result.assets[0].amount / result.assets[1].amount;
  LB = result.assets[1].amount / result.assets[0].amount;
  console.log(`\nprice BLuna / Luna  = \x1b[31m${BL}\x1b[0m`);
  console.log(`price Luna / BLuna  = \x1b[32m${LB}\x1b[0m`);
  console.log("\n");
  console.log(`Total share: ${result.total_share}`);
  return { LB, BL };
};




//Get Luna balance
const LunaBalance = async () => {
  let balance = await wallet.lcd.bank.balance(wallet.key.accAddress);
  console.log(parseInt(balance[0]._coins.uluna.amount));
  return parseInt(balance[0]._coins.uluna.amount);
};

//Get Bluna balance
const BLunaBalance = async () => {
  const balance = await terra.wasm.contractQuery(process.env.BLUNA_TEST, {
    balance: { address: wallet.key.accAddress },
  });
  console.log(`BLuna balance is: ${balance.balance}`);
  return parseInt(balance.balance);
};





//Swap function Luna ↔ Bluna, Bluna ↔ Luna
async function goswap() {
  let prices = await makeMove();
  console.log(`BL price  is ${BL} and LB price is ${LB}`, LB > 1.2);

  let contractFunction = "";
  let contractAddress = "";
  let lunaAmount = null;
  let execute = null;

  let amountLuna = await LunaBalance();
  let amountBluna = await BLunaBalance();
  if (amountLuna >= amountBluna) {
    if (LB > 1.035) {
      let amount = amountLuna;
      amount = amount - 1000000;
      console.log(amount);
      contractAddress = process.env.LUNA_BLUNA_PAIR_TEST;
      contractFunction = {
        swap: {
          offer_asset: {
            info: {
              native_token: {
                denom: "uluna",
              },
            },
            amount: amount.toString(),
          },
        },
      };
      lunaAmount = { uluna: amount };
      execute = new MsgExecuteContract(
        wallet.key.accAddress, // sender
        contractAddress,
        contractFunction,
        lunaAmount
      );
    } else {
      console.log("Arbitrage could fail");
    }
  } else {
    if (BL > 0.97) {
      const amount = amountBluna;
      contractAddress = process.env.BLUNA_TEST;
      console.log(`Amount to swap ${amount}`);
      contractFunction = {
        send: {
          contract: process.env.LUNA_BLUNA_PAIR_TEST,
          amount: amount.toString(),
          msg: "eyJzd2FwIjp7fX0=",
        },
      };
      execute = new MsgExecuteContract(
        wallet.key.accAddress, // sender
        contractAddress,
        contractFunction
      );
    }
  }

  if (execute != null) {
      console.log(`executing transation`)
    const executeSwap = await wallet.createAndSignTx({
      msgs: [execute],
    });
    const txResult = await terra.tx.broadcast(executeSwap);
  } else {
      console.log("No transaction to make")
  }
}

try {
  goswap();
} catch (error) {
  console.log(error);
}
