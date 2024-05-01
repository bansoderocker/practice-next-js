export const getInitialChar = (name: string) => {
  if (name.length > 0) {
    let lstName = name.split(" ");
    if (lstName.length > 0) {
      return lstName[0].substring(0, 1) + lstName[1].substring(0, 1);
    }
  }
};

export const tripDateYearFormat = (date: string) => {
  if (date.length > 0 && date.split("-").length == 3) {
    let arrDate = date.split("-");
    if (arrDate[2].length == 2) {
      arrDate[2] = "20" + arrDate[2];
    }
    return arrDate[0] + "-" + arrDate[1] + "-" + arrDate[2];
  }
  return date;
};
