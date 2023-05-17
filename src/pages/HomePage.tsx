
// type Props = {}

const cars = [
    "/images/car1.avif",
    "/images/car2.avif",
    "/images/car3.avif",
    "/images/car4.avif",
    "/images/car5.avif",
    "/images/car6.avif",
    "/images/car7.avif",
    "/images/car8.avif",
    "/images/car9.jpg",
    "/images/car1.avif",
    "/images/car2.avif",
    "/images/car3.avif",
    "/images/car4.avif",
    "/images/car5.avif",
    "/images/car6.avif",
    "/images/car7.avif",
    "/images/car8.avif",
    "/images/car9.jpg",
]

export default function HomePage() {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-8 py-10 px-5 md:px-20">
                {
                    cars.map((img) => (
                        <div className="w-full">
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