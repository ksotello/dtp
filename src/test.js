import "./setupTests";

import React from "react";
import { mount } from "enzyme";

import { DateTimePicker } from "./";
import { TriggerComponent } from "./TriggerComponent";

import { getMonthName, daysInMonth } from "./utils";

describe("<DateTimePicker />", () => {
  let wrapper;

  const getDaysInMonthStr = numDays => {
    let str = "";
    for (let i = 0; i < numDays; i++) {
      str += i + 1;
    }

    return str;
  };

  // cleanup
  afterEach(() => {
    wrapper && wrapper.unmount();
    wrapper = null;
  });

  it("should mount", done => {
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.exists()).toBe(true);
    done();
  });

  it("should be hidden by default if a trigger component is used.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);
    expect(wrapper.find(TriggerComponent).length).toBe(1);
    expect(wrapper.find(".dtp").length).toBe(0);
    done();
  });

  it("should display the date time picker by default if not trigger is used.", done => {
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.find(".dtp").length).toBe(1);
    done();
  });

  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(1);
    done();
  });

  it("should display the date time picker when clicking on a trigger component.", done => {
    wrapper = mount(<DateTimePicker trigger={<TriggerComponent />} />);

    // click the TriggerComponent to display the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(1);

    // click the TriggerComponent to hide the Date Time Picker
    wrapper.find(TriggerComponent).simulate("click");
    expect(wrapper.find(".dtp").length).toBe(0);

    done();
  });

  it("should display the current month by default", done => {
    const date = new Date();
    wrapper = mount(<DateTimePicker />);
    expect(
      wrapper
        .find(".dtp__header")
        .render()
        .text()
    ).toEqual(getMonthName({ monthIndex: date.getMonth() }));
    done();
  });

  it("should display both the current and next month if a range is needed", done => {
    const date = new Date();
    wrapper = mount(<DateTimePicker hasRange />);
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() }))
    );
    expect(wrapper.render().text()).toMatch(
      new RegExp(getMonthName({ monthIndex: date.getMonth() + 1 }))
    );
    done();
  });

  it("should display the correct number of days for the current month", done => {
    const date = new Date();
    const numDays = daysInMonth({
      month: getMonthName({ monthIndex: date.getMonth() })
    });

    wrapper = mount(<DateTimePicker />);
    expect(wrapper.render().text()).toMatch(
      new RegExp(getDaysInMonthStr(numDays))
    );
    done();
  });

  it("should display the correct number of days for the next month if a range is used", done => {
    const date = new Date();
    const numDays = daysInMonth({
      month: getMonthName({ monthIndex: date.getMonth() + 1 })
    });

    wrapper = mount(<DateTimePicker hasRange />);
    expect(
      wrapper
        .find(".dtp__nextMonth")
        .render()
        .text()
    ).toMatch(new RegExp(getDaysInMonthStr(numDays)));
    done();
  });

  it("should hightlight the current date", done => {
    const date = new Date();
    wrapper = mount(<DateTimePicker />);
    expect(wrapper.find(".dtp__date--highlighted").length).toBe(1);
    expect(
      wrapper
        .find(".dtp__date--highlighted")
        .render()
        .text()
    ).toEqual(date.getDate().toString());
    done();
  });
});
