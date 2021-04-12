module.exports = async page => {
  const castingPage = Number(page);
  if (isNaN(castingPage)) {
    return 0;
  }
  if (castingPage === 1) {
    return 0;
  }
  return castingPage * 5;
};
