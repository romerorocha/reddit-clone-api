import { asyncResponse } from "../util";

jest.useFakeTimers();

describe("Utilitário Async Response", () => {
  it("deveria chamar função depois com delay", () => {
    asyncResponse({ dados: 1 }).then((res) => {
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0);
      expect(res).toStrictEqual({ dados: 1 });
    });

    jest.runAllTimers();
  });
});
