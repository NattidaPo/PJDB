const express = require('express');
const db = require('../db');  // เชื่อมต่อฐานข้อมูลจาก server.js
const e = require('express');
const app = express();

// Register
app.post('/register', (req, res) =>{
  const newUser = {username, password, email} = req.body;
  db.query("INSERT INTO users (username, password, email) VALUE (?, ?, ?)", 
    [newUser.username, newUser.password, newUser.email], 
    (err, results) =>{
      if(err){
          res.status(400).json({msg: "ฐานข้อมูลขัดข้อง, ไม่สามารถลงทะเบียนได้"});
          console.log(err)
      }
      res.json(results);
  })
});

//Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT username FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        res.status(400).json({ msg: "ฐานข้อมูลขัดข้อง, ไม่สามารถ log in ได้" });
        console.log(err);
      }
      res.json(results);
    }
  );
});

//สร้าง API สำหรับดึงข้อมูลจากตาราง ie_data
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM ie_data';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      console.log(err);
      return;
    }
    // ส่งข้อมูลออกเป็น JSON
    res.json(results);
  });
});

app.post('/Add_data', (req, res) => {
  // รับข้อมูลจาก req.body
  const { Data, SP_Comp, CPI, GS10, CAPE, TR_CAPE, Yield, Monthly_TotalBond, R10Year_Stock, R10Year_Bonds } = req.body;
  
  // ตรวจสอบว่าค่าเหล่านี้ถูกต้อง ไม่ว่างเปล่า
  if (!Data || !SP_Comp || !CPI || !GS10 || !CAPE || !TR_CAPE || !Yield || !Monthly_TotalBond || !R10Year_Stock || !R10Year_Bonds) {
    return res.status(400).json({ msg: "ข้อมูลไม่ครบถ้วน" });
  }

  // คำสั่ง SQL สำหรับแทรกข้อมูลลงในตาราง data_stock
  const query = `INSERT INTO ie_data (
    Data, 
    SP_Comp, 
    CPI, 
    GS10, 
    CAPE,
    TR_CAPE, 
    Yield, 
    Monthly_TotalBond, 
    R10Year_Stock, 
    R10Year_Bonds
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

  // รันคำสั่ง SQL โดยส่งค่าจาก req.body ลงไปในฐานข้อมูล
  db.query(query, [Data, SP_Comp, CPI, GS10, CAPE, TR_CAPE, Yield, Monthly_TotalBond, R10Year_Stock, R10Year_Bonds], 
  (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Server error');
    }
    // ส่งข้อมูลผลลัพธ์กลับเป็น JSON
    res.json({ msg: 'Data added successfully', results });
  });
});

module.exports = app;

