
const { UniLpCalcParams } = require("../../utils/constants");

/**
 * Defining a config
 * - underlying - address
 * - priceSource
 * - LP pair address (only for first base config)
 * - symbol (optional)
 * 
 * NOTE - The first config is treated as the base config. For metis it should be Metis/stableCoin
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
  twapWindow: "3600",   // in seconds
  baseAsset: "Metis",
  UniswapV2Router: "0x1E876cCe41B7b844FDe09E38Fa1cf00f213bFf56",
  basePriceDecimals: "6",
  tokenConfigs: [
    // base config - Metis/USDC
    {
      underlying: "0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000",
      priceSource: "1",
      uniswapMarket: "0xDd7dF3522a49e6e1127bf1A1d3bAEa3bc100583B",
    },
    // USDC
    {
      underlying: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
      priceSource: "0",
      fixedPrice: "1",
    },
    // AGORA
    {
      underlying: "0x0ed0ca6872073e02cd3ae005baf04ba43be947fa",
      priceSource: "1",
      uniswapMarket: "0xc6Eac7FF407EdB9D27463dc1f14FDdcfdF1f887d",
    },
    // AgoraSwap WBTC-m.USDT LP
    {
      underlying: "0x148a0a6d6dc539ee24bea0c1ef45c4c60414711d",
      priceSource: "0",
      fixedPrice: "1",
    },
    // AgoraSwap AGORA-Metis LP
    {
      underlying: "0xc6Eac7FF407EdB9D27463dc1f14FDdcfdF1f887d",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.AgoraSwap,
    },
    // Tethys AGORA-USDC LP
    {
      underlying: "0x5D26F8bFe08b0d8ed74F74ebEb57D1A70bE57B1C",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Tethys,
    },
  ],

  cTokenConfigs: {
    cTokens: [
      "0x41374d88c3b053ccde2a9aCeb2a7E499a127b565",
      "0x13Cb104a1D94A89a260b27DfAAB07C862da622E5",
      "0x5E03c65103f3cA2E9E43907Ef994b8F1110DE1d3",
      "0x7B03C438048e000b2fE7d7e9bAE8a47FdbC6d864",
      "0xF43ea72C651912BDC94C8e7D488cC12ce68c65f4"
    ],
  }
};