'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleClick = () => {
    router.push('/audio/upload');
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const res = await fetch('/api/redis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value }),
    });

    if (res.ok) {
      alert('Data stored in Redis');
    } else {
      alert('Failed to store data');
    }
  };

  const handleRedirect = () => {
    window.location.href = 'https://www.baidu.com';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', position: 'relative' }}>
    <div style={{ position: 'absolute', top: '100px', left: '30px', textAlign: 'left', maxWidth: '3000px', fontSize: '14px', lineHeight: '1.5' }}>
        Music List Management:<br />
        GET /api/audio/list: Retrieves all music lists.<br />
        POST /api/audio/list:
      Creates a new music list for a user. Validates the user and saves the list.<br />
        PUT /api/audio/list: Adds a music track to an existing list.<br />
        GET /api/audio: Retrieves all music details.<br />
        POST /api/audio: Handles file uploads for music tracks and cover images
    </div>
    <div className="lyrics-section" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', textAlign: 'right', fontSize: '16px', lineHeight: '1.4' }}>
        <h2 className="text-lg font-bold">青花瓷</h2>
        <p className="text-sm mt-2">
            素雅的青花瓷，<br />
            悠远的情思，<br />
            你的笑，藏着烟雨的霖。
        </p>
    </div>
      
      <button 
        onClick={handleClick} 
        style={{ 
          backgroundColor: 'blue', 
          width: '200px', 
          height: '100px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '400px' 
        }}
      >
        page jump
      </button>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Please enter key" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} 
          style={{ marginBottom: '20px', padding: '5px', fontSize: '16px', width: '200px' }}
        />
        <input 
          type="text" 
          placeholder="Please enter value" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          style={{ marginBottom: '20px', padding: '5px', fontSize: '16px', width: '200px' }}
        />
        <button 
          type="submit" 
          style={{ padding: '50px 100px', fontSize: '24px', cursor: 'pointer', backgroundColor: 'red' }}
        >
          redis send
        </button>
      </form>
      <button 
        onClick={handleRedirect} 
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          backgroundColor: 'black', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Baidu
      </button>
    </div>
  );
}