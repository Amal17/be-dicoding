const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(userId, threadId, commentId) {
    await this._threadRepository.getThreadById(threadId);
    const comment = await this._commentRepository.getCommentById(commentId);
    if (comment.owner !== userId)
      throw new AuthorizationError('Tidak memiliki hak untuk ini');
    return this._commentRepository.deleteCommentById(commentId);
  }
}

module.exports = DeleteCommentUseCase;
