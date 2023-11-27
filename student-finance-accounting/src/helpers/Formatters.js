export const getTodaysDateFormatted = () => {
    const today = new Date();
    const [year, month, day] = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
      .map(num => num.toString().padStart(2, '0'));
  
    return `${year}${month}${day}`;
}
