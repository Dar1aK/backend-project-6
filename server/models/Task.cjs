const BaseModel = require('./BaseModel.cjs');
const { Model } = require('objection');
const objectionUnique = require('objection-unique');
// import TaskStatus from './TaskStatus.cjs';
// import User from './User.cjs';

const unique = objectionUnique({ fields: ['name'] });
module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'executorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        // statusId: { type: 'string' },
        creatorId: { type: 'string' },
        // executorId: { type: 'string' },
      },
      additionalProperties: true
    }
  }

  static get relationMappings() {
    const TaskStatus = require('./TaskStatus.cjs');
    const User = require('./User.cjs');
    return {
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaskStatus,
        join: {
          from: 'tasks.statusId',
          to: 'task_statuses.id'
        }
      },
      executor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.executorId',
          to: 'users.id'
        }
      }
    };
  }
}