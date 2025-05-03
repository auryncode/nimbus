export function formatTimeStamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
        weekday: 'long'
    });
}
export function getday(date) {
    const targetDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date();
    const yesterday = new Date();
    tomorrow.setDate(today.getDate() + 1);
    yesterday.setDate(today.getDate() - 1);

    // Normalisasi tanpa jam (hanya tanggal)
    const formatYMD = d => d.toISOString().split('T')[0];

    if (formatYMD(targetDate) === formatYMD(today)) {
        return 'Today';
    } else if (formatYMD(targetDate) === formatYMD(tomorrow)) {
        return 'Tomorrow';
    } else if (formatYMD(targetDate) === formatYMD(yesterday)) {
        return 'Yesterday';
    } else {
        return targetDate.toLocaleString('en-US', { weekday: 'long' }); // Bahasa Indonesia
    }
}