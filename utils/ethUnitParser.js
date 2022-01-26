const { toBn } = require("./bn");

const weiToNum = (
  amount,
  decimals
) => {
  const amt = toBn(amount);
  const dec = toBn(decimals);
  const ten = toBn(10);

  const result = amt.div(ten.pow(dec));
  return result.toFixed();
};

const numToWei = (
  amount,
  decimals
) => {
  const amt = toBn(amount);
  const dec = toBn(decimals);
  const ten = toBn(10);

  const result = amt.times(ten.pow(dec));
  return result.toFixed(0, 1); // rounding mode: Round_down
};

exports.weiToNum = weiToNum;
exports.numToWei = numToWei;
