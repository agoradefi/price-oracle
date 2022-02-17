
/**
 * Defining a config
 * - underlying - address
 * - priceSource
 * - LP pair address (only for first base config)
 * - symbol (optional)
 * 
 * NOTE - The first config is treated as the base config. For aurora it should be NEAR/stableCoin
 * 
 * Defining price source
 * 0 - FIXED_USD          -> implies the fixedPrice is a constant multiple of the USD price (which is 1)
 * 1 - UNISWAP            -> implies the price is fetched from uniswap
 * 2 - POSTER             -> implies the price is posted externally
 * 3 - EXTERNAL_ORACLE    -> implies the price is read externally
 * 4 - REPOINT            -> implies the price is repointed to other asset's price
 * 5 - UNI_V2_LP          -> implies the price is computed as UniV2 LP pair
 * 6 - CURVE_LP           -> implies the price is computed as Curve Finance LP
 * 
 */

module.exports = {
  twapWindow: "14400",   // in seconds
  baseAsset: "NEAR",
  baseAssetAddr: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
  UniswapV2Router: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
  basePriceDecimals: "18",
  tokenConfigs: [
    // base config - NEAR/USDC
    {
      underlying: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
      priceSource: "1",
      uniswapMarket: "0xa9eded3E339b9cd92bB6DEF5c5379d678131fF90",
    },
    // USDO
    {
      underlying: "0x5801D0e1C7D977D78E4890880B8E579eb4943276",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDC
    {
      underlying: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDT
    {
      underlying: "0x4988a896b1227218e4A686fdE5EabdcAbd91571f",
      priceSource: "0",
      fixedPrice: "1",
    },
    // WETH
    {
      underlying: "0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB",
      priceSource: "1",
    },
    // WBTC
    {
      underlying: "0xF4eB217Ba2454613b15dBdea6e5f22276410e89e",
      priceSource: "1",
    },
    // Trisolaris
    {
      underlying: "0xFa94348467f64D5A457F75F8bc40495D33c65aBB",
      priceSource: "1",
    },
    // AGORA
    {
      underlying: "0xb65b19C1d017f86B4D5cf77934D4C0B85Ec8De0D",
      priceSource: "1",
    },
  ],

  cTokenConfigs: {
    cTokens: [
      "0x8D58F817CBd20ea9a6494C9f2AE141eD604A92c8",
      "0x34d4159356EBC8Bcc1d3EB2bA5DAD83F7D86d23c",
      "0x3bc26221e9D8D80BfB0c8f7Ae3202f9f9684225d",
      "0xa5DF15ac98c2E02F63e0bfAb0ADEE4256CF5bb86",
      "0x6aD4B65a3b5236626388481ef962F535C911905F",
      "0x32E005cf53dcAd86827330739b968e87dB726fF1",
      "0xA825839f183999aF8cBDF0452a4eE8105a0b462E",
      "0x920e8B76fC14589D38EBB0Ac7387855C12AB5722",
    ],
  }
};