import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UseAuth = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    return status;
}

export default UseAuth;