class ThreadRepository {
    async addThread(idUser, addThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getThreadById(idThread) {
      throw new Error('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    }

    async addComment(idUser, idThread, addComment) {
      throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getCommentById(idComment) {
      throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async deleteCommentById(idComment) {
      throw new Error('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}
  
module.exports = ThreadRepository;
  