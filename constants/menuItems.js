import { AppstoreAddOutlined, BellOutlined, CalendarOutlined, CarryOutOutlined, CrownOutlined, FolderOutlined, PieChartOutlined, ReconciliationOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const items = [
    {
        label: "Dashboard",
        key: "dashboard",
        icon: <PieChartOutlined />,
    },
    {
        label: "Pengajar",
        key: "pengajar",
        icon: <ReconciliationOutlined />,
    },
    {
        label: "Ekstrakurikuler",
        key: "ekstrakurikuler",
        icon: <CalendarOutlined />,
    },
    {
        label: "Siswa",
        key: "siswa",
        icon: <UsergroupAddOutlined />,
    },
    {
        label: "Absensi",
        key: "absensi",
        icon: <CarryOutOutlined />,
    },
    {
        label: "Arsip",
        key: "arsip",
        icon: <FolderOutlined />,
    },
    {
        label: "Pengumuman",
        key: "pengumuman",
        icon: <BellOutlined />,
    },
    {
        label: "Kelas",
        key: "kelas",
        icon: <AppstoreAddOutlined />,
    },
    {
        label: "Prestasi",
        key: "prestasi",
        icon: <CrownOutlined />,
    },
];

export default items;
