
// type Props = {}

import CarGridItem from "../components/CarGridItem"
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS"

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
        <div className={"flex justify-center py-10"+ MAIN_HORIZONTAL_PADDING}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-8">
                {
                    cars.map((img) => (
                        <CarGridItem key={img} img={img}  />
                    ))
                }

            </div>
        </div>
    )
}