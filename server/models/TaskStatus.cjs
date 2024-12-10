const BaseModel = require('./BaseModel.cjs');
const objectionUnique = require('objection-unique');

const unique = objectionUnique({ fields: ['name'] });
module.exports = class TaskStatus extends unique(BaseModel) {
  static get tableName() {
    return 'task_statuses';
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

  // static get relationMappings() {
  //   return {
  //     movies: {
  //       relation: BaseModel.OneToManyRelation,
  //       modelClass: 'Task',
  //       join: {
  //         from: 'status.id',
  //         to: 'task.statusId'
  //       }
  //     }
  //   }
  // }
}