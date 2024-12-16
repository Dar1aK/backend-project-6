export const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('password_digest');
      table.string('first_name');
      table.string('last_name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('task_statuses', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.string('status_id');
      table.string('creator_id');
      table.string('executor_id');
      // table.array('label_id');
      // table.specificType('labels', 'integer ARRAY');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('labels', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('tasks_labels', table => {
      table.increments('id').primary();
      table.integer('tasks_id').references('tasks.id');
      table.integer('labels_id').references('labels.id');
    })
  ])
};

export const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('task_statuses'),
    knex.schema.dropTable('tasks'),
    knex.schema.dropTable('labels'),
    knex.schema.dropTable('tasks_labels')
  ])
};