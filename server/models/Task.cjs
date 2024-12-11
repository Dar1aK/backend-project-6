const BaseModel = require('./BaseModel.cjs');
const { Model } = require('objection');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });
module.exports = class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        creatorId: { type: 'string' },
      },
      additionalProperties: true
    }
  }

  static get relationMappings() {
    const TaskStatus = require('./TaskStatus.cjs');
    const User = require('./User.cjs');
    const Label = require('./Label.cjs');
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
      },
      labels: {
        relation: Model.ManyToManyRelation,
        modelClass: Label,
        join: {
          from: 'tasks.label',
          to: 'labels.id'
        }
      }
    };
  }
}