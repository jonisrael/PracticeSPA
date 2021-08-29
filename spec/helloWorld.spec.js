const assert = require("assert");
const helloWorld = require("../helloWorld.js");

describe("helloWorld()", function() {
  //ARRANGE
  let greeting = "Hello World";
  //ACT
  let result = helloWorld();
  console.log("Result:", result);
  //ASSERT it params are ("description", function)
  it("it should return Hello World", function() {
    expect(result).toEqual(greeting);
  });
});
