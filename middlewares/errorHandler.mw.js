module.exports = (err, req, res, next) => {
  const error = err.original;
  console.log(error.code);
  let errorMesageToSend = 'Some err';
  if (error.code == 23505) {
    errorMesageToSend = "Unique constraint didn't pass";
  }
  res.status(400).send(errorMesageToSend);
};
//TODO Create error handler
