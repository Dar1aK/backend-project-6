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
        // statusId: { type: 'string' },
        creatorId: { type: 'string' },
        executorId: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return {
      movies: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'TaskStatus',
        join: {
          from: 'tasks.statusId',
          to: 'task_statuses.id'
        }
      }
    };
  }
}