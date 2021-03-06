import "./setupTests";

import React from "react";
import { mount } from "enzyme";

import { Pykz } from "./";
import { TriggerComponent } from "./TriggerComponent";

import { getMonthName, daysInMonth } from "./utils";

describe("<Pykz />", () => {
  let wrapper, date;

  const getDaysInMonthStr = numDays => {
    let str = "";
    for (let i = 0; i < numDays; i++) {
      str += i + 1;
    }

    return str;
  };

  // prebuild the things
  beforeEach(() => {
    date = new Date();
  });

  // cleanup
  afterEach(() => {
    wrapper && wrapper.unmount();
    wrapper = date = null;
  });

  it("should mount", done => {
    wrapper = mount(<Pykz />);
    expect(wrapper.exists()).toBe(true);
    done();
  });

  it("should be hidden by default if a trigger component is used.", done => {
    wrapper = mount(<Pykz trigger={<TriggerComponent />} />);
    expect(wrapper.find(TriggerComponent).length).toBe(1);
    expect(wrapper.find(".pykz").length).toBe(0);
    done();
  });

  it("should display the date picker by default if not trigger is used.", done => {
    wrapper = mount(<Pykz />);
    expect(wrapper.find(".pykz").length).toBe(1);
    done();
  });

  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<Pykz trigger={<TriggerComponent />} />);
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".pykz").length).toBe(1);
    done();
  });

  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<Pykz trigger={<TriggerComponent />} />);

    // click the TriggerComponent to display the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".pykz").length).toBe(1);

    // click the TriggerComponent to hide the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".pykz").length).toBe(0);

    done();
  });

  it("should display the current month by default", done => {
    wrapper = mount(<Pykz />);
    expect(
      wrapper
        .find(".pykz__header")
        .render()
        .text()
    ).toMatch(new RegExp(getMonthName({ monthIndex: date.getMonth() })));
    done();
  });

  it("should display both the current and next month if a range is needed", done => {
    wrapper = mount(<Pykz hasRange />);
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() }))
    );
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() + 1 }))
    );
    done();
  });

  it("should display the correct number of days for the current month", done => {
    const numDays = daysInMonth({
      month: getMonthName({ monthIndex: date.getMonth() })
    });

    wrapper = mount(<Pykz />);
    expect(wrapper.render().text()).toMatch(
      new RegExp(getDaysInMonthStr(numDays))
    );
    done();
  });

  it("should display the correct number of days for the next month if a range is used", done => {
    const numDays = daysInMonth({
      month: getMonthName({ monthIndex: date.getMonth() + 1 })
    });

    wrapper = mount(<Pykz hasRange />);
    expect(
      wrapper
        .find(".pykz__nextMonth")
        .render()
        .text()
    ).toMatch(new RegExp(getDaysInMonthStr(numDays)));
    done();
  });

  it("should hightlight the current date", done => {
    wrapper = mount(<Pykz />);
    expect(wrapper.find(".pykz__date--highlighted").length).toBe(1);
    expect(
      wrapper
        .find(".pykz__date--highlighted")
        .render()
        .text()
    ).toEqual(date.getDate().toString());
    done();
  });

  it("should display the current year by default", done => {
    wrapper = mount(<Pykz />);
    expect(wrapper.render().text()).toMatch(new RegExp(date.getUTCFullYear()));
    done();
  });

  it("should display the next month as January if the current month is December", done => {
    const spy = jest.spyOn(Date.prototype, "getMonth");
    spy.mockReturnValue(11);

    wrapper = mount(<Pykz hasRange />);

    expect(wrapper.render().text()).toMatch(new RegExp("December"));
    expect(wrapper.render().text()).toMatch(new RegExp("January"));

    done();
  });

  it("should display the next year as 1970 if the next month is January and the current month is December", done => {
    const monthSpy = jest.spyOn(Date.prototype, "getMonth");
    const yearSpy = jest.spyOn(Date.prototype, "getUTCFullYear");

    monthSpy.mockReturnValue(11);
    yearSpy.mockReturnValue(1969);

    wrapper = mount(<Pykz hasRange />);

    expect(wrapper.render().text()).toMatch(new RegExp("1969"));
    expect(wrapper.render().text()).toMatch(new RegExp("1970"));

    done();
  });

  it("should display the year as 1989 is the current month is April and the next month is May", done => {
    const monthSpy = jest.spyOn(Date.prototype, "getMonth");
    const yearSpy = jest.spyOn(Date.prototype, "getUTCFullYear");

    monthSpy.mockReturnValue(3);
    yearSpy.mockReturnValue(1989);

    wrapper = mount(<Pykz hasRange />);

    expect(wrapper.render().text()).toMatch(new RegExp("1989"));
    expect(wrapper.render().text()).toMatch(new RegExp("1989"));

    done();
  });

  it("should allow for customization of day cells", done => {
    const monthSpy = jest.spyOn(Date.prototype, "getMonth");
    const yearSpy = jest.spyOn(Date.prototype, "getUTCFullYear");

    monthSpy.mockReturnValue(3);
    yearSpy.mockReturnValue(2019);

    wrapper = mount(
      <Pykz
        dayCell={({ currentDay, isCurrentDay }) => (
          <div>
            The current day is: {currentDay}
            The day of the week is: {isCurrentDay}
          </div>
        )}
      />
    );

    expect(wrapper.render().text()).toMatch(new RegExp("The current day is:"));
    expect(wrapper.render().text()).toMatch(
      new RegExp("The day of the week is:")
    );

    done();
  });

  it("should allow for customization of header cells", done => {
    const monthSpy = jest.spyOn(Date.prototype, "getMonth");
    const yearSpy = jest.spyOn(Date.prototype, "getUTCFullYear");

    monthSpy.mockReturnValue(3);
    yearSpy.mockReturnValue(2019);

    wrapper = mount(
      <Pykz
        headerCell={({ currentMonth, currentYear }) => (
          <div>
            The current month is: {currentMonth}
            The year is: {currentYear}
          </div>
        )}
      />
    );

    expect(wrapper.render().text()).toMatch(
      new RegExp("The current month is:")
    );
    expect(wrapper.render().text()).toMatch(new RegExp("The year is:"));

    done();
  });
});
