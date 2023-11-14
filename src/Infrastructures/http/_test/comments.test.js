const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads/{id}/comments endpoint', () => {
  afterAll(async () => {
    // await pool.end();
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();   
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable(); 
  });

  describe('when POST /threads/{threadId}/comments ', () => {
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const threadId = 'thread-123'

      const requestPayload = {
        title: 'Comment',
      };
      const server = await createServer(container);


      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        auth: {
          credentials: {
            id: 'user-123'
          },
          strategy: "jwt",
          artifacts: {
            id: 'user-123'
          }
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const threadId = 'thread-123'

      const requestPayload = {
        content: ['Content Comment'],
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        auth: {
          credentials: {
            id: 'user-123'
          },
          strategy: "jwt",
          artifacts: {
            id: 'user-123'
          }
        }
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat komentar baru karena tipe data tidak sesuai');
    });

    it('should response 404 when invalid thread id', async () => {
        // Arrange
        const threadId = 'thread-123'
  
        const requestPayload = {
          content: 'Content Comment',
        };
        const server = await createServer(container);
  
        // Action
        const response = await server.inject({
          method: 'POST',
          url: `/threads/${threadId}/comments`,
          payload: requestPayload,
          auth: {
            credentials: {
              id: 'user-123'
            },
            strategy: "jwt",
            artifacts: {
              id: 'user-123'
            }
          }
        });
  
        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(404);
        expect(responseJson.status).toEqual('fail');
        expect(responseJson.message).toEqual('thread tidak ditemukan di database');
    });

    it('should response 201 and persisted comment', async () => {
        // Arrange
        const threadId = 'thread-123'
        await UsersTableTestHelper.addUser({id: 'user-123', username: 'newUser', password: 'pass', fullname: 'Full Name'})
        await ThreadsTableTestHelper.addThread({id: threadId, title: 'A thread', body: 'the body thread', owner: 'user-123'})

        const requestPayload = {
          content: 'A Thread Comment',
        };
        // eslint-disable-next-line no-undef
        const server = await createServer(container);
  
  
        // Action
        const response = await server.inject({
          method: 'POST',
          url: `/threads/${threadId}/comments`,
          payload: requestPayload,
          auth: {
            credentials: {
              id: 'user-123'
            },
            strategy: "jwt",
            artifacts: {
              id: 'user-123'
            }
          }
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseJson.status).toEqual('success');
        expect(responseJson.data.addedComment).toBeDefined();
    });
  });
});

describe('/threads/{threadId}/comments/{commentId} endpoint', () => {
    afterAll(async () => {
      await pool.end();
    });
  
    afterEach(async () => {
      await CommentsTableTestHelper.cleanTable();
      await ThreadsTableTestHelper.cleanTable();
      await UsersTableTestHelper.cleanTable(); 
    });
  
    describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
        it('should response 404 when invalid thread id', async () => {
          // Arrange
          const threadId = 'thread-123'
          const commentId = 'comment-123'

          const server = await createServer(container);
    
          // Action
          const response = await server.inject({
            method: 'DELETE',
            url: `/threads/${threadId}/comments/${commentId}`,
            auth: {
              credentials: {
                id: 'user-123'
              },
              strategy: "jwt",
              artifacts: {
                id: 'user-123'
              }
            }
          });
    
          // Assert
          const responseJson = JSON.parse(response.payload);
          expect(response.statusCode).toEqual(404);
          expect(responseJson.status).toEqual('fail');
          expect(responseJson.message).toEqual('thread tidak ditemukan di database');
        });

        it('should response 404 when invalid comment id', async () => {
          // Arrange
          const userId = 'user-123'
          const threadId = 'thread-123'
          const commentId = 'comment-123'

          await UsersTableTestHelper.addUser({id: userId})
          await ThreadsTableTestHelper.addThread({id: threadId, title: 'A thread', body: 'the body thread', owner: userId})

          const server = await createServer(container);
    
          // Action
          const response = await server.inject({
            method: 'DELETE',
            url: `/threads/${threadId}/comments/${commentId}`,
            auth: {
              credentials: {
                id: 'user-123'
              },
              strategy: "jwt",
              artifacts: {
                id: 'user-123'
              }
            }
          });
    
          // Assert
          const responseJson = JSON.parse(response.payload);
          expect(response.statusCode).toEqual(404);
          expect(responseJson.status).toEqual('fail');
          expect(responseJson.message).toEqual('comment tidak ditemukan di database');
        });

        it('should response 403 if not owner', async () => {
            // Arrange
            const threadId = 'thread-123'
            const commentId = 'comment-123'
            const userId = 'user-123'

            await UsersTableTestHelper.addUser({
                id: userId,
                username: 'newUser',
                password: 'pass',
                fullname: 'Full Name'
            })
            await ThreadsTableTestHelper.addThread({
                id: threadId, 
                title: 'A thread', 
                body: 'the body thread', 
                owner: userId
            })
            await CommentsTableTestHelper.addComment({
                id: commentId,
                idThread: threadId,
                content: 'Sebuah Komentar',
                owner: userId
            })

            const server = await createServer(container);
        
            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                auth: {
                credentials: {
                    id: 'user-234'
                },
                strategy: "jwt",
                artifacts: {
                    id: 'user-234'
                }
                }
            });

            // Assert
            const responseJson = JSON.parse(response.payload);
    
            expect(response.statusCode).toEqual(403);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('Tidak memiliki hak untuk ini');
        });

        it('should response 200 if success delete comment', async () => {
            // Arrange
            const threadId = 'thread-123'
            const commentId = 'comment-123'
            const userId = 'user-123'

            // Add User
            await UsersTableTestHelper.addUser({
                id: userId, 
            })

            // Add Thread
            await ThreadsTableTestHelper.addThread({
                id: threadId, 
                title: 'A thread', 
                body: 'the body thread', 
                owner: 'user-123'
            })

            // Add Comment
            await CommentsTableTestHelper.addComment({
                id: commentId,
                idThread: threadId,
                content: 'Sebuah Komentar',
                owner: userId
            })

            const server = await createServer(container);
        
            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/threads/${threadId}/comments/${commentId}`,
                auth: {
                credentials: {
                    id: 'user-123'
                },
                strategy: "jwt",
                artifacts: {
                    id: 'user-123'
                }
                }
            });

            // Assert
            const responseJson = JSON.parse(response.payload);

    
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
        });
    });
});