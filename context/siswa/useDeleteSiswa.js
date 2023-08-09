import { useContext } from "react";
import { AdminContext } from "..";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function useDeleteSiswaContext() {
    const context = useContext(AdminContext);
    const [loading, setLoading] = context.loading;
    const router = useRouter();

    const handleDelete = async (nis, config) => {
        setLoading(true);
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/siswa/" + nis, config);

            const data = await res.data;

            if (data) {
                Swal.fire("Berhasil", "Menghapus data siswa berhasil", "success").then((res) => router.push(router.asPath));
            } else {
                Swal.fire("Gagal", "Menghapus data siswa gagal", "error");
            }
        } catch (err) {
            Swal.fire("Gagal", err.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleDelete,
        loading,
    };
}
