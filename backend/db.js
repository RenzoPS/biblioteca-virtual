const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/booksdb'); 
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('❌ Error al conectar MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// Esta es la forma mas comun de hacer una conexion con la db de manera LOCAL