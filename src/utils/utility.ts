/********** Utility Functions **********/

/**
 * Converts an hour string into minutes.
 * 
 * @param hoursString A String in the format 'HH:mm'.
 * @returns The converted number of minutes.
 */
export function convertHourStringToMinutes(hoursString: string): number {
    const [ hours, minutes ] = hoursString.split(':').map(Number);
    const cvtMinutes = hours * 60 + minutes;
    return cvtMinutes;
}

/**
 * Converts an arbitrary number of minutes into an hour string.
 * 
 * @param minutesAmount Number of minutes.
 * @returns The converted hour string in the format 'HH:mm'.
 */
export function convetMinutesToHourString(minutesAmount: number): string {
    const hours = String(Math.floor(minutesAmount/60));
    const minutes = String(minutesAmount % 60);
    return `${hours.padStart(2, '0 ')}:${minutes.padStart(2, '0')}`;
}
