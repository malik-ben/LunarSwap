import express from 'express'
const app = express()
const port = process.env.PORT || 3000;

import pkg from "./src/setup.mjs";
const { terra, wallet, BLUNA } = pkg;

const LunaBalance = async () => {
  let balance = await wallet.lcd.bank.balance(wallet.key.accAddress);
  console.log(balance[0]._coins.uluna.amount)
  if (balance[0]._coins.uluna.amount > 0) {
    console.log(balance[0]._coins.uluna.amount);
    return balance[0]._coins.uluna.amount
  } else {
    console.log("Sorry you have no coins")
    return 0
  }

};



const BLunaBalance = async () => {
  const balance = await terra.wasm.contractQuery(BLUNA, {
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
  console.log(`${process.env.NODE_ENV}  Any changes are on app listening at http://localhost:${port}`)
  
})

