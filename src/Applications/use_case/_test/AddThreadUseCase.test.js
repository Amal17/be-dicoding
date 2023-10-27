const AddThread = require('../../../Domains/thread/entities/AddThread');
const AddedThread = require('../../../Domains/thread/entities/AddedThread');
const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddUserUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const userId = 'owner-123';
    const useCasePayload = {
      title: 'A Thread',
      body: 'Thread body',
    };

    const mockAddedThread = new AddedThread({
      id: 'user-123',
      title: useCasePayload.title,
      owner: userId
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(userId, useCasePayload);

    // Assert
    expect(addedThread).toStrictEqual(new AddedThread({
      id: 'user-123',
      title: useCasePayload.title,
      owner: userId,
    }));

    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread(userId, {
      title: useCasePayload.title,
      body: useCasePayload.body,
    }));
  });
});
