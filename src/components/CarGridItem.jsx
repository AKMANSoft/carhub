import { handleTranslation } from "../lib/i18n";
import { formatDate, formatPrice } from "../lib/utils";


export default function CarGridItem({ car, className = "", type = "BUY" }) {
    const { trans } = handleTranslation()
    console.log(car)
    return (
        <div className={"w-full relative " + className}>
            <a href={`cars/${car.id}`}>
                <img src={car.car_images[0]?.image} loading="lazy" width={250} height={250}
                    className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md bg-gray-200" alt="" />
            </a>
            <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                    {car.make} {car.model}
                </h3>
                <p className="text-base font-semibold text-primary">
                    ${formatPrice(car.amount)}
                </p>
                <p className="text-sm font-normal text-gray-600">
                    {car.user_count} {trans("views")}
                </p>
                {
                    type === "BUY" &&
                    <p className="text-sm font-normal text-gray-600">
                        {trans("zip_code")}: {car.zip_code}
                    </p>
                }
                <p className="text-sm font-normal text-gray-600">
                    {trans("posted")}: {formatDate(new Date(car.created_at), "-")}
                </p>
                {
                    type === "SELL" && car.find_me_buyer &&
                    <div>
                        <a href={`/find-me-buyer?car_id=${car.id}`} className="btn-primary block text-center text-sm w-full px-4 py-1 mt-2 hover:bg-primary">
                            {trans("find_me_buyer")}
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}