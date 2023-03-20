import { ChromeStorageAdapter } from "../03-adapters/secondary/ChromeStorage";

describe("Validate:", () => {

  const storage = new ChromeStorageAdapter();
  let data: any, result: any;
  const latestVersion = 1;

  describe("from version 0:", () => {

    test("empty object", () => {
      data = {};
      result = {
        version: latestVersion,
        apiKey: "",
        prompts: [],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

    test("object with missing properties", () => {
      data = {
        apiKey: 2,
      };
      result = {
        version: latestVersion,
        apiKey: "",
        prompts: [],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

    test("array with bad element type", () => {
      data = {
        apiKey: 2,
        prompts: [
          "toto",
        ],
      };
      result = {
        version: latestVersion,
        apiKey: "",
        prompts: [],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

    test("array with bad element", () => {
      data = {
        apiKey: 2,
        prompts: [{name: 3, value: 5}],
      };
      result = {
        version: latestVersion,
        apiKey: "",
        prompts: [{id: 0, name: "", value: ""}],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

    test("array with good and bad element", () => {
      data = {
        apiKey: "2",
        prompts: [{name: "3", value: "5"}, "toto"],
      };
      result = {
        version: latestVersion,
        apiKey: "2",
        prompts: [],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

    test("array with good elements", () => {
      data = {
        apiKey: "2",
        prompts: [{name: "3", value: "5"}, {name: "yes", value: "no"}],
      };
      result = {
        version: latestVersion,
        apiKey: "2",
        prompts: [{id: 0, name: "3", value: "5"}, {id: 1, name: "yes", value: "no"}],
      };
      expect(storage.validate(data)).toStrictEqual(result);
    });

  });

  describe("from version 1:", () => {
    /**
     * @todo to implment at next schema version
     */
  });

});
