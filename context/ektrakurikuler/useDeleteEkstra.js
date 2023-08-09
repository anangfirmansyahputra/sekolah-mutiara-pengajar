import { useContext } from "react";
import { AdminContext } from "..";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function useDeleteEkstra() {
    const context = useContext(AdminContext);
    const [loading, setLoading] = context.loading;
    const router = useRouter();

    const handleDelete = async (id, config) => {
        setLoading(true);
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/ekstrakurikuler/${id}`, config);

            const data = await res.data;

            if (data) {
                Swal.fire("Berhasil", data?.message, "success").then((res) => router.push("/ekstrakurikuler"));
            } else {
                Swal.fire("Gagal", data?.message, "error");
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
