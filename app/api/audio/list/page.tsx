// app/audio/list/page.tsx
"use client"
import React, { useEffect, useState } from 'react';

const MusicListPage = () => {
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        const fetchMusics = async () => {
            const response = await fetch('/api/audio');
            const data = await response.json();
            setMusics(data.musics);
        };

        fetchMusics();
    }, []);

    return (
        <div>
            <h1>Uploaded Music List</h1>
            <ul>
                {musics.map((music) => (
                    <li key={music.id}>{music.title} by {music.singer}</li>
                ))}
            </ul>
        </div>
    );
};

export default MusicListPage;