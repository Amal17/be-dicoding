const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'app_jwt'
    }
  },
  {
    method: 'POST',
    path: '/threads/{id}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'app_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'app_jwt'
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getDetailThreadHandler
  }

  
]);

module.exports = routes;
