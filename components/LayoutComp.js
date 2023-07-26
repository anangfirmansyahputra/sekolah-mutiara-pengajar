// import { items } from "@/constants/index";
import { Layout, Typography } from "antd";
import { SessionProvider } from "next-auth/react";
import HeaderComp from "./HeaderComp";
import Sidebar from "./Sidebar";
import UseAuth from "@/utils/auth";

const { Content, Footer, Header, Sider } = Layout;
const { Title } = Typography;

export default function LayoutComp({ children, session, isLoading }) {
    // UseAuth()
    return (
        <SessionProvider session={session}>
            <Layout className="h-screen">
                <Sidebar />
                <Layout>
                    <HeaderComp />
                    <Content
                        style={{
                            padding: "24px 50px 0",
                            overflow: "auto",
                            height: "100vh - 64px",
                        }}>
                        {children}
                    </Content>
                    <Footer
                        style={{
                            textAlign: "center",
                        }}>
                        Sekolah Mutiara ©2023 Created by <span className="font-bold">Divana Faradila</span>
                    </Footer>
                </Layout>
            </Layout>
        </SessionProvider>
    );
}