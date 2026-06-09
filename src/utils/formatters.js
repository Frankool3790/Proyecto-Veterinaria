export const formatTime = (timeString) => {
  if (!timeString) return "";
  
  // Si ya tiene el formato HH:MM AM/PM, lo devolvemos
  if (timeString.includes("AM") || timeString.includes("PM")) return timeString;

  try {
    const [hours, minutes] = timeString.split(":");
    let h = parseInt(hours);
    const m = minutes ? minutes.substring(0, 2) : "00";
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12; // el número 0 debe ser 12
    return `${h}:${m} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

export const getDayFromDate = (dateString) => {
  if (!dateString) return "";
  try {
    // Si es un ISO string con T, extraemos solo el día antes de la T o usamos Date
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString.split("-")[2]?.substring(0, 2) || "";
    return date.getDate().toString();
  } catch (error) {
    return "";
  }
};

export const getMonthFromDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString('es-CO', { month: 'short' }).toUpperCase().replace(".", "");
  } catch (error) {
    return "";
  }
};
