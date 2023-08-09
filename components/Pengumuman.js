export default function Pengumuman(props) {
    return (
        <div className="rounded bg-red-500 px-5 py-1 text-white">
            <p>{props?.title}</p>
            <div dangerouslySetInnerHTML={{ __html: props?.content }}></div>
        </div>
    );
}
