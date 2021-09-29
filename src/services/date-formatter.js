function formatDate(date) {
  // format the date
  // add leading zeroes to single-digit day/month/hours/minutes
  if (typeof date == 'number') date = new Date(date);

  let d = date;
  let dateParts = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '0' + d.getHours(),
    '0' + d.getMinutes(),
    '0' + d.getSeconds(),
  ];

  // take last 2 digits of every component
  dateParts = dateParts.map((component) => component.slice(-2));
  dateParts.push(('00' + d.getMilliseconds()).slice(-3));

  // join the parts into date (string) (and add the year)
  return `${dateParts[0]}.${dateParts[1]}.${date.getFullYear()} ${
    dateParts[2]
  }:${dateParts[3]}:${dateParts[4]} ${dateParts[5]}`;
}

export { formatDate };
