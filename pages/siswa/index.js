import http from '@/plugin/https';
import siswaService from "@/services/siswa.service";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, Layout, Modal, Popconfirm, Row, Select, Space, Table, Typography, message } from "antd";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

Pengajar.layout = "L1";

export default function Pengajar({ siswa, kelas }) {
    const { push, asPath } = useRouter();

    // State
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState([]);
    const [open, setOpen] = useState(false)

    const searchInput = useRef(null);
    const data = [];
    const { data: session } = useSession();
    const token = session?.user?.user?.accessToken;

    siswa?.data.map((item) =>
        data.push({
            key: item._id,
            nama: item?.name,
            nis: item?.nis,
            alamat: item?.alamat,
            tgl: dayjs(item?.tgl).format("DD/MM/YY"),
            nilai: item?.nilai,
            kelas: item?.kelas?.kelas + item?.kelas?.name,
        })
    );

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}>
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}>
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const config = {
        headers: { "admin-token": `${token}` },
    };

    const confirm = async (record) => {
        try {
            setLoading(true);
            const deleteRes = await siswaService.delete(selectedRow?.map((item) => item?.nis));
            message.success(deleteRes?.message);
            push(asPath);
        } catch (err) {
            message.error(err);
        } finally {
            setLoading(false);
            setSelectedRow([]);
        }
    };

    const columns = [
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
            width: "300px",
            ...getColumnSearchProps("nama"),
            render: (_, record) => (
                <Link
                    href={{
                        pathname: `siswa/${record?.nis}`,
                    }}>
                    {record?.nama}
                </Link>
            ),
        },
        {
            title: "NIS",
            dataIndex: "nis",
            key: "nis",
            width: "200px",
            ...getColumnSearchProps("nis"),
        },
        {
            title: "Kelas",
            dataIndex: "kelas",
            key: "kelas",
            ...getColumnSearchProps("kelas"),
            width: "200px",
        },
        {
            title: "Alamat",
            dataIndex: "alamat",
            key: "alamat",
            ...getColumnSearchProps("alamat"),
            sortDirections: ["descend", "ascend"],
            width: "200px",
        },
        {
            title: "Tanggal Lahir",
            dataIndex: "tgl",
            key: "tgl",
            ...getColumnSearchProps("tgl"),
            width: "200px",
        },
        {
            title: "Nilai",
            dataIndex: "nilai",
            key: "nilai",
            ...getColumnSearchProps("nilai"),
            sortDirections: ["descend", "ascend"],
            width: "100px",
            render: (_, record) => (
                <Link
                    href={{
                        pathname: `nilai/${record?.key}`,
                    }}>
                    Detail
                </Link>
            ),
            fixed: "right"
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
            setSelectedRow(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Head>
                <title>Siswa | Sistem Informasi Mutiara</title>
            </Head>
            <Layout.Content>
                <Typography.Title level={2} style={{ marginBottom: 0, padding: 0 }}>Siswa</Typography.Title>
                <div className="mb-5 flex items-center justify-between">
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href="/">Dashboard</Link>,
                            },
                            {
                                title: "Siswa",
                            },
                        ]}
                    />
                    <Space>
                        {/* <Link
                            href={{
                                pathname: "/siswa/tambah",
                            }}> */}
                        <Button
                            onClick={() => setOpen(true)}
                            type="primary"
                            icon={<PlusOutlined />}>
                            Tambah
                        </Button>
                        {/* </Link> */}
                        {selectedRow?.length > 0 && (
                            <Popconfirm
                                title="Delete Data"
                                description="Are you sure to delete this data?"
                                onConfirm={confirm}
                                okText="Yes"
                                cancelText="No">
                                <Button danger>Delete</Button>
                            </Popconfirm>
                        )}
                    </Space>
                </div>
                <Card title="Data Siswa">
                    <Table
                        sticky
                        bordered
                        size="large"
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        style={{
                            height: "100",
                        }}
                        columns={columns}
                        dataSource={data}
                        scroll={{
                            x: 1200,
                        }}
                    />
                </Card>
            </Layout.Content>
            <Modal title="Form Siswa" open={open} onCancel={handleCloseModal} centered width={1000}>
                <Card style={{
                    margin: 20
                }}>
                    <Form labelCol={{ span: 6 }} colon={false} labelWrap layout='horizontal' labelAlign='left'>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Nama" name="name" required rules={[{ message: "Mohon input nama", required: true }]}>
                                    <Input placeholder="Nama" />
                                </Form.Item>
                                <Form.Item label="Password" name="password" required rules={[{ message: "Mohon input password", required: true }]}>
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item label="No Telp" name="noTlp" required rules={[{ message: "Mohon input no telp", required: true }]}>
                                    <Input placeholder="No Telp" maxLength={16} />
                                </Form.Item>
                                <Form.Item label="Kelas" name="kelas" required rules={[{ message: "Mohon input NIS", required: true }]}>
                                    <div className='flex gap-2'>
                                        <Input placeholder="Kelas" maxLength={16} />
                                        <Input placeholder="Nama Kelas" maxLength={16} />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Alamat" name="alamat" required rules={[{ message: "Mohon input alamat", required: true }]}>
                                    <Input.TextArea placeholder="Alamat" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Nis" name="nis" required rules={[{ message: "Mohon input NIS", required: true }]}>
                                    <Input placeholder="NIS" maxLength={16} />
                                </Form.Item>
                                <Form.Item label="Tempat Lahir" name="bop" required rules={[{ message: "Mohon input tempat tanggal lahir", required: true }]}>
                                    <Input placeholder="Tempat Lahir" maxLength={16} />
                                </Form.Item>
                                <Form.Item label="Jenis Kelamin" name="gender" required rules={[{ message: "Mohon pilih jenis kelamin", required: true }]}>
                                    <Select options={[
                                        {
                                            value: "L",
                                            label: "Laki - laki"
                                        },
                                        {
                                            value: "P",
                                            label: "Perempuan"
                                        },
                                    ]} placeholder="Jenis Kelamin" />
                                </Form.Item>
                                <Form.Item label="Tanggal Lahir" name="tgl" required rules={[{ message: "Mohon input tanggal lahir", required: true }]}>
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Modal>
        </>
    );
}

export async function getServerSideProps(ctx) {
    const { data } = await http.get('/kelas')
    const { data: siswa } = await http.get('/siswa')

    return {
        props: {
            kelas: data,
            siswa: siswa,
        },
    };
}

