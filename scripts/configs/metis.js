
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
      uniswapMarket: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
    },
    // USDO
    {
      underlying: "0x5801D0e1C7D977D78E4890880B8E579eb4943276",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDC
    {
      underlying: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
      priceSource: "0",
      fixedPrice: "1",
    },
    // USDT
    {
      underlying: "0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC",
      priceSource: "1",
    },
    // ETH
    {
      underlying: "0x420000000000000000000000000000000000000a",
      priceSource: "1",
    },
    // NETT
    {
      underlying: "0x90fE084F877C65e1b577c7b2eA64B8D8dd1AB278",
      priceSource: "1",
    },
    // AGORA
    {
      underlying: "0x0ed0ca6872073e02cd3ae005baf04ba43be947fa",
      priceSource: "1",
    },
    // BNB
    {
      underlying: "0x2692BE44A6E38B698731fDDf417d060f0d20A0cB",
      priceSource: "1",
    },
    // Netswap USDT-USDC LP
    {
      underlying: "0x1caD5f8f5D4C0AD49646B2565CC0cA725E4280EA",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-USDT LP
    {
      underlying: "0x4Db4CE7f5b43A6B455D3c3057b63A083b09b8376",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-USDC LP
    {
      underlying: "0xF5988809ac97C65121e2c34f5D49558e3D12C253",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-Metis LP
    {
      underlying: "0x59051B5F5172b69E66869048Dc69D35dB0B3610d",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-Metis LP
    {
      underlying: "0x60312d4EbBF3617d3D33841906b5868A86931Cbd",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap USDT-Metis LP
    {
      underlying: "0x3D60aFEcf67e6ba950b499137A72478B2CA7c5A1",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap Metis-USDC LP
    {
      underlying: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap WETH-NETT LP
    {
      underlying: "0xC8aE82A0ab6AdA2062B812827E1556c0fa448dd0",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-USDT LP
    {
      underlying: "0x7D02ab940d7dD2B771e59633bBC1ed6EC2b99Af1",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap NETT-USDC LP
    {
      underlying: "0x0724d37522585E87d27C802728E824862Dc72861",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Netswap BNB-NETT LP
    {
      underlying: "0x3bF77b9192579826f260Bc48F2214Dfba840fcE5",
      priceSource: "5",
      uniLpCalcParams: UniLpCalcParams.Netswap,
    },
    // Puff NETT-USDC
    {
      underlying: "0xaF8993DFdbe39A9c606D75aBA1e542D7E3090956",
      priceSource: "4",
      repointedAsset: "0x0724d37522585E87d27C802728E824862Dc72861",
    },
    // Puff Metis-USDC
    {
      underlying: "0x6c7eb3942BaF403090B89bC5032698Db5f45d273",
      priceSource: "4",
      repointedAsset: "0x5Ae3ee7fBB3Cb28C17e7ADc3a6Ae605ae2465091",
    },
    // Puff WETH-NETT
    {
      underlying: "0xeF0600F55b48983295445F230E00A8C014cF1a2E",
      priceSource: "4",
      repointedAsset: "0xC8aE82A0ab6AdA2062B812827E1556c0fa448dd0",
    },
    // Puff NETT-Metis
    {
      underlying: "0x6394B9246001460d8D78d435A6F30BA69BE41894",
      priceSource: "4",
      repointedAsset: "0x60312d4EbBF3617d3D33841906b5868A86931Cbd",
    },
    // Puff NETT-USDT
    {
      underlying: "0xeA0527234A7ACDfcB63b0B974CD416B18dc0cC33",
      priceSource: "4",
      repointedAsset: "0x7D02ab940d7dD2B771e59633bBC1ed6EC2b99Af1",
    },
    // Puff USDT-USDC
    {
      underlying: "0xE0F94fEE7a5318E10Fd0FCf23A4735208f1a7E41",
      priceSource: "4",
      repointedAsset: "0x1caD5f8f5D4C0AD49646B2565CC0cA725E4280EA",
    },
    // Puff WETH-USDT
    {
      underlying: "0x118F9bBC098647b1b73e6B1981A07f943151245D",
      priceSource: "4",
      repointedAsset: "0x4Db4CE7f5b43A6B455D3c3057b63A083b09b8376",
    },
    // Puff WETH-USDC
    {
      underlying: "0xf7283835b9F4dcB24dFB0d8ceC8651619Ccb376a",
      priceSource: "4",
      repointedAsset: "0xF5988809ac97C65121e2c34f5D49558e3D12C253",
    },
    // Puff WETH-Metis
    {
      underlying: "0xdfC367a1f270E7c2AE6129B1De3D146B69cbcc15",
      priceSource: "4",
      repointedAsset: "0x59051B5F5172b69E66869048Dc69D35dB0B3610d",
    },
    // Puff USDT-Metis
    {
      underlying: "0x41385Fe12F33cd19DdA784e073ae459050717EEB",
      priceSource: "4",
      repointedAsset: "0x3D60aFEcf67e6ba950b499137A72478B2CA7c5A1",
    },
    // Puff BNB-NETT
    {
      underlying: "0x51E741579c6ac32AAfd9B555Ed08a82106555Cbe",
      priceSource: "4",
      repointedAsset: "0x3bF77b9192579826f260Bc48F2214Dfba840fcE5",
    },
    // Puff WETH-Metis v2
    {
      underlying: "0x34F88c1137E6986c7eb864054688311960C2b12b",
      priceSource: "4",
      repointedAsset: "0x59051B5F5172b69E66869048Dc69D35dB0B3610d",
      symbol: "puffNetswapWETH-METIS-v2",
    },
  ],

  cTokenConfigs: {
    cTokens: [
      "0x7759eeb5365E94428BF46A26567c49c25ee5b319",   // kUSDO
      "0xcFd482DcE13cA1d27834D381AF1b570E9E6C6810",   // kMetis
      "0x6D11F074131E3FC61C983cCe538F5D0ca3553c0F",   // kUSDC
      "0x4b45B1905Cd1dC18eDad134d2E43f5043e1E157c",   // kUSDC
      "0x2E9347dda00B3ec1b188963b590ca1eCBD73145A",   // kWETH
      "0x5f87B34BFa147Ac23F25786Bba6C1b1b06B45dC8",   // kNETT
      "0x7754404DdB9F5B318bE165426eBa36d0c69D86B2",   // apUSDO
      "0xE85A1ae1A2A21135c49ADEd398D3FD5Ed032B28e",   // apMetis
      "0x883469F88b94adE82343490d9e68C58DaFfe0B33",   // apm.USDC
      "0x89d7926c60D508863a144662a0B7ff1D4B30Fbaf",   // apm.USDT
      "0xf8118241eb25A09B314c17E2A6923cCC72543A47",   // appuffNetswapNETT-M.USDC
      "0x3b885BD5CD9DeED0d91770773627bB22E54f0Ff0",   // appuffNetswapNETT-BNB
      "0x4f663934f268975Fddc857E96B913F964Bfad25D",   // appuffNetswapMETIS-M.USDC
      "0x4121D9F86b9eD8F1E5Adbe3E85FBA335fcAb2948",   // appuffNetswapNETT-WETH
      "0x415332a107005E93c8aA5f00A34df8529e3e2b7b",   // appuffNetswapNETT-METIS
      "0x13f6501994A51D77B160cb9333E3D2A460cF8e8B",   // appuffNetswapNETT-M.USDT
      "0x310eE8262cdE9C297B25BDF42d234b38495bdDcE",   // appuffNetswapm.USDT-M.USDC
      "0x535119257F0126291AbC52Fc3C43E3FaE965e655",   // appuffNetswapWETH-M.USDT
      "0x60fBF2e945B73591f18B44d3E84c12Ee517c6c2C",   // appuffNetswapWETH-M.USDC
      "0xbC4f3a42094Bf8088C9F6749Cc1fBf919F425dd5",   // appuffNetswapWETH-METIS
      "0x5891D61795F3037054ABe464d681b83b5355A707",   // appuffNetswapMETIS-M.USDT
      "0x131728D0a0cd3788FCBe802Ad1259Ea55948d204",   // appuffNetswapWETH-METIS
      "0xE86776d75Ae807F5dD062C366e52a2758AD176ad",   // appuffNetswapm.USDT-M.USDC
    ],
  }
};