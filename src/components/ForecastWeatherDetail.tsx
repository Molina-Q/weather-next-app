import React from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';

type Props = {}

export interface ForcastWeatherDetailProps extends WeatherDetailProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temps_max: number;
  description: string;
}

export default function ForecastWeatherDetail(props: ForcastWeatherDetailProps) {
  const {
    weatherIcon = "02d",
    date = "19.09",
    day = "Tuesday",
    temp,
    feels_like,
    temp_min,
    temps_max,
    description,
  } = props;
  return (
    <Container className='gap-4'>
      {/* left section */}
      <section className='flex gap-4 items-center px-4'>
        <div>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>

        <div className='flex flex-col px-4'>
          <span className='text-5xl' >{convertKelvinToCelsius(temp ?? 0)}°Z</span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
        </div>
      </section>
      {/* right section */}
      <section className='overflow-c-auto flex justify-between gap-4 w-full pr-10'>
        <WeatherDetails {...props} />
      </section>
    </Container>
  )
}