class AddComment {
  constructor(userId, threadId, payload) {
    this._verify(userId, threadId);
    this._verifyPayload(payload);

    const { content } = payload;

    this.content = content;
  }

  _verify(userId, threadId) {
    if (!userId || !threadId) {
      throw new Error('ADD_COMMENT.USER_ID_OR_THREAD_ID_EMPTY');
    }
  }

  _verifyPayload({ content }) {
    if (!content) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
