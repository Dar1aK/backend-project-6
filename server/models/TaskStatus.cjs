const BaseModel = require('./BaseModel.cjs');

module.exports = class TaskStatus extends BaseModel {
  static get tableName() {
    return 'taskStatuses';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
      },
    };
  }
}