import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

export default function PendaftarModal(props) {
    const [form] = Form.useForm()
    const [searchedColumn, setSearchedColumn] = useState("")
    const searchInput = useRef(null);

    const [searchText, setSearchText] = useState('');
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    let data = []
    form.setFieldsValue({
        name: props?.data?.name,
        pengajar: props?.data?.pengajar?.nama
    })

    props?.data?.pendaftar?.map(item => (data.push({
        key: item._id,
        name: item.name,
        nis: item.nis,
        gender: item.gender === "L" ? "Laki - laki" : "Perempuan",
        alamat: item.alamat,
        bop: item.bop,
        tgl: dayjs(item.tgl).format('YYYY-MM-DD'),
        kelas: `${item?.kelas?.kelas} ${item?.kelas?.name}`
    })))

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

    const columns = [
        {
            title: "Nama",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "NIS",
            dataIndex: "nis",
            key: "nis"
        },
        {
            title: "Jenis Kelamin",
            dataIndex: "gender",
            key: "gender"
        },
        {
            title: "Tempat, Tanggal Lahir",
            // dataIndex: "gender",
            // key: "gender"
            render: (_, record) => (
                <span>{`${record.bop}, ${record.tgl}`}</span>
            )
        },
        {
            title: "Kelas",
            dataIndex: "kelas",
            key: "kelas",
            ...getColumnSearchProps("kelas"),
        },
    ]

    return (
        <Modal open={props.open} width={1200} onCancel={props.onCancel} title="Data Pendaftar" onOk={props.onCancel}>
            <Card className="m-[20px]">
                <Form form={form} layout="vertical" colon={false}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Ekstrakurikuler" name="name">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Pengajar" name="pengajar">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={data} />
            </Card>
        </Modal>
    )
}