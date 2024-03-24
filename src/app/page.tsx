'use client'
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useQuery } from "react-query";


interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}


export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>({ 
    queryKey: ['repoData'], 
    queryFn: async () => {
      const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=strasbourg&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  })

  if(isLoading) 
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    )

  const firstData = data?.list[0]
  console.log(data?.city.country)

  return (

      <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today data */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="flex gap-1 text-2xl items-end">
                <p>{ format(parseISO(firstData?.dt_txt ??''), 'EEEE') }</p>
                <p className="text-lg">({ format(parseISO(firstData?.dt_txt ??''), 'dd.MM.yyyy') })</p>
              </h2>
              <Container className=" gap-10 px-6 items-center" ></Container>
            </div>
          </section>
          {/* 7 day forecast data */}
        </main>
      </div>

  );
}
