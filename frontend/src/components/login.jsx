import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login,resgister.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // สำหรับแสดงข้อความข้อผิดพลาด
  const nav = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อคลิกปุ่ม

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.data && response.data.success) { // ตรวจสอบว่า response มี data และ success
        nav('/mainpage'); // นำทางไปยังหน้า mainpage เมื่อสำเร็จ
      } else {
        setError('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    nav('/register'); // นำทางไปยังหน้า register
  };

  return (
    <form onSubmit={handleLoginClick}>
      <label>Log in</label>
      <label>Username : </label>
      <input 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='ชื่อผู้ใช้งาน'
        required // เพิ่ม validation ว่าต้องกรอก
      />
      
      <label>Password : </label>
      <input 
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='รหัสผ่าน'
        required // เพิ่ม validation ว่าต้องกรอก
      />

      <button type="submit">Log in</button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* แสดงข้อความข้อผิดพลาด */}

      <label>ยังไม่มีบัญชีใช่ไหม </label>
      <a href="#" onClick={handleRegisterClick}> ลงชื่อสมัคร </a>
    </form>
  );
};

export default Login;
