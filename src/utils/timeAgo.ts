export function timeAgo(dateString: string) {
  const now = Date.now();

  const date = new Date(dateString).getTime();

  const seconds = Math.floor(
    (now - date) / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${
      hours !== 1 ? "s" : ""
    } ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${
    days !== 1 ? "s" : ""
  } ago`;
}