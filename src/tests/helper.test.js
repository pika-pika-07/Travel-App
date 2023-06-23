import {
    getDays
} from '../client/js/helper'

describe("get Days funciton", () => {
    test("should return days", () => {
      const startDate = "2023-06-10";
      const endDate = "2023-06-12"
      const result  = getDays(startDate,endDate)
      expect(result).toEqual(1);
    });
  
  });
  