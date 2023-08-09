import { useSession } from "next-auth/react";
import React from "react";

export default function Profile() {
    const { data } = useSession();

    return (
        <div className="flex-1 rounded bg-blue-500 p-3 px-5 py-2 text-lg text-white shadow-md">
            <p>Kelas : 7C</p>
            <p>Nama : {data?.user?.user?.username}</p>
            <p>NIS : {data?.user?.user?.nis}</p>
            <p>Alamat : {data?.user?.user?.alamat}</p>
            <p>Tanggal Lahir : {data?.user?.user?.tgl}</p>
        </div>
    );
}
