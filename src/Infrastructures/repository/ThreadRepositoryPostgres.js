const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/thread/entities/AddedThread');
const ThreadRepository = require('../../Domains/thread/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(idUser, addThread) {
    const { title, body } = addThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, owner',
      values: [id, title, body, idUser],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async getThreadById(idThread) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [idThread],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('thread tidak ditemukan di database');
    }

    return new AddedThread({ ...result.rows[0] });
  }

  async getThreadWithComment(idThread) {
    const query = {
      text: 'SELECT threads.id, title, body, created_at as date, username FROM threads, users WHERE threads.id = $1 and users.id = owner',
      values: [idThread]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Thread tidak ditemukan')
    }

    const thread = result.rows[0]

    const query2 = {
      text: 'SELECT comments.id, username, created_at as date, CASE WHEN is_deleted THEN \'**komentar telah dihapus**\' ELSE content  END as content FROM comments, users WHERE "idThread" = $1 and users.id = owner ORDER BY date ASC',
      values: [idThread]
    }
    const comments = await this._pool.query(query2)

    thread.comments = comments.rows
    return thread
  }
}

module.exports = ThreadRepositoryPostgres;
