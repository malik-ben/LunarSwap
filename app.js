import express from 'express'
const app = express()
const port = process.env.PORT || 3000;

import pkg from "./src/setup.mjs";
const { terra, wallet } = pkg;

const LunaBalance = async () => {
  let balance = await wallet.lcd.bank.balance(wallet.key.accAddress);
  if (balance[0]._coins.length > 0) {
    console.log(balance[0]._coins.uluna.amount);
    return balance[0]._coins.uluna.amount
  } else {
    console.log("you have no coins")
    return 0
  }

};



const BLunaBalance = async () => {
  const balance = await terra.wasm.contractQuery(process.env.BLUNA_MAIN, {
    balance: { address: wallet.key.accAddress },
  });
  console.log(balance.balance);
  return balance.balance
};



app.get('/', async (req, res) => {
  
    var luna = await LunaBalance();
    var bluna = await BLunaBalance();
    res.send(`${luna} and ${bluna}`)
  
})
app.listen(port, () => {
  console.log(`Any changes are on app listening at http://localhost:${port}`)
})

