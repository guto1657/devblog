const mongoose = require('mongoose');

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Conectamos ao mongoose com sucesso!');
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
};

main();

module.exports = mongoose;
