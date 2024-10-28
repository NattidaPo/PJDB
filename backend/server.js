const express = require('express');
const db = require('./db'); // นำเข้าการเชื่อมต่อฐานข้อมูล
const cors = require('cors');
const authRoutes = require('./routes/LogRegis');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // อนุญาตให้เข้าถึงเฉพาะที่มาจาก URL นี้
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // อนุญาต HTTP methods ที่ต้องการ
    credentials: true, // อนุญาตให้มีการส่งข้อมูล cookies ถ้ามีการใช้งาน
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', authRoutes);

// เริ่ม server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// ปิดการเชื่อมต่อฐานข้อมูลเมื่อเซิร์ฟเวอร์หยุดทำงาน
process.on('SIGINT', () => {
    db.end(err => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit();
    });
});
