import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AdminContext } from "..";

export default function useCreateEktrakurikuler() {
    const contex = useContext(AdminContext);
    const [loading, setLoading] = contex.loading;
    const [config] = contex.config;
    const router = useRouter();

    const handleCreateEktrakurikuler = async (payload, config, nik) => {
        setLoading(true);

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/ekstrakurikuler`, payload, config);
            const data = await res.data;

            if (data) {
                Swal.fire("Sukses", data?.message, "success").then(() => {
                    router.push("/ekstrakurikuler");
                });
            } else {
                Swal.fire("Gagal", data?.message, "error");
            }
        } catch (err) {
            Swal.fire("Gagal", err?.response?.data?.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        handleCreateEktrakurikuler,
    };
}
