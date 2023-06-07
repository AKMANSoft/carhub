

export default function CarGridItem({ car, className = "" }) {
    return (
        <a href={`cars/${car.id}`}>
            <div className={"w-full " + className}>
                <img src={car.car_images[0]?.image} loading="lazy" width={250} height={250}
                    className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md bg-gray-200" alt="" />
                <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                    {`${car.make}, ${car.model}`}
                </h3>
                <p className="text-base font-normal text-gray-900">${car.amount}</p>
                <p className="text-base font-normal text-gray-600">
                    Zip Code: {car.zip_code}
                </p>
            </div>
        </a>
    );
}