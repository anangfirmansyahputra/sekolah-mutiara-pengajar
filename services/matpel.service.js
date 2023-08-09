import http from '@/plugin/https'

const matpelService = {
    async get() {
        const { data } = await http.get('/matpel')

        return data
    },

    async create(payload) {
        const { data } = await http.post('/matpel', payload)

        return data
    },

    async delete(id) {
        const { data } = await http.delete(`/matpel/${id}`)

        return data
    },

    async update(id, payload) {
        const { data } = await http.put(`/matpel/${id}`, payload)

        return data
    }
}

export default matpelService