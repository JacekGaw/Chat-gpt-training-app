export default function decodeTimestamp(timestamp) {
    let date = new Date(timestamp).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'});
    return date;
}