// format a unix millisecond timestamp into a localized date-time string
export const formatDateTime = (timestamp?: number): string => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString();
};
