const {
  Model: ToDoModel,
} = require('../../../../../../src/routes/v1/todos/dbSchema');
const {
  deleteController,
} = require('../../../../../../src/routes/v1/todos/delete/controller');

jest.mock('../../../../../../src/routes/v1/todos/dbSchema', () => ({
  Model: {
    findByIdAndDelete: jest.fn(),
  },
}));

describe('deleteController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { id: 'mockId' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a todo item and return success response', async () => {
    ToDoModel.findByIdAndDelete.mockResolvedValue(true);

    await deleteController(req, res);

    expect(ToDoModel.findByIdAndDelete).toHaveBeenCalledWith('mockId');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Deleted successfully!',
      status: true,
      data: [{ id: 'mockId' }],
    });
  });

  it('should handle errors and pass them to next middleware', async () => {
    const mockError = new Error('Database error');
    ToDoModel.findByIdAndDelete.mockRejectedValue(mockError);
    await deleteController(req, res);

    expect(ToDoModel.findByIdAndDelete).toHaveBeenCalledWith('mockId');

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Error occured while trying to delete Todo',
      status: false,
      error: 'Database error',
    });
  });
});
