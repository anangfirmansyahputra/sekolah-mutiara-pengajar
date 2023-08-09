const inputs = [
    {
        id: 1,
        name: "nama",
        label: "Nama",
        rules: {
            required: true,
            message: "Mohon untuk menginput nama",
        },
        type: "text",
    },
    {
        id: 2,
        name: "password",
        label: "Password",
        rules: {
            required: true,
            message: "Mohon untuk menginput password",
        },
        type: "password",
    },
    {
        id: 3,
        name: "nik",
        label: "NIK",
        rules: {
            required: true,
            message: "Mohon untuk menginput NIK",
        },
        type: "number",
    },
    {
        id: 4,
        name: "mengajar",
        label: "Mengajar",
        rules: {
            required: false,
            message: null,
        },
        type: "select",
    },
    {
        id: 5,
        name: "alamat",
        label: "Alamat",
        rules: {
            required: false,
            message: null,
        },
        type: "text",
    },
    {
        id: 6,
        name: "tgl",
        label: "Tanggal Lahir",
        rules: {
            required: false,
            message: null,
        },
        type: "date",
    },
    {
        id: 7,
        name: "noTelp",
        label: "No Telp",
        rules: {
            required: false,
            message: null,
        },
        type: "text",
    },
];

export default inputs;
