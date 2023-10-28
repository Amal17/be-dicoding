/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.addColumns('threads', {
        created_at: {
            type: 'timestamp',
            default: pgm.func('NOW()')
        }
    })    
};

exports.down = (pgm) => {
    pgm.dropColumns('threads', ['created_at']);
};
  