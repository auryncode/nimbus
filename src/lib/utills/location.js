import { APIKEY_IP, URL_IP } from "$env/static/private";

export async function getLocationByIp(ip) {
    const res = await fetch(`${URL_IP}/${ip}/json?token=${APIKEY_IP}`);
    return res.json();
}