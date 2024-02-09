export const getInitialChar = (name: string) => {
  let lstName = name.split(" ");
  return lstName[0].substring(0, 1) + lstName[1].substring(0, 1);
};

