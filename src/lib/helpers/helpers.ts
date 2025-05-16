export const getFormattedDate = (timestamp: number) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const localeString = new Date(timestamp).toLocaleDateString(
        undefined,
        options,
    );
    return localeString;
};