export const getDays = (startDate,endDate) => {
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    
    const diffTime = Math.abs(date2 - date1);
    const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffDays =  diff <= 16 ? diff -1 : 15; 

    return diffDays
}