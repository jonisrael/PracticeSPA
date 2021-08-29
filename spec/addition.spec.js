const assert = require("assert");
const addition = require("../addition.js");

describe("addition()", function() {
  //ARRANGE
  let sum = 33;
  //ACT
  let result = addition(8, 25);
  console.log("Result:", result);
  //ASSERT it params are ("description", function)
  it("it should return 33", function() {
    expect(result).toEqual(sum);
  });
});
