export const getRatingDescription = (rating: number): string => {
  if (rating === 10) return "Excellent";
  if (rating >= 9) return "Wonderful";
  if (rating >= 8) return "Very Good";
  if (rating >= 7) return "Good";
  if (rating >= 6) return "Fair";
  if (rating >= 5) return "Average";
  if (rating >= 4) return "Mediocre";
  if (rating >= 3) return "Poor";
  if (rating >= 2) return "Terrible";
  return "Awful";
};
