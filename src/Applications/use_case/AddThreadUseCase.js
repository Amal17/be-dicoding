const AddThread = require('../../Domains/thread/entities/AddThread')

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, useCasePayload) {
    const addThread = new AddThread(userId, useCasePayload);
    return this._threadRepository.addThread(userId, addThread);
  }
}

module.exports = AddThreadUseCase;
