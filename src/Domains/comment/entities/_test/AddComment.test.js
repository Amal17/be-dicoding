const AddComment = require('../AddComment');

describe('a AddComment entities', () => {
  it('should throw error when userId or threadId is empty', () => {
    // Arrange
    const idThread = 'thread-123'
    const payload = {
      title: 'A Thread',
    };

    // Action and Assert
    expect(() => new AddComment(0, idThread, payload)).toThrowError('ADD_COMMENT.USER_ID_OR_THREAD_ID_EMPTY');
  });

  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const idUser = 'user-123'
    const idThread = 'thread-123'
    const payload = {
      title: 'A Thread',
    };

    // Action and Assert
    expect(() => new AddComment(idUser, idThread, payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const idUser = 'user-123'
    const idThread = 'thread-123'
    const payload = {
      content: 123,
    };

    // Action and Assert
    expect(() => new AddComment(idUser, idThread, payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addComment object correctly', () => {
    // Arrange
    const idUser = 'user-123'
    const idThread = 'thread-123'
    const payload = {
      content: 'Comment content',
    };

    // Action
    const addComment = new AddComment(idUser, idThread, payload);

    // Assert
    expect(addComment.content).toEqual(payload.content);
  });
});
