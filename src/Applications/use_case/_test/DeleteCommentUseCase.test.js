// const AddComment = require('../../../Domains/comment/entities/AddComment');
const AddedComment = require('../../../Domains/comment/entities/AddedComment');
const AddedThread = require('../../../Domains/thread/entities/AddedThread');
const CommentRepository = require('../../../Domains/comment/CommentRepository');
const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');

describe('DeleteCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should throw AuthorizationError if not owner', async () => {
    // Arrange
    const userId = 'owner-123';
    const threadId = 'thread-123';
    const commentId = 'comment-123';

    const mockAddedThread = new AddedThread({
      id: threadId,
      title: 'A thread',
      owner: userId
    })

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'Sebuah Komentar',
      owner: 'user-234'
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));
    mockCommentRepository.getCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    });

    // Action
    await expect(deleteCommentUseCase.execute(userId, threadId, commentId)).rejects.toThrowError(AuthorizationError)

    // Assert
    expect(mockCommentRepository.getCommentById).toBeCalledWith(commentId)
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId)
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const userId = 'owner-123';
    const threadId = 'thread-123';
    const commentId = 'comment-123';

    const mockAddedThread = new AddedThread({
      id: threadId,
      title: 'A thread',
      owner: userId
    })

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: 'Sebuah Komentar',
      owner: userId
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));
    mockCommentRepository.getCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    });

    // Action
    await deleteCommentUseCase.execute(userId, threadId, commentId);

    // Assert
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(commentId)
  });
});
