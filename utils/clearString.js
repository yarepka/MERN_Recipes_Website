module.exports = function (arr) {
  let deleteIndexes = {};
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/  +/g, ' ').trim();
    if (arr[i] === '') deleteIndexes[i] = 1;
  }

  return arr.filter((el, index) => !deleteIndexes[index]);
}