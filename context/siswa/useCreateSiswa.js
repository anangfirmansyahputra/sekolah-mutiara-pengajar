import { useContext } from "react";
import { AdminContext } from "../index";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function useCreateSiswaContext() {
    const context = useContext(AdminContext);
    const [loading, setLoading] = context.loading;
    const [config] = context.config;
    const router = useRouter();

    const handleCreateSiswa = async (payload, config) => {
        setLoading(true);

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/siswa", payload, config);
            const data = await res.data;
            if (data) {
                Swal.fire("Sukses", "Tambah data siswa berhasil", "success").then(() => {
                    router.push("/siswa");
                });
            } else {
                Swal.fire("Gagal", "Gagal menambahkan data siswa", "error");
            }
        } catch (err) {
            console.log(err.response.data.message);
            Swal.fire("Gagal", err.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleCreateSiswa,
    };
}
