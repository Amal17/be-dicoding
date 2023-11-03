// const AddThread = require('../../Domains/thread/entities/AddThread')

class GetThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    return this._threadRepository.getThreadWithComment(threadId);
  }
}

module.exports = GetThreadUseCase;
