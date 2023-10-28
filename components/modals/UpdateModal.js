"use client"

import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd"
import dayjs from "dayjs";
import { useEffect, useState } from "react"
import http from '@/plugin/https'
import pengajarService from "@/services/pengajar.service";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const UpdateModal = ({ open, onOk, onCancel, data }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { update } = useSession()

    useEffect(() => {
        form.setFieldsValue({
            nama: data?.nama,
            nik: data?.nik,
            noTelp: data?.noTelp,
            tgl: dayjs(data?.tgl),
            alamat: data?.alamat,
            // mengajar: data?.mengajar?.name ?? "-",
            ekstrakurikuler: data?.ekstrakurikuler?.map(item => item.name).join(", ") ?? "-"
        })
    }, [data])

    const handleSubmit = async (value) => {
        try {
            setLoading(true)
            const payload = {
                tgl: value.tgl,
                alamat: value.alamat,
                noTelp: value.noTelp,
                nik: value.nik
            }
            const res = await pengajarService.updateBiodata(payload)
            Swal.fire({
                icon: 'success',
                title: "Biodata berhasil diupdate",
                text: "Mohon untuk login kembali untuk melihat perubahan data"
            })

            onCancel()

        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: "Gagal",
                text: "Server sedang mengalami gangguan, silahkan coba kembali"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal title="Update Biodata" footer={<Button onClick={() => form.submit()} disabled={loading} type="primary">Submit</Button >} open={open} onCancel={() => {
            onCancel()
            form.setFieldsValue({
                nama: data?.nama,
                nik: data?.nik,
                noTelp: data?.noTelp,
                tgl: dayjs(data?.tgl),
                alamat: data?.alamat,
                mengajar: data?.mengajar?.name ?? "-",
                ekstrakurikuler: data?.ekstrakurikuler?.map(item => item.name).join(", ") ?? "-"
            })
        }}>
            <Form className="p-5" form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="nama" label="Nama">
                            <Input disabled />
                        </Form.Item>
                        {/* <Form.Item name="mengajar" label="Mengajar">
                            <Input disabled />
                        </Form.Item> */}
                        <Form.Item name="ekstrakurikuler" label="Ekstrakurikuler">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="alamat" label="Alamat">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="nik" label="NIK">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="tgl" label="Tanggal Lahir">
                            <DatePicker style={{
                                width: "100%"
                            }} />
                        </Form.Item>
                        <Form.Item name="noTelp" label="Nomor Telp">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}

export default UpdateModal