import UpdateModal from '@/components/modals/UpdateModal';
import pengumumanService from '@/services/pengumuman.service';
import { Alert, Button, Card, Descriptions, Typography } from 'antd'
import dayjs from 'dayjs';
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react';
import http from '@/plugin/https'
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

Dashboard.layout = "L1";

export default function Dashboard(props) {
   const { data } = useSession()
   const router = useRouter()

   const isAntrian = props.ekstrakurikuler.filter(item => item.antrian.length > 0)

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
      // {
      //    key: '3',
      //    label: 'Mengajar',
      //    children: user?.mengajar?.name,
      // },
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

   const onApprove = async (nis, ekstraId) => {
      try {
         Swal.fire({
            title: "Apakah anda yakin?",
            icon: "question",
            text: "Anda tidak dapat merubah data yang sudah dibuat",
            showDenyButton: true,
            confirmButtonText: 'Ya',
            denyButtonText: `Tidak`,
         }).then(async (res) => {
            if (res.isConfirmed) {
               const res = await http.post('/ekstrakurikuler/join/approve', {
                  nis,
                  ekstraId
               })

               Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: "Siswa berhasil bergabung"
               }).then((res) => {
                  if (res.isConfirmed) {
                     router.push(router.asPath)
                  }
               }
               )

            }
         })

      } catch (err) {
         Swal.fire({
            icon: "error",
            text: "Server sedang bermasalah, silahkan coba kembali"
         })
      }
   }

   const onDisapprove = async (nis, ekstraId) => {
      try {
         Swal.fire({
            title: "Apakah anda yakin?",
            icon: "question",
            text: "Anda tidak dapat merubah data yang sudah dibuat"
            , showDenyButton: true,
            confirmButtonText: 'Ya',
            denyButtonText: `Tidak`,
         }).then(async (res) => {
            if (res.isConfirmed) {
               const res = await http.post('/ekstrakurikuler/join/disapprove', {
                  nis,
                  ekstraId
               })

               Swal.fire({
                  icon: "success",
                  title: "Berhasil",
                  text: "Siswa berhasil ditolak"
               }).then((res) => {
                  if (res.isConfirmed) {
                     router.push(router.asPath)
                  }
               }
               )
            }
         })

      } catch (err) {
         Swal.fire({
            icon: "error",
            text: "Server sedang bermasalah, silahkan coba kembali"
         })
      }
   }

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
                     <span>Biodata Diri</span>
                     <Button type="primary" onClick={showModal}>Update Biodata Diri</Button>
                  </div>}>
                     {items.map(user => (
                        <Descriptions.Item label={user?.label} key={user.key}>{user?.children}</Descriptions.Item>
                     ))}
                  </Descriptions>
               </Card>
            </div>
            {pengumuman?.length > 0 && (
               <Card className="mt-5">
                  {pengumuman?.map(item => (
                     <Alert message={item.title} className='mb-3' description={item.content} type="warning" />
                  ))}
               </Card>
            )}
            {isAntrian.length > 0 && (
               <Card className='mt-5' title="Ada siswa yang menunggu approve">
                  {isAntrian.map(item => (
                     <div>
                        <h1>{item.name}</h1>
                        <div>
                           {item.antrian.map(siswa => (
                              <Alert
                                 className='mb-2'
                                 type='warning' description={
                                    <div className='flex items-center justify-between'>
                                       <div>
                                          <span className='col-span-4 font-semibold text-sm'>
                                             {siswa.name}
                                          </span>
                                          <span className='ml-2 text-gray-500 text-sm'>
                                             ({siswa.nis})
                                          </span>
                                          <div className='text-slate-800'>
                                             {`${siswa.kelas.kelas} ${siswa.kelas.name}`}
                                          </div>
                                       </div>
                                       <div className='flex gap-3'>
                                          <Button onClick={() => onApprove(siswa.nis, item._id)} type='primary'>Approve</Button>
                                          <Button onClick={() => onDisapprove(siswa.nis, item._id)} type='default'>Disapprove</Button>
                                       </div>
                                    </div>
                                 }>
                              </Alert>
                           ))}
                        </div>
                     </div>
                  ))}
               </Card>
            )}
         </div>
         <UpdateModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} data={user} />
      </>
   )
}

export async function getServerSideProps(ctx) {
   const session = await getSession(ctx);
   const { data } = await http.get('/pengajar/ekstrakurikuler')
   const pengumuman = await pengumumanService.get({
      role: "pengajar"
   })


   if (!session) {
      return {
         redirect: {
            destination: "/auth/login",
         },
         props: {},
      };
   }

   const id = session.user.user.data?._id

   const ekstrakurikuler = data.data.filter(item => item.pengajar?._id === id)

   return {
      props: {
         data: pengumuman,
         ekstrakurikuler
      }
   }
}