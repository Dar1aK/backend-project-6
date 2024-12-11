export const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email');
      table.string('password_digest');
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
      table.string('label');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
};

export const down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('task_statuses'),
    knex.schema.dropTable('tasks')
  ])
};