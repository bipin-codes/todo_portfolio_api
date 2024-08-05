const {
  createValidator,
} = require('../../../../../../src/routes/v1/todos/create');

const validRequest = {
  task: 'First task of the day',
};

describe('createValidator : ', () => {
  let next;
  beforeEach(() => {
    next = jest.fn();
  });

  it("should call next if request contains valid 'task'", async () => {
    await createValidator({ body: validRequest }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("should call next if request contains valid 'task', 'task_details', 'completed'", async () => {
    await createValidator(
      {
        body: {
          ...validRequest,
          task_details: 'valid details for the task',
          completed: false,
        },
      },
      {},
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it("should call next with error if body doesn't contain 'task' ", async () => {
    await createValidator({ body: {} }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith([
      {
        msg: 'Task must be between 5 - 255 characters in length',
        value: 'task',
      },
    ]);
  });

  it("should call next with error if body doesn't contain invalid 'task' ", async () => {
    await createValidator({ body: { task: '' } }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith([
      {
        msg: 'Task must be between 5 - 255 characters in length',
        value: 'task',
      },
    ]);
  });

  it("should call next with error if body contains invalid 'task_details' 'complted' ", async () => {
    await createValidator(
      { body: { ...validRequest, task_details: '', completed: 'fqw' } },
      {},
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith([
      {
        msg: 'Task details must be between 10 - 1000 characters in length',
        value: 'task_details',
      },
      {
        msg: "Param 'completed' must be boolean",
        value: 'completed',
      },
    ]);
  });
});
