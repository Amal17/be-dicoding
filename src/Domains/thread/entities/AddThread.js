class AddThread {
  constructor(userId, payload) {
    this._verifyUser(userId);
    this._verifyPayload(payload);

    const { title, body } = payload;

    this.title = title;
    this.body = body;
  }

  _verifyUser(userId) {
    if (!userId) {
      throw new Error('ADD_THREAD.USER_ID_EMPTY');
    }
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

  }
}

module.exports = AddThread;
