export const getDays = (startDate, endDate) => {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const diffTime = Math.abs(date2 - date1);
  const diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffDays = diff <= 16 ? diff - 1 : 15;

  return diffDays;
};

export const checkUserInput = (destination, startDate, endDate) => {
  try {
    console.log("1.1) Start function checkUserInput");

    // check that 'destination' is not empty
    if (!destination) {
      alert("Please enter a destination.");
      throw new Error("Please enter a destination.");
    }

    // check that 'start-date' is not empty
    if (!startDate) {
      alert("Please enter a departing date.");
      throw new Error("Please enter a departing date.");
    }

    // create date objects for comparison
    const currentDate = new Date();
    const departingDate = new Date(startDate);
    const returningDate = new Date(endDate);

    // check that 'start-date' is not in the past
    if (departingDate < currentDate) {
      alert("The departing date must be in the future!");
      throw new Error("The departing date must be in the future!");
    }

    // check that 'end-date' is greater than 'start-date', if it wasn't left empty
    if (endDate !== "" && returningDate < departingDate) {
      alert("The returning date must be greater than the departing date!");
      throw new Error(
        "The returning date must be greater than the departing date!"
      );
    }
  } catch (error) {
    // Error handling
    console.log("Error function checkUserInput: ", error);
    throw error;
  }
};
