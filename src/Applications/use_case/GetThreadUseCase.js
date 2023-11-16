// const AddThread = require('../../Domains/thread/entities/AddThread')

class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);
    let comments = await this._commentRepository.getCommentsByThread(threadId);

    comments = comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      date: comment.created_at,
      content: comment.is_deleted
        ? '**komentar telah dihapus**'
        : comment.content,
    }));

    return {
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.created_at,
      username: thread.username,
      comments,
    };
  }
}

module.exports = GetThreadUseCase;
