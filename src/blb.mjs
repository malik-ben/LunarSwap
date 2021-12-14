import pkg from './setup.mjs';
const {terra, wallet} = pkg;

const balance = async () => {
  let bale = await wallet.lcd.bank.balance(wallet.key.accAddress);
  console.log(bale[0]);
};

balance();
let count = 0;
const interval = setInterval(getInfo, 1000);
async function getInfo() {
  if(count == 3){
    clearInterval(interval)
  }
  const result = await terra.wasm.contractQuery(
    process.env.LUNA_LUNAX_PAIR_MAIN,
    { pool: {} }
  );
  let priceBL = result.assets[0].amount / result.assets[1].amount;
  let priceLB = result.assets[1].amount / result.assets[0].amount;
  console.log(result.assets[0].info);
  console.log(`price BLuna / Luna  = ${priceBL}`);
  console.log(`price Luna / BLuna  = ${priceLB}`);
  console.log("\n");
  console.log(`Total share: ${result.total_share}`);
  count++;

}

