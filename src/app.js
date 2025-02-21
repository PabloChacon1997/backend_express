const express = require('express');
const { config } = require('dotenv');
const { connectDB } = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/userRoutes');

config();

connectDB();

const app = express();
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`REST API esta ejecutandose en el puerto ${PORT}`);
});