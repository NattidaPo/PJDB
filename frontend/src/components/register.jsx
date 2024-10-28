import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login,resgister.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // สำหรับจัดการข้อผิดพลาด
  const [success, setSuccess] = useState(null); // สำหรับข้อความสำเร็จ
  const nav = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่
    setError(null); // รีเซ็ตข้อความข้อผิดพลาด

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('ลงทะเบียนสำเร็จ!'); // แสดงข้อความสำเร็จ
        setTimeout(() => {
          nav('/'); // นำทางกลับหลังจากสำเร็จ
        }, 2000);
      } else {
        setError(data.msg || 'เกิดข้อผิดพลาดในการลงทะเบียน'); // แสดงข้อความข้อผิดพลาด
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ'); // แสดงข้อผิดพลาดในการเชื่อมต่อ
    }
  };

  return (
    <>
      <form onSubmit={handleRegisterClick}>
        <label>Register</label>
        {error && <div className="error">{error}</div>} {/* แสดงข้อความข้อผิดพลาด */}
        {success && <div className="success">{success}</div>} {/* แสดงข้อความสำเร็จ */}
        
        <label>Username: </label>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='ชื่อผู้ใช้งาน'
        />

        <label>Password: </label>
        <input 
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='รหัสผ่าน'
        />

        <label>Email: </label>
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='อีเมล์'
        />

        <button type='submit'> ยืนยัน </button>
      </form>
    </>
  );
};

export default Register;
