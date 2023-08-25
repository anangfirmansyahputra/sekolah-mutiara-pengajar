import UpdateModal from '@/components/modals/UpdateModal';
import pengumumanService from '@/services/pengumuman.service';
import { Alert, Button, Card, Descriptions, Typography } from 'antd'
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react';

Dashboard.layout = "L1";



export default function Dashboard(props) {
    const { data } = useSession()
    console.log(data);
    const user = data?.user?.user?.data
    const items = [
        {
            key: '1',
            label: 'Nama',
            children: user?.nama,
        },
        {
            key: '2',
            label: 'NIK',
            children: user?.nik,
        },
        {
            key: '3',
            label: 'Mengajar',
            children: user?.mengajar?.name,
        },
        {
            key: '4',
            label: "Tanggal Lahir",
            children: dayjs(user?.tgl).format('YYYY-MM-DD'),
        },
        {
            key: '5',
            label: 'Alamat',
            children: user?.alamat,
        },
        {
            key: '6',
            label: 'No Telp',
            children: user?.noTelp,
        },
        {
            key: '7',
            label: 'Ekstrakurikuler',
            children: user?.ekstrakurikuler?.map(item => item.name).join(", "),
        },
    ];

    const pengumuman = props?.data?.data

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Head>
                <title>Dashboard | Sistem Informasi Sekolah Mutiara</title>
            </Head>
            <div>
                <Typography.Title level={2} style={{ margin: 0, padding: 0, }}>Dashboard</Typography.Title>
                <div className="mt-5">
                    <Card>
                        <Descriptions column={2} bordered title={<div className="flex items-center justify-between">
                            <span>Biodata</span>
                            <Button type="primary" onClick={showModal}>Update Biodata</Button>
                        </div>}>
                            {items.map(user => (
                                <Descriptions.Item label={user?.label} key={user.key}>{user?.children}</Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Card>
                </div>
                <Card className="mt-5">
                    {pengumuman?.map(item => (
                        <Alert message={item.title} description={item.content} type="warning" />
                    ))}
                </Card>
            </div>
            <UpdateModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} data={user} />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const pengumuman = await pengumumanService.get({
        role: "pengajar"
    })

    return {
        props: {
            data: pengumuman
        }
    }
}