
// type Props = {}

const cars = [
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
    "/images/car4.jpg",
    "/images/car5.jpg",
    "/images/car6.jpg",
    "/images/car7.jpg",
    "/images/car8.jpg",
    "/images/car9.jpg",
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
    "/images/car4.jpg",
    "/images/car5.jpg",
    "/images/car6.jpg",
    "/images/car7.jpg",
    "/images/car8.jpg",
    "/images/car9.jpg",
]

export default function HomePage() {
    return (
        <div className="flex justify-center py-10 px-4 md:px-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-8">
                {
                    cars.map((img) => (
                        <div key={img} className="w-full">
                            <img src={img} width={250} height={250}
                                className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md" alt="" />
                            <h3 className="text-lg font-semibold mt-2">New Jeep Wrangler</h3>
                            <p className="text-base font-normal text-gray-900">$2000</p>
                            <p className="text-base font-normal text-gray-600">Kennewick, WA</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}