const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddComment = require('../../../Domains/comment/entities/AddComment')
const AddedComment = require('../../../Domains/comment/entities/AddedComment')
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist new comment and return added comment correctly', async () => {
      // Arrange
      const idUser = 'user-123'
      const idThread = 'thread-123'
      const addComment = new AddComment(idUser, idThread, {
        content: 'A Comment of Thread',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(idUser, idThread, addComment);

      // Assert
      const comment = await CommentTableTestHelper.findCommentById('comment-123');
      expect(comment).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const idUser = 'user-123'
      const idThread = 'thread-123'
      const addComment = new AddComment(idUser, idThread, {
        content: 'A Comment of Thread',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedComment  = await commentRepositoryPostgres.addComment(idUser, idThread, addComment);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'A Comment of Thread',
        owner: 'user-123',
      }));
    });
  });

  describe('getCommentById function', () => {
    it('should throw NotFoundError if incorrect id', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)
      const idComment = 'comment-123'

      // Action and Assert
      await expect(commentRepositoryPostgres.getCommentById(idComment)).rejects.toThrowError(NotFoundError)
    })

    it('should return correct thread', async () => {
      // Arrange
      const idUser = 'user-123'
      const idComment = 'comment-123'
      const idThread = 'thread-123'

    //   ThreadsTableTestHelper.addThread({
    //             id: idThread, 
    //             title: 'A thread', 
    //             body: 'The thread body', 
    //             owner: idUser
    //         })
      CommentTableTestHelper.addComment({
                id:idComment, 
                idThread:idThread, 
                content:'Sebuah Komentar', 
                owner:idUser
            })

      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const getComment = await commentRepositoryPostgres.getCommentById(idComment)

      // Assert
      expect(getComment).toStrictEqual(new AddedComment({
        id: idComment,
        content: 'Sebuah Komentar',
        owner: idUser,
      }));

    })
  })

  describe('deleteCommentById function', () => {
    it('should throw NotFoundError if incorrect id', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)
      const idComment = 'comment-123'

      // Action and Assert
      await expect(commentRepositoryPostgres.deleteCommentById(idComment)).rejects.toThrowError(NotFoundError)
    })

    it('should delete correct thread', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)
      const idComment = 'comment-123'
      const notDeleteId = 'comment-234'

      // Action
      CommentTableTestHelper.addComment({id: idComment, idThread: 'thread-123', content: 'Sebuah komentar', owner: 'user-234'})
      CommentTableTestHelper.addComment({id: notDeleteId, idThread: 'thread-123', content: 'Sebuah komentar kedua', owner: 'user-234'})
      
      await commentRepositoryPostgres.deleteCommentById(idComment)

      // Assert
      const deleted = await CommentTableTestHelper.findCommentById(idComment)
      const notDelete = await CommentTableTestHelper.findCommentById(notDeleteId)
      expect(deleted[0].is_deleted).toEqual(true)
      expect(notDelete[0].is_deleted).toEqual(false)
    })
  })
});
