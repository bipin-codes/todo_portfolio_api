const {
  createController,
} = require('../../../../../../src/routes/v1/todos/create/controller');

const {
  Model: ToDoModel,
} = require('../../../../../../src/routes/v1/todos/dbSchema');

const requestBody = {
  _id: 'mockId',
  task: 'Mock Task',
  task_details: 'Mock Details',
  completed: false,
};

jest.mock('../../../../../../src/routes/v1/todos/dbSchema', () => ({
  Model: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(requestBody),
  })),
}));

describe('createController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {
        task: 'Test Task',
        task_details: 'Test Details',
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should create a new todo successfully', async () => {
    await createController(mockRequest, mockResponse);

    expect(ToDoModel).toHaveBeenCalledWith({
      task: 'Test Task',
      task_details: 'Test Details',
      completed: false,
    });

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Created successfully!',
      status: true,
      data: [requestBody],
    });
  });

  it('should handle missing task in request body', async () => {
    mockRequest.body = { task_details: 'Test Details' };

    await createController(mockRequest, mockResponse);

    expect(ToDoModel).toHaveBeenCalledWith({
      task: undefined,
      task_details: 'Test Details',
      completed: false,
    });
  });

  it('should handle missing task_details in request body', async () => {
    mockRequest.body = { task: 'Test Task' };

    await createController(mockRequest, mockResponse);

    expect(ToDoModel).toHaveBeenCalledWith({
      task: 'Test Task',
      task_details: undefined,
      completed: false,
    });
  });

  it('should handle database errors', async () => {
    const mockError = new Error('Database error');
    ToDoModel.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValue(mockError),
    }));

    await createController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'An error occurred while creating the todo.',
      status: false,
      error: 'Database error',
    });
  });
});
