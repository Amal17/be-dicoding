const CommentRepository = require('../CommentRepository')

describe('CommentRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const commentRepository = new CommentRepository()

        // Action and Assert
        await expect(commentRepository.addComment('idUser', 'idThread', {})).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(commentRepository.getCommentById('idComment')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(commentRepository.deleteCommentById('idComment')).rejects.toThrowError('COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})