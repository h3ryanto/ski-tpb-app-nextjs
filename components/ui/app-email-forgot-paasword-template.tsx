import * as React from 'react';
// import Image from 'next/image';

interface EmailTemplateProps {
    name: string;
    token: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name, token
}) => (
    <div >

        <div className="p-6">
            <p className="text-gray-500 mt-2">Hello, {name}!</p>
            <p className="text-gray-500 mt-2">Kami telah mengirimkan email ini kepada Anda sebagai tanggapan atas permintaan Anda untuk mengatur ulang password.</p>
            <p className="text-gray-500 mt-2">Untuk reset password anda, silahkan ikuti link dibawah ini:</p>
            <a href={`https://ski-tpb-app-nextjs.vercel.app/reset_password?token=${token}`} >Reset Password</a>
            <p className="text-gray-500 mt-2">Harap abaikan email ini jika Anda tidak meminta perubahan Password.</p>
        </div>

        <div >
            <br></br>
            <br></br>
            <p className="text-gray-500 mt-2">Salam</p>
            <p className="text-gray-500 mt-2">Administrator</p>
        </div>

    </div>
);