const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase')
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase')
const GetThreadUseCase = require('../../../../Applications/use_case/GetThreadUseCase')
class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
    this.getDetailThreadHandler = this.getDetailThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const { id: userId } = request.auth.credentials;
    const addedThread = await addThreadUseCase.execute(userId, request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async postCommentHandler(request, h){
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name)
    const { id: threadId } = request.params
    const { id: userId } = request.auth.credentials

    const addedComment = await addCommentUseCase.execute(userId, threadId, request.payload)

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCommentHandler(request, h){
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name)
    const { threadId, commentId } = request.params
    const { id: userId } = request.auth.credentials

    await deleteCommentUseCase.execute(userId, threadId, commentId)

    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }

  async getDetailThreadHandler(request, h){
    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name)
    const { threadId } = request.params

    const thread = await getThreadUseCase.execute(threadId)

    const response = h.response({
      status: 'success',
      data: {
        thread
      }
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
