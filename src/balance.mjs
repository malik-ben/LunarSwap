import pkgMnemonic from "@terra-money/terra.js";

import pkg from "./setup.mjs";
const { terra, wallet, BLUNA } = pkg;

const LunaBalance = async () => {
  let balance = await wallet.lcd.bank.balance(wallet.key.accAddress);
  if (balance[0]._coins.length > 0) {
    console.log(balance[0]._coins.uluna.amount);
  } else {
    console.log("you have no coins")
  }
};

LunaBalance();

const BLunaBalance = async () => {
  const balance = await terra.wasm.contractQuery(BLUNA, {
    balance: { address: wallet.key.accAddress },
  });
  console.log(balance.balance);
};

BLunaBalance();
