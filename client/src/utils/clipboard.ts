// copy text to the clipboard with a legacy fallback
export const copyToClipboard = (text: string): void => {
    if ("clipboard" in navigator) {
        navigator.clipboard.writeText(text);
    } else {
        document.execCommand("copy", true, text);
    }
};
