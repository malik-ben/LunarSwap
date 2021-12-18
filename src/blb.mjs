import pkg from "./setup.mjs";
const { terra, wallet, LUNA_BLUNA_PAIR } = pkg;

const balance = async () => {
  let bale = await wallet.lcd.bank.balance(wallet.key.accAddress);
  console.log(bale[0]);
};

balance();

async function getInfo() {
    const result = await terra.wasm.contractQuery(LUNA_BLUNA_PAIR, {
      pool: {},
    });
    let priceBL = result.assets[0].amount / result.assets[1].amount;
    let priceLB = result.assets[1].amount / result.assets[0].amount;
    console.log(result.assets[0].info);
    console.log(`price BLuna / Luna  = ${priceBL}`);
    console.log(`price Luna / BLuna  = ${priceLB}`);
    console.log("\n");
    console.log(`Total share: ${result.total_share}`);

    console.log("\n Loop pool:\n")

    const result_loop = await terra.wasm.contractQuery(process.env.LOOP_LUNA_BLUNA_PAIR_MAIN, {
      pool: {},
    });
    let priceBL_loop = result_loop.assets[0].amount / result_loop.assets[1].amount;
    let priceLB_loop = result_loop.assets[1].amount / result_loop.assets[0].amount;
    console.log(result_loop.assets[0].info);
    console.log(`price BLuna / Luna  = ${priceBL_loop}`);
    console.log(`price Luna / BLuna  = ${priceLB_loop}`);
    console.log("\n");
    console.log(`Total share: ${result_loop.total_share}`);
}
getInfo()