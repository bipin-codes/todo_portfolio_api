const { mongoose } = require('mongoose');
const {
  updateValidator,
} = require('../../../../../../src/routes/v1/todos/update');

const validRequest = {
  id: new mongoose.Types.ObjectId().toString(),
  task: 'test task',
};

describe('updateValidator: ', () => {
  let next;
  beforeEach(() => {
    next = jest.fn();
  });

  it("should call next if request contains valid 'id'", async () => {
    await updateValidator({ body: validRequest }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next if request contains invalid body', async () => {
    await updateValidator({ body: {} }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith([
      { msg: 'Not a valid ID!', value: 'id' },
      {
        msg: 'Task must be between 5 - 255 characters in length',
        value: 'task',
      },
    ]);
  });

  it('should call next if request contains invalid body', async () => {
    await updateValidator(
      { body: { ...validRequest, task_details: '12' } },
      {},
      next
    );
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);

    expect(next).toHaveBeenCalledWith([
      {
        msg: 'Task details must be between 10 - 1000 characters in length',
        value: 'task_details',
      },
    ]);
  });
});
