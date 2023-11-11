class ThreadRepository {
    async addThread(idUser, addThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getThreadById(idThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async getThreadWithComment(idThread){
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }
}
  
module.exports = ThreadRepository;
  