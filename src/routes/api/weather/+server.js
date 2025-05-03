import { APIKEY_OWM, URL_OWM, URL_ICON_OWM } from "$env/static/private"
import {
    Cloudy,
    Droplet,
    Eye,
    Gauge,
    Mountain,
    Sunrise,
    Sunset,
    Waves,
    Wind
} from '@lucide/svelte';

export const GET = async ({ url }) => {
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')
    if (!lat || !lon) {
        return new Response(
            JSON.stringify({ error: 'Parameter lat dan lon diperlukan' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    try {

        const params = new URLSearchParams({
            lat: lat.toString(),
            lon: lon.toString(),
            appid: APIKEY_OWM,
            lang: 'en',
            units: 'metric'
        });

        const res = await fetch(`${URL_OWM}/weather?${params}`);
        const data = await res.json();

        const weather = {
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            icon: `${URL_ICON_OWM}/${data.weather[0].icon}@2x.png`,
            main: data.weather[0].main,
            desc: data.weather[0].description,
            name: data.name /* ?? 'Unrecognized area' */
        }
        const infos = [
            {
                name: 'Visibility',
                value: data.visibility / 1000,
                icon: Eye,
                satuan: 'km'
            },
            {
                name: 'Humidity',
                value: data.main.humidity,
                icon: Droplet,
                satuan: '%'
            },
            {
                name: 'Wind Speed',
                value: data.wind.speed,
                icon: Wind,
                satuan: 'm/s'
            },
            {
                name: 'Pressure',
                value: data.main.pressure,
                icon: Gauge,
                satuan: 'hPa'
            },
            {
                name: 'Clouds',
                value: data.clouds.all,
                icon: Cloudy,
                satuan: '%'
            },
            {
                name: 'Sunrise',
                value: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en', {
                    hour: '2-digit',
                    hour12: true,
                    minute: '2-digit'
                }),
                icon: Sunrise
            },
            {
                name: 'Sunset',
                value: new Date(data.sys.sunset * 1000).toLocaleTimeString('en', {
                    hour: '2-digit',
                    hour12: true,
                    minute: '2-digit'
                }),
                icon: Sunset
            },
            ...(data.main.grnd_level !== undefined ? [{
                name: 'Ground Level',
                value: data.main.grnd_level,
                icon: Mountain,
                satuan: 'm'
            }] : []),
            ...(data.main.sea_level !== undefined ? [{
                name: 'Sea Level',
                value: data.main.sea_level,
                icon: Waves,
                satuan: 'm'
            }] : [])
        ];

        return new Response(JSON.stringify({ weather, infos }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Unable to connect to weather API', err }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};