/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.addColumns('comments', {
        created_at: {
            type: 'timestamp',
            default: pgm.func('NOW()')
        },
        is_deleted: {
            type: 'boolean',
            default: false
        }
    })    
};

exports.down = (pgm) => {
    pgm.dropColumns('comments', ['created_at', 'is_deleted']);
};
  