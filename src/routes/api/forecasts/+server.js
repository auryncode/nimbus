import { APIKEY_OWM, URL_OWM } from "$env/static/private"

export const GET = async ({ url }) => {
    const lat = url.searchParams.get('lat')
    const lon = url.searchParams.get('lon')
    if (!lat || !lon) {
        return new Response(
            JSON.stringify({ error: 'Parameter lat dan lon diperlukan' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    const params = new URLSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
        appid: APIKEY_OWM,
        lang: 'en',
        units: 'metric',
    });

    try {
        const res = await fetch(`${URL_OWM}/forecast?${params}`);
        const data = await res.json();
        const { list } = data;
        const forecasts = list.reduce((acc, item) => {
            const [date, time] = item.dt_txt.split(' ');

            const entry = {
                time: time.slice(0, 5), // HH:MM
                temp: item.main.temp,
                weather: item.weather[0].main,
                icon: item.weather[0].icon,
                description: item.weather[0].description
            };

            acc[date] = acc[date] || [];
            acc[date].push(entry);

            return acc;
        }, {});
        return new Response(JSON.stringify({ forecasts }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(
            JSON.stringify({ message: 'Unable to connect to weather API', err }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}