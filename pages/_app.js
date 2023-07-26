import LayoutComp from "@/components/LayoutComp";
import { AdminProvider } from "@/context";
import "@/styles/globals.css";
import UseAuth from "@/utils/auth";
import { ConfigProvider, Spin } from "antd";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout2 = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

const layouts = {
    L1: LayoutComp,
    L2: Layout2,
};

export default function MyApp({ Component, pageProps, session }) {
    const Layout = layouts[Component.layout] || (({ children }) => <>{children}</>);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true);
        };

        const handleComplete = () => {
            setIsLoading(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, []);

    return (
        <AdminProvider>
            <SessionProvider session={session}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#008846",
                            fontSize: 12,
                        },
                    }}>
                    <Spin
                        spinning={isLoading}
                        style={{
                            maxHeight: "100vh",
                        }}>
                        <Layout
                            isLoading={isLoading}
                            style={{
                                height: "100vh",
                            }}>
                            <Component
                                {...pageProps}
                            // pengajar={pengajar}
                            // ekstrakurikuler={ekstrakurikuler}
                            // pengumuman={pengumuman}
                            // siswa={siswa}
                            // kelas={kelas}
                            // gallery={gallery}
                            // prestasi={prestasi}
                            />
                        </Layout>
                    </Spin>
                </ConfigProvider>
            </SessionProvider>
        </AdminProvider>
    );
}

