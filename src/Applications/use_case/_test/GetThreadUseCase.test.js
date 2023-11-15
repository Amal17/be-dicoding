const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const CommentRepository = require('../../../Domains/comment/CommentRepository');
const AddedThread = require('../../../Domains/thread/entities/AddedThread')
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
    const mockCommentRepository = new CommentRepository();


    // const thread = await this._threadRepository.getThreadById(threadId);
    // let comments = await this._commentRepository.getCommentsByThread(threadId);

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(
        () => Promise.resolve(
              new AddedThread({ 
                id: 'thread-123', 
                title: 'A title', 
                owner: 'user-123' 
              })
          )
      );
    
    mockCommentRepository.getCommentsByThread = jest.fn()
      .mockImplementation(() => Promise.resolve([]))


    /** creating use case instance */
    const getThreadUseCase = new GetThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    });

    // Action
    const getThread = await getThreadUseCase.execute(threadId);

    // Assert
    expect(getThread).toBeDefined()

    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId)
    expect(mockCommentRepository.getCommentsByThread).toBeCalledWith(threadId)
  });
});
