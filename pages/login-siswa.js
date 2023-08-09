Login.layout = "L2";

import useLoginContext from "@/context/useLoginContext";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton, Spin, Typography } from "antd";
import { getSession } from "next-auth/react";

const { Title, Text } = Typography;

export default function Login() {
    const [form] = Form.useForm();
    const { loading, handleLogin, handleLoginSiswa, contextHolder } = useLoginContext();

    const onFinish = (values) => {
        handleLoginSiswa(values);
        form.resetFields();
    };

    return (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden rounded-lg bg-[#f3f3f3]">
            {contextHolder}
            <div className="w-[300px] bg-white px-5 pb-5 shadow-xl">
                <Skeleton
                    active={true}
                    loading={false}>
                    <Spin spinning={loading}>
                        <div className="mb-10">
                            <Title
                                className="text-center"
                                level={4}>
                                Sistem Siswa
                            </Title>
                        </div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            form={form}
                            style={{
                                width: 300,
                            }}
                            onFinish={onFinish}>
                            <Form.Item
                                name="nis"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your NIS!",
                                    },
                                ]}>
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    style={{
                                        width: "100%",
                                        marginTop: 10,
                                    }}
                                    type="primary"
                                    htmlType="submit">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="text-center font-sans text-[12px] text-gray-500">Copyright © 2023 Sekolah Mutiara. All Rights Reserved.</p>
                    </Spin>
                </Skeleton>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }

    return {
        props: {},
    };
}
