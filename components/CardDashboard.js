import { useRouter } from "next/router";

export default function CardDashboard({ title, text, link, linkText, icon }) {
    const { push } = useRouter();

    return (
        <div className={`flex flex-col gap-3 rounded-lg bg-white px-3 py-2 shadow-md`}>
            <span className="font-semibold uppercase text-gray-500">{title}</span>
            {/* <p className="text-center text-lg font-semibold">{title}</p> */}
            <span className="text-xl font-semibold">{text}</span>
            <div className="flex items-center justify-between">
                <span
                    className="cursor-pointer font-light underline"
                    role="button"
                    onClick={() => push(link)}>
                    {linkText}
                </span>
                {icon}
            </div>
        </div>
    );
}
