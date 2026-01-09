import { useState, useEffect } from 'react';

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Memperbarui waktu setiap 1 detik
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Membersihkan interval saat komponen dilepas
        return () => clearInterval(interval);
    }, []);

    // Memformat waktu menjadi string HH:MM:SS
    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    };

    const formattedTime = formatTime(time);
    const [hours, minutes] = formattedTime.split(':');


    const date = time.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <div className="flex space-x-3 p-4">
                {/* Jam */}
                <div className="md:text-9xl text-7xl apple-watch text-slate-700 rounded-lg tabular-nums">
                    {hours}
                </div>
                <div className="md:text-9xl text-7xl apple-watch text-slate-700" >:</div>
                {/* Menit */}
                <div className="md:text-9xl text-7xl apple-watch text-slate-700 rounded-lg tabular-nums">
                    {minutes}
                </div>
            </div>

            <div className="md:text-2xl text-xl apple-watch text-slate-500 rounded-lg tabular-nums">
                {date}
            </div>
        </div >
    );
};

export default DigitalClock;