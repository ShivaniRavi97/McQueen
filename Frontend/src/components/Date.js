const date = isoDate => {
  const iso = new Date(isoDate);
  let year = iso.getFullYear();
  let month = iso.getMonth() + 1;
  let day = iso.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var dateString = day + "/" + month + "/" + year;
  return dateString;
};

export default date;
