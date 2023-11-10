const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const CommentRepository = require('../../Domains/comment/CommentRepository');
const AddedComment = require('../../Domains/thread/entities/AddedComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(idUser, idThread, addComment) {
    const id = `comment-${this._idGenerator()}`;
    const { content } = addComment;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, owner',
      values: [id, idThread, content, idUser],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async getCommentById(idComment) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [idComment],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('comment tidak ditemukan di database');
    }

    return result.rows[0]
  }

  async deleteCommentById(idComment) {
    const query = {
      text: 'UPDATE comments SET is_deleted = true WHERE id = $1 RETURNING id',
      values: [idComment]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Gagal memperbarui hapus komentar. Id tidak ditemukan')
    }
  }
}

module.exports = CommentRepositoryPostgres;
