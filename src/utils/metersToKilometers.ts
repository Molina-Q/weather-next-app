/** @format */

export function metersToKilometers(visibilityInMeters: number): string {
    const visibilityInKilometers = visibilityInMeters / 1000;
    return `${visibilityInKilometers.toFixed(0)}km`; // round to zero decimals and add km
}