const AddComment = require('../../Domains/thread/entities/AddComment')

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, threadId, useCasePayload) {
    const addComment = new AddComment(userId, threadId, useCasePayload);
    await this._threadRepository.getThreadById(threadId);
    return this._threadRepository.addComment(userId, threadId, addComment);
  }
}

module.exports = AddCommentUseCase;
