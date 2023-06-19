import { formatDate, formatPrice } from "../lib/utils";


export default function CarGridItem({ car, className = "", type = "BUY" }) {
    return (
        <a href={`cars/${car.id}`}>
            <div className={"w-full " + className}>
                <img src={car.car_images[0]?.image} loading="lazy" width={250} height={250}
                    className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md bg-gray-200" alt="" />
                <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                    {car.make} {car.model}
                </h3>
                <p className="text-base font-semibold text-primary">
                    ${formatPrice(car.amount)}
                </p>
                <p className="text-sm font-normal text-gray-600">
                    {car.user_count} views
                </p>
                {
                    type === "BUY" &&
                    <p className="text-sm font-normal text-gray-600">
                        Zip Code: {car.zip_code}
                    </p>
                }
                <p className="text-sm font-normal text-gray-600">
                    Posted: {formatDate(new Date(car.created_at), "-")}
                </p>
                <p className="text-sm font-normal text-gray-600">
                    {car.id}
                </p>
            </div>
        </a>
    );
}