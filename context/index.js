import { notification } from "antd";
import { useRouter } from "next/router";
import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // State
    const [loading, setLoading] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    const router = useRouter();

    const config = (token) => {
        return {
            headers: token,
        };
    };

    return (
        <AdminContext.Provider
            value={{
                loading: [loading, setLoading],
                router: [router],
                notification: [api, contextHolder],
                config: [config],
            }}>
            {children}
        </AdminContext.Provider>
    );
};
