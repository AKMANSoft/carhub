


export default function CarGridItem({ img }) {
    return (
        <div className="w-full">
            <img src={img} width={250} height={250}
                className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md" alt="" />
            <h3 className="text-lg font-semibold mt-2">New Jeep Wrangler</h3>
            <p className="text-base font-normal text-gray-900">$2000</p>
            <p className="text-base font-normal text-gray-600">Kennewick, WA</p>
        </div>
    );
}