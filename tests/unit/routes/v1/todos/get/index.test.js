const {
  Model: ToDoModel,
} = require('../../../../../../src/routes/v1/todos/dbSchema');

const {
  getController,
} = require('../../../../../../src/routes/v1/todos/get/controller');

jest.mock('../../../../../../src/routes/v1/todos/dbSchema', () => ({
  Model: {
    find: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockResolvedValue([]),
  },
}));

describe('getController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      query: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should fetch todos with default pagination', async () => {
    await getController(mockRequest, mockResponse);

    expect(ToDoModel.find).toHaveBeenCalledWith({});
    expect(ToDoModel.skip).toHaveBeenCalledWith(0);
    expect(ToDoModel.limit).toHaveBeenCalledWith(10);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Fetched successfully!',
      status: true,
      data: [],
    });
  });

  it('should apply custom limit', async () => {
    mockRequest.query = { limit: 5 };

    await getController(mockRequest, mockResponse);

    expect(ToDoModel.limit).toHaveBeenCalledWith(5);
  });

  it('should apply custom page', async () => {
    mockRequest.query = { page: 2, limit: 10 };

    await getController(mockRequest, mockResponse);

    expect(ToDoModel.skip).toHaveBeenCalledWith(20);
  });

  it('should apply completed filter', async () => {
    mockRequest.query = { completed: 'true' };

    await getController(mockRequest, mockResponse);

    expect(ToDoModel.find).toHaveBeenCalledWith({ completed: 'true' });
  });

  it('should handle multiple query parameters', async () => {
    mockRequest.query = { completed: 'false', limit: 5, page: 1 };

    await getController(mockRequest, mockResponse);

    expect(ToDoModel.find).toHaveBeenCalledWith({ completed: 'false' });
    expect(ToDoModel.skip).toHaveBeenCalledWith(5);
    expect(ToDoModel.limit).toHaveBeenCalledWith(5);
  });

  it('should return fetched data', async () => {
    const mockData = [{ id: 1, title: 'Test Todo', completed: false }];
    ToDoModel.limit.mockResolvedValueOnce(mockData);

    await getController(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Fetched successfully!',
      status: true,
      data: mockData,
    });
  });

  it('should handle database errors', async () => {
    const error = new Error('Database error');
    ToDoModel.limit.mockRejectedValueOnce(error);

    await getController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'An error occurred while fetching todos',
      status: false,
      error: 'Database error',
    });
  });
});
