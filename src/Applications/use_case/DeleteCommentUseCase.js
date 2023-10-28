const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

class DeleteCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, threadId, commentId) {
    await this._threadRepository.getThreadById(threadId);
    const comment = await this._threadRepository.getCommentById(commentId);
    if (comment.owner !== userId)
      throw new AuthorizationError('Tidak memiliki hak untuk ini');
    return this._threadRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
