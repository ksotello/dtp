import { daysInMonth, getMonthName } from ".";

describe("The utility suite", () => {
  describe("daysInMonth()", () => {
    it("should return 28 days in febuary", () => {
      expect(daysInMonth({ month: "Febuary", year: 2019 })).toBe(28);
    });
  });

  describe("getMonthName()", () => {
    it("should return the correct month name", () => {
      expect(getMonthName({ monthIndex: 9 })).toBe("October");
    });

    it("should return January as the next month if the current month is December", () => {
      expect(getMonthName({ monthIndex: 12 })).toBe("January");
    });
  });
});
