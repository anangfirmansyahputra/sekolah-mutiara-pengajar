import { useContext } from "react";
import { AdminContext } from ".";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function useCreatePengajarContext() {
    const contex = useContext(AdminContext);
    const [loading, setLoading] = contex.loading;
    const [config] = contex.config;
    const router = useRouter();

    const handleCreatePengajar = async (payload, config) => {
        setLoading(true);

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/admin/buat-pengajar", payload, config);
            const data = await res.data;
            if (data) {
                Swal.fire("Sukses", "Tambah data pengajar berhasil", "success").then(() => {
                    router.push("/pengajar");
                });
            } else {
                Swal.fire("Gagal", "Gagal menambahkan data pengajar", "error");
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
        handleCreatePengajar,
    };
}
