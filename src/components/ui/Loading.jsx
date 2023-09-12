export default function Loading ({loading}) {

    if(!loading) {
        return null;
    }

    return (
        <div className="z-20 fixed top-0 left-0 w-full h-full bg-white/90 flex flex-cols items-center justify-center font-bold text-lg capitalize">
            Loading
        </div>
    )
}