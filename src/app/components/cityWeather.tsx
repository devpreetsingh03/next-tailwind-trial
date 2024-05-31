import { useFetchWeather } from "../hooks/useFetchWeather";

export default function CityWeatherComponent({ city }: { city: string }) {
    const { weatherResult, loading, error } = useFetchWeather(city);

    //Kelvin to Fahrenheit conversion 
    const KtoFtempConversion = (kelvin: number) => (((kelvin - 273.15) * 9) / 5 + 32).toFixed(0);

    if (loading)
        return (
            <p className="text-center" aria-live="polite">
                Loading weather data...
            </p>
        );
    if (error)
        return (
            <p className="text-center">
                Error: There was an Error loading the data
            </p>
        );
    // Note : Check to handle 404 api response (which is when a user enters an invalid value)
    if (weatherResult?.cod === "404")
        return <p className="text-center">{weatherResult?.message}</p>;

    return (
        <div className="mt-10 flex item center">
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase mx-auto text-center tracking-wide text-lg text-gray-600 font-bold">
                            {city}
                        </div>
                        <div className="flex-row text-center">
                            <img
                                className="h-16 w-16 mx-auto"
                                src={`https://openweathermap.org/img/wn/${weatherResult?.weather[0]?.icon}@2x.png`}
                                alt="weather icon image"
                            />
                            <p className="capitalize text-gray-500">
                                {weatherResult?.weather[0]?.main}
                            </p>
                        </div>
                        <div className="mt-2 flex flex-row text-gray-500 text-center">
                            Temperature:
              <p className="ml-1 text-black font-bold">
                                {weatherResult && KtoFtempConversion(weatherResult.main.temp)} F
              </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
