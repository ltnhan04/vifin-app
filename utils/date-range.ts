const now = new Date();
const weekStart = new Date(now);
const weekEnd = new Date(now);
weekEnd.setDate(now.getDate() + 7);

const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const yearStart = new Date(now.getFullYear(), 0, 1);
const yearEnd = new Date(now.getFullYear(), 11, 31);
export { weekStart, weekEnd, monthStart, monthEnd, yearStart, yearEnd };
