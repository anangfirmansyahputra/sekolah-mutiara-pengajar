import LayoutComp from "@/components/LayoutComp";
import { AdminProvider } from "@/context";
import http from '@/plugin/https';
import "@/styles/globals.css";
import { ConfigProvider, Spin } from "antd";
import { SessionProvider, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout2 = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

const layouts = {
    L1: LayoutComp,
    L2: Layout2,
};

function MyApp({ Component, pageProps, pengajar, ekstrakurikuler, pengumuman, siswa, kelas, gallery, prestasi }) {
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
                            pengajar={pengajar}
                            ekstrakurikuler={ekstrakurikuler}
                            pengumuman={pengumuman}
                            siswa={siswa}
                            kelas={kelas}
                            gallery={gallery}
                            prestasi={prestasi}
                        />
                    </Layout>
                </Spin>
            </ConfigProvider>
        </AdminProvider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    const session = await getSession(ctx);
    let pengajar = [];
    let ekstrakurikuler = [];
    let siswa = [];
    let pengumuman = [];
    let kelas = [];
    let gallery = [];
    let prestasi = [];

    try {
        const response = await http.get("/admin/pengajar");
        pengajar = response.data;
        const { data } = await http.get("/pengajar/ekstrakurikuler");
        ekstrakurikuler = data;
        const { data: dataSiswa } = await http.get("/siswa");
        siswa = dataSiswa;
        const { data: dataPengumuman } = await http.get("/admin/pengumuman");
        pengumuman = dataPengumuman;
        const { data: dataKelas } = await http.get("/kelas");
        kelas = dataKelas;
        const { data: dataGallery } = await http.get("/gallery/");
        gallery = dataGallery;
        const { data: dataPrestasi } = await http.get("/prestasi/");
        prestasi = dataPrestasi;
    } catch (error) {
        console.error(error);
    }

    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, pengajar, session, ekstrakurikuler, pengumuman, siswa, kelas, gallery, prestasi };
};

export default MyApp;
