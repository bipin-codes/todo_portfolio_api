const { mongoose } = require('mongoose');
const {
  deleteValidator,
} = require('../../../../../../src/routes/v1/todos/delete');

const validRequest = {
  id: new mongoose.Types.ObjectId(),
};

describe('deleteValidator : ', () => {
  let next;
  beforeEach(() => {
    next = jest.fn();
  });

  it("should call next if request contains valid 'id'", async () => {
    await deleteValidator({ body: validRequest }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with error if request contains invalid ', async () => {
    await deleteValidator({ body: {} }, {}, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith([
      { msg: 'Not a valid ID!', value: 'id' },
    ]);
  });
});
