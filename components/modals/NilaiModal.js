import ekstrakurikulerService from "@/services/ekstrakurikuler.service";
import nilaiService from "@/services/nilai.service";
import { Button, Form, Input, InputNumber, Modal, Table, Card } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

export default function NilaiModal(props) {
    const [form] = Form.useForm()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [selectSiswa, setSelecSiswa] = useState(null)

    const totalNilai = (akademik, data) => {
        const nilaiAkademik = (akademik * 70 / 100)
        // const nilaiAbsen = ((absen / 14) * 100) * 40 / 100
        const totalTrue = data?.filter((item) => item === true).length;

        // Menghitung total panjang array
        const totalLength = data?.length;

        // Menghitung persentase nilai true

        const nilaiAbsen = Math.ceil(((totalTrue / totalLength) * 100) * 30 / 100);

        const nilaiTotal = nilaiAbsen + nilaiAkademik

        if (nilaiTotal > 85) {
            return `${nilaiTotal} | A`
        } else if (nilaiTotal >= 75 && nilaiTotal < 86) {
            return `${nilaiTotal} | B`
        } else {
            return `${nilaiTotal} | C`
        }
    }

    const nilaiAbsen = (data) => {
        const totalTrue = data?.filter((item) => item === true).length;

        // Menghitung total panjang array
        const totalLength = data?.length;

        // Menghitung persentase nilai true
        const percentageTrue = Math.ceil((totalTrue / totalLength) * 100);

        return percentageTrue
    }

    const data = props?.data?.pendaftar?.map(item => ({
        key: item?._id,
        name: item?.name,
        nis: item?.nis,
        kelas: `${item?.kelas?.kelas} ${item?.kelas?.name}`,
        nilai: item?.nilai?.[props?.data?.wajib ? 'ekstrakurikulerWajib' : 'ekstrakurikulerPilihan']?.nilai,
        absen: nilaiAbsen(item?.nilai?.[props?.data?.wajib ? 'ekstrakurikulerWajib' : 'ekstrakurikulerPilihan']?.kehadiran),
        total: totalNilai(item?.nilai?.[props?.data?.wajib ? 'ekstrakurikulerWajib' : 'ekstrakurikulerPilihan']?.nilai,
            item?.nilai?.[props?.data?.wajib ? 'ekstrakurikulerWajib' : 'ekstrakurikulerPilihan']?.kehadiran
        )
    }))

    const handleNilai = (id, name) => {
        form.setFieldsValue({ name: name })
        setSelecSiswa(id)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setSelecSiswa(null)
        form.resetFields()
    }

    const columns = [
        {
            title: "Nama",
            key: "name",
            dataIndex: "name"
        },
        {
            title: "NIS",
            key: "nis",
            dataIndex: "nis"
        },
        {
            title: "Kelas",
            key: "kelas",
            dataIndex: "kelas"
        },
        {
            title: "Nilai",
            key: "nilai",
            dataIndex: "nilai"
        },
        {
            title: "Nilai Absen",
            key: "absen",
            dataIndex: "absen"
        },
        {
            title: "Nilai Total",
            key: "total",
            dataIndex: "total"
        },
        {
            title: "Aksi",
            fixed: "right",
            width: "100px",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleNilai(record?.key, record?.name)}>Beri Nilai</Button>
            )
        },
    ]

    const handleSubmit = async (values) => {
        const payload = {
            wajib: props?.data?.wajib,
            nilai: values.nilai
        }

        Swal.fire({
            icon: "question",
            title: "Apa anda yakin?",
            text: "Data akan dirubah",
            showDenyButton: true,
            confirmButtonText: 'Yakin',
            denyButtonText: `Tidak`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await nilaiService.beriNilai(selectSiswa, payload)
                    Swal.fire({
                        icon: 'success',
                        title: "Sukses",
                        text: "Data berhasil diupdate"
                    })
                    router.push(router.asPath)
                    setOpen(false)
                    form.resetFields()
                    setSelecSiswa(null)
                    // props.onCancel()
                    const resData = await ekstrakurikulerService.find(props?.data?._id)
                    props?.setDataPendaftar(resData.data)
                } catch (err) {
                    console.log(err);
                    const messageErr = JSON.parse(err?.request?.response)?.message
                    Swal.fire({
                        icon: 'error',
                        title: "Gagal",
                        text: messageErr ?? "Data gagal dirubah, coba ganti data dan coba kembali!"
                    })
                }
            } else if (result.isDenied) {
            }
        })
    }


    return (
        <>
            <Modal open={props.open} onCancel={props.onCancel} footer={<Button onClick={props.onCancel}>Tutup</Button>} width={1200} title="Form Nilai">
                <Card className="m-[20px]">
                    <Table columns={columns} dataSource={data} />
                </Card>
            </Modal>
            <Modal open={open} title="Beri Nilai" onOk={() => form.submit()} onCancel={handleClose}>
                <Card className="m-[20px]">
                    <Form form={form} colon={false} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item label="Nama" name="name">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Nilai" name="nilai">
                            <InputNumber placeholder="0" style={{ width: "100%" }} maxLength={3} max={100} />
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
        </>
    )
}