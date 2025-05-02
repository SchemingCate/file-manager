export const getArgumentsObj = (argArr) => {
  const argumentsObj = {};
  const args = argArr.slice(2);
  args.forEach((argPair) => {
    const argPairArr = argPair
      .replace("--", "")
      .replace("=", " ")
      .split(" ");
    argumentsObj[argPairArr[0]] = argPairArr[1];
  });
  return argumentsObj;
};
