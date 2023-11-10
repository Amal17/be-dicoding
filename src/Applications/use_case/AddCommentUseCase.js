const AddComment = require('../../Domains/thread/entities/AddComment')

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(userId, threadId, useCasePayload) {
    const addComment = new AddComment(userId, threadId, useCasePayload);
    await this._threadRepository.getThreadById(threadId);
    return this._commentRepository.addComment(userId, threadId, addComment);
  }
}

module.exports = AddCommentUseCase;
