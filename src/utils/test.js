import { daysInMonth, getMonthName } from ".";

describe("The utility suite", () => {
  describe("daysInMonth()", () => {
    it("should return 31 days for january", () => {
      expect(daysInMonth({ month: 1, year: 2019 })).toBe(31);
    });
  });

  describe("getMonthName()", () => {
    expect(getMonthName({ monthIndex: 9 })).toBe("October");
  });
});
