// const pool = require('../../database/postgres/pool');
// const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
// const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
// const container = require('../../container');
// const createServer = require('../createServer');

// describe('/threads/{id}/comments endpoint', () => {
//   afterAll(async () => {
//     await pool.end();
//   });

//   afterEach(async () => {
//     await ThreadsTableTestHelper.cleanTable();
//     await CommentsTableTestHelper.cleanTable();
//   });

//   describe('when POST /threads/{threadId}/comments', () => {
//     it('should response 201 and persisted comment', async () => {
//       // Arrange
//       const requestPayload = {
//         content: 'A Thread Comment',
//       };
//       // eslint-disable-next-line no-undef
//       const server = await createServer(container);

//       const threadId = 'thread-123'
//       ThreadsTableTestHelper.addThread({id: threadId, title: 'A thread', body: 'the body thread', owner: 'user-123'})

//       // Action
//       const response = await server.inject({
//         method: 'POST',
//         url: `/threads/${threadId}/comments`,
//         payload: requestPayload,
//         auth: {
//           credentials: {
//             id: 'user-123'
//           },
//           strategy: "jwt",
//           artifacts: {
//             id: 'user-123'
//           }
//         }
//       });

//       // console.log(response)

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(201);
//       expect(responseJson.status).toEqual('success');
//       expect(responseJson.data.addedComment).toBeDefined();
//     });

//     it('should response 400 when request payload not contain needed property', async () => {
//       // Arrange
//       const requestPayload = {
//         title: 'A Thread',
//         bodyThread: 'Thread body',
//       };
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: 'POST',
//         url: '/threads',
//         payload: requestPayload,
//         auth: {
//           credentials: {},
//           strategy: "jwt",
//           artifacts: {
//             id: 'user-123'
//           }
//         }
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(400);
//       expect(responseJson.status).toEqual('fail');
//       expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
//     });

//     it('should response 400 when request payload not meet data type specification', async () => {
//       // Arrange
//       const requestPayload = {
//         title: 'A Thread',
//         body: ['Thread Body'],
//       };
//       const server = await createServer(container);

//       // Action
//       const response = await server.inject({
//         method: 'POST',
//         url: '/threads',
//         payload: requestPayload,
//         auth: {
//           credentials: {},
//           strategy: "jwt",
//           artifacts: {
//             id: 'user-123'
//           }
//         }
//       });

//       // Assert
//       const responseJson = JSON.parse(response.payload);
//       expect(response.statusCode).toEqual(400);
//       expect(responseJson.status).toEqual('fail');
//       expect(responseJson.message).toEqual('tidak dapat membuat threads baru karena tipe data tidak sesuai');
//     });
//   });
// });
