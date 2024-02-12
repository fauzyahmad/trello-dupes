const helperInputRule = (value: string) => {
  if(value === null || typeof value === 'undefined') return [""]
  switch (value) {
    case "onlyNumber":
      return ["[^0-9]"];
    case "onlyAlphabet":
      return ["[^a-z .-]"];
    case "onlyAlphabetNumber":
      return ["[^a-z0-9\s.-]"];
    case "onlyPhoneNumber":
      return ["^[^1-9][0-9]{0,9}", "[^0-9]"];
    default:
      return [""];
  }
}

export const transformRegexOnchange = (value: string) => {
  const valueData = helperInputRule(value);
  const newRegexArray = valueData.map((item) => {
    return new RegExp(item, "gi" ?? "");
  })
  return newRegexArray;
}
