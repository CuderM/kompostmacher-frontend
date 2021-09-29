export function convertToBoolean(value) {
    return (
        value === true ||
        (typeof value === 'string' && value.trim().toLowerCase() === 'true')
    );
}