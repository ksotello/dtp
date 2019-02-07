import { daysInMonth, getMonthName, getYear } from ".";

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

  describe("getYear()", () => {
    it("should return a string value", done => {
      expect(typeof getYear({}) === "string").toBe(true);
      done();
    });

    it("should return the next year as being 1970 for January if the current month is December", done => {
      expect(
        getYear({
          currentMonth: "December",
          nextMonth: "January",
          currentYear: "1969"
        })
      ).toBe("1970");
      done();
    });

    it("should return the previous year as being 1969 if the current month is January and the next month is December", done => {
      expect(
        getYear({
          currentMonth: "January",
          nextMonth: "December",
          currentYear: "1970"
        })
      ).toBe("1969");
      done();
    });

    it("should return the same year for each month if no year change is needed", done => {
      expect(
        getYear({
          currentMonth: "August",
          nextMonth: "July",
          currentYear: "1988"
        })
      ).toBe("1988");
      done();
    });
  });
});
