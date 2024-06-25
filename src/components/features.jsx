
export default function Features () {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 bg-white rounded-xl border font-bold text-sm text-black shadow-lg px-10 py-8 capitalize text-center">
                <img className="w-14 h-14 object-contains" src="/explore.png" alt="" />
                <p>Explore our Variety, Custom and high quality products and choose your liked ones.</p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-xl border font-bold text-sm text-black shadow-lg px-10 py-8 capitalize text-center">
                <img className="w-14 h-14 object-contains" src="/touch.png" alt="" />
                <p>Choose the size and the color you like and pay.</p>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-xl border font-bold text-sm text-black shadow-lg px-10 py-8 capitalize text-center">
                <img className="w-14 h-14 object-contains" src="/delivery.png" alt="" />
                <p>Now our team will work with your order and will be in your house within a week.</p>
            </div>
        </div>
    )
}