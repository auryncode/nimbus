import { APIKEY_OWM } from '$env/static/private';

export async function GET({ params }) {
    const { layer, z, x, y } = params;
    const tileUrl = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${APIKEY_OWM}`;

    try {
        const response = await fetch(tileUrl);

        if (!response.ok) {
            return new Response('Tile not found', { status: 404 });
        }

        return new Response(await response.arrayBuffer(), {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.log(error);
        return new Response('Tile fetch failed', { status: 500 });
    }
}
