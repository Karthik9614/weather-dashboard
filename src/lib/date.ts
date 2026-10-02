export function formatHour(dateTime: string): string {
  const date = new Date(dateTime);

  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    hour12: true,
  });
}

export function formatDay(date: string, index: number): string {
  if (index === 0) {
    return "Today";
  }

  const day = new Date(`${date}T00:00:00`);

  return day.toLocaleDateString("en-IN", {
    weekday: "short",
  });
}