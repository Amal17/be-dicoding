/* eslint-disable camelcase */
exports.up = (pgm) => {
    pgm.createTable('threads', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      title: {
        type: 'VARCHAR(255)',
        notNull: true,
      },
      body: {
        type: 'TEXT',
        notNull: true,
      },
      owner: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'users(id)',
      },
    });

    pgm.addConstraint(
      'threads', 
      'fk_threads.owner_users.id', 
      'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.createIndex('threads', 'owner');
  };
  
  exports.down = (pgm) => {
    pgm.dropConstraint('threads', 'fk_threads.owner_users.id');
    pgm.dropTable('threads');
  };
  