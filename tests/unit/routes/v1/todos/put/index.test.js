const {
  Model: ToDoModel,
} = require('../../../../../../src/routes/v1/todos/dbSchema');
const {
  updateController,
} = require('../../../../../../src/routes/v1/todos/update/controller');

jest.mock('../../../../../../src/routes/v1/todos/dbSchema', () => ({
  Model: {
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('updateController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        id: 'mockId',
        task: 'Updated Task',
        task_details: 'Updated Details',
        completed: true,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(Date, 'now').mockImplementation(() => 1234567890);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update a todo item and return success response', async () => {
    // Arrange
    const mockUpdatedTask = {
      id: 'mockId',
      task: 'Updated Task',
      task_details: 'Updated Details',
      completed: true,
      updated: 1234567890,
    };
    ToDoModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedTask);

    await updateController(req, res);

    expect(ToDoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'mockId',
      {
        task: 'Updated Task',
        task_details: 'Updated Details',
        completed: true,
        updated: 1234567890,
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Updated successfully!',
      status: true,
      data: [mockUpdatedTask],
    });
  });

  it('should return 404 if no task is found', async () => {
    ToDoModel.findByIdAndUpdate.mockResolvedValue(null);

    await updateController(req, res);

    expect(ToDoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'mockId',
      {
        task: 'Updated Task',
        task_details: 'Updated Details',
        completed: true,
        updated: 1234567890,
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'No such task found!',
      status: false,
      data: [null],
    });
  });
});
