

export const shortenString = (str: string): string => {
    if (str == undefined) return ' '
    const word = str.substring(0, 5).toUpperCase();
    return word
}
