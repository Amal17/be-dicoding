const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const GetThreadUseCase = require('../GetThreadUseCase');

describe('GetThreadUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the get thread action correctly', async () => {
    // Arrange
    const threadId = 'thread-123'

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getThreadWithComment = jest.fn()
      .mockImplementation(() => Promise.resolve({}));

    /** creating use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const getThread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(getThread).toBeDefined()

    expect(mockThreadRepository.getThreadWithComment).toBeCalledWith(threadId)
  });
});
