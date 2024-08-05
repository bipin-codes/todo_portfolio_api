const { getValidator } = require('../../../../../../src/routes/v1/todos/get');

describe('getValidator : ', () => {
  let next;
  beforeEach(() => {
    next = jest.fn();
  });

  it('should call next if request contains no parameters', async () => {
    await getValidator({ query: {} }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next if request contains {completed: true}', async () => {
    await getValidator({ query: { completed: true } }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next if request contains {completed: true, limit: 5, page: 1}', async () => {
    await getValidator({ query: { completed: true } }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("should call next with error if request contains {completed: '123', limit: 'w', page: 'x'}", async () => {
    await getValidator(
      { query: { completed: '123', limit: 'w', page: 'x' } },
      {},
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith([
      { msg: "Param 'completed' must be boolean", value: 'completed' },
      { msg: "Param 'limit' must be number", value: 'limit' },
      { msg: "Param 'page' must be number", value: 'page' },
    ]);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
