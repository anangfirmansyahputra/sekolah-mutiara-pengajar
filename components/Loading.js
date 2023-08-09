import { BeatLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Loading() {
    return (
        <div className="fixed w-screen h-screen top-0 bg-[#000000b2] text-white left-0 z-[9999] right-0 flex items-center justify-center">
            <BeatLoader
                color="#fff"
                loading={true}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
