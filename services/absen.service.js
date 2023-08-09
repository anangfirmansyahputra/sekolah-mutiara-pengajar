import http from '@/plugin/https'

const absenService = {
    async absen(payload) {
        const { data } = await http.post('/ekstrakurikuler/absensi', payload)

        return data
    }
}

export default absenService