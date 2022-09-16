/********** Utility Functions **********/

/**
 * Converts a hour string into minutes.
 * 
 * @param hoursString A String in the format 'HH:mm'.
 * @returns The hour converted to minutes as a Number.
 */
export function convertHoursToMinutes(hoursString: string): number {
    const [ hours, minutes ] = hoursString.split(':').map(Number);
    const cvtMinutes = hours * 60 + minutes;
    return cvtMinutes;
}
