/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('comments', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      idThread: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'threads(id)',
        onDelete: 'CASCADE',
      },
      content: {
        type: 'TEXT',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'users(id)',
        onDelete: 'CASCADE',
      },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('comments');
};
  