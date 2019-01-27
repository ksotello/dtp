import { daysInMonth, getMonthName } from ".";

describe("The utility suite", () => {
  describe("daysInMonth()", () => {
    it("should return 28 days in febuary", () => {
      expect(daysInMonth({ month: "Febuary", year: 2019 })).toBe(28);
    });
  });

  describe("getMonthName()", () => {
    expect(getMonthName({ monthIndex: 9 })).toBe("October");
  });
});
