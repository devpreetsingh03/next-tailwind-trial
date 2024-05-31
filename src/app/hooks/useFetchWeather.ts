import { useState, useEffect } from "react";

//Note : Prefer to keep key in ENV files for security
// to get api key: https://openweathermap.org/appid
const API_KEY = "369149352ced50bb9e51c8a505d75266";

interface SearchResponse {
    cod: string
    message?: string
    main: {
        temp: number
    }
    weather: {
        icon: string
        main: string
    }[]
}
//This hook fetches the result or the error message of a failed call
export const useFetchWeather = (city: string) => {
    const [weatherResult, setWeatherResult] = useState<SearchResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
            )
                .then((r) => r.json())
                .then((result) => {
                    setWeatherResult(result);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    console.error('Error:', error);
                    setLoading(false);
                });
        }
    }, [city]);

    return { weatherResult, loading, error };
};
