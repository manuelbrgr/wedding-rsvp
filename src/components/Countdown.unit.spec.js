import { toCountdown } from "./Countdown";
import moment from "moment";

describe("toCountdown", () => {
  test("returns a valid time information given a from and until date", () => {
    expect(toCountdown({ from: "2022-04-16", until: "2022-09-10" })).toEqual(
      "4 Months 25 Days 0 Hours"
    );
  });

  test("returns a valid time information given only an until date", () => {
    const expected = toCountdown({ from: moment(), until: "2022-09-10" });

    expect(toCountdown({ until: "2022-09-10" })).toEqual(expected);
  });

  test("returns an empty string given a from date in the future", () => {
    expect(toCountdown({ from: "2022-10-01", until: "2022-09-10" })).toEqual(
      ""
    );
  });

  test("returns an empty string given no until date", () => {
    expect(toCountdown({})).toEqual("");
  });
});
