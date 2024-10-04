export const getRateLabel = (rate: string): string => {
    const numericRate = parseFloat(rate);

    if (numericRate >= 9.5 && numericRate <= 10) {
        return "Exceptional";
    } else if (numericRate >= 8.5 && numericRate < 9.5) {
        return "Excellent";
    } else if (numericRate >= 7.5 && numericRate < 8.5) {
        return "Very Good";
    } else if (numericRate >= 6.5 && numericRate < 7.5) {
        return "Good";
    } else if (numericRate >= 5.5 && numericRate < 6.5) {
        return "Average";
    } else {
        return "Below Average";
    }
};