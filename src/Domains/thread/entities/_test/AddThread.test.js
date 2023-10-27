const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const idUser = 'user-123'
    const payload = {
      title: 'A Thread',
      bodyThread: 'Body Thread',
    };

    // Action and Assert
    expect(() => new AddThread(idUser, payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const idUser = 'user-123'
    const payload = {
      title: 123,
      body: {},
    };

    // Action and Assert
    expect(() => new AddThread(idUser, payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addThread object correctly', () => {
    // Arrange
    const idUser = 'user-123'
    const payload = {
      title: 'A Thread',
      body: 'Thread body',
    };

    // Action
    const addThread = new AddThread(idUser, payload);

    // Assert
    expect(addThread.title).toEqual(payload.title);
    expect(addThread.body).toEqual(payload.body);
  });
});
