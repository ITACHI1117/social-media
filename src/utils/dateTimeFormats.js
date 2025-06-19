export const formatRelativeDate = (date) => {
  const inputDate = new Date(date);
  const now = new Date();

  // Handle invalid dates
  if (isNaN(inputDate.getTime())) {
    return "Invalid date";
  }

  const diffInMilliseconds = now.getTime() - inputDate.getTime();

  // Handle future dates
  if (diffInMilliseconds < 0) {
    return inputDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;
  if (diffInHours < 24)
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  if (diffInDays < 7)
    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  if (diffInWeeks < 4)
    return diffInWeeks === 1 ? "1 week ago" : `${diffInWeeks} weeks ago`;

  return inputDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
