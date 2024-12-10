import welcome from './welcome.js';
import users from './users.js';
import session from './session.js';
import taskStatuses from './statuses.js';
import tasks from './tasks.js';

const controllers = [
  welcome,
  users,
  session,
  taskStatuses,
  tasks,
];

export default (app) => controllers.forEach((f) => f(app));