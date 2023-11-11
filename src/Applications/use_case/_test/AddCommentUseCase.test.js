const AddComment = require('../../../Domains/comment/entities/AddComment');
const AddedComment = require('../../../Domains/comment/entities/AddedComment');
const AddedThread = require('../../../Domains/thread/entities/AddedThread');
const CommentRepository = require('../../../Domains/comment/CommentRepository');
const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add comment action correctly', async () => {
    // Arrange
    const userId = 'owner-123';
    const threadId = 'thread-123'
    const useCasePayload = {
      content: 'Sebuah Komentas',
    };

    const mockAddedThread = new AddedThread({
      id: threadId,
      title: 'A thread',
      owner: userId
    })

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: userId
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment));

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    });

    // Action
    const addedComment = await addCommentUseCase.execute(userId, threadId, useCasePayload);

    // Assert
    expect(addedComment).toStrictEqual(new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: userId,
    }));

    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId)
    expect(mockCommentRepository.addComment).toBeCalledWith(userId, threadId, new AddComment(userId, threadId, useCasePayload))
  });
});
