const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddThread = require('../../../Domains/thread/entities/AddThread');
const AddedThread = require('../../../Domains/thread/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist new thread and return added thread correctly', async () => {
      // Arrange
      const idUser = 'user-123'
      const addThread = new AddThread({
        title: 'A Thread',
        body: 'Thread body',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await threadRepositoryPostgres.addThread(idUser, addThread);

      // Assert
      const thread = await ThreadsTableTestHelper.findThreadById('thread-123');
      expect(thread).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const idUser = 'user-123'
      const addThread = new AddThread({
        title: 'A Thread',
        body: 'Thread body',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(idUser, addThread);

      // Assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'A Thread',
        owner: 'user-123',
      }));
    });
  });

  describe('getThreadById function', () => {
    it('should throw NotFoundError if incorrect id', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
      const idThread = 'thread-123'

      // Action and Assert
      await expect(threadRepositoryPostgres.getThreadById(idThread)).rejects.toThrowError(NotFoundError)
    })

    it('should return correct thread', async () => {
      // Arrange
      const idUser = 'user-123'
      const addThread = new AddThread({
        title: 'A Thread',
        body: 'Thread body',
      });
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(idUser, addThread);
      const getThread = await threadRepositoryPostgres.getThreadById(addedThread.id)

      // Assert
      expect(getThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'A Thread',
        owner: 'user-123',
      }));

    })
  })

  describe('getThreadWithComment function', () => {
    it('should throw NotFoundError if incorrect id', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
      const idThread = 'thread-123'

      // Action and Assert
      await expect(threadRepositoryPostgres.getThreadWithComment(idThread)).rejects.toThrowError(NotFoundError)
    })

    it('should return correct thread', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)
      const idThread = 'thread-123'


      // Action
      UsersTableTestHelper.addUser({id: 'user-123', username: 'usernameSaya'})
      UsersTableTestHelper.addUser({id: 'user-234', username: 'tukangKomentar'})
      ThreadsTableTestHelper.addThread({id: idThread, title: 'A thread', body: 'The thread body', owner: 'user-123'})
      CommentTableTestHelper.addComment({id: 'comment-123', idThread, content: 'Sebuah komentar', owner: 'user-234'})
      
      const getThread = await threadRepositoryPostgres.getThreadWithComment(idThread)

      // Assert
      expect(getThread).toHaveProperty('id')
      expect(getThread).toHaveProperty('title')
      expect(getThread).toHaveProperty('body')
      expect(getThread).toHaveProperty('date')
      expect(getThread).toHaveProperty('username')
      expect(getThread).toHaveProperty('comments')
      expect(getThread.comments).toHaveLength(1)
    })
  })
});
