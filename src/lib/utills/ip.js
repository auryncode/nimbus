export function getIp(request) {
    const header = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-real-ip');

    return header && header.split(',')[0] || '112.215.173.117'
}