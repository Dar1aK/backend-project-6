import i18next from 'i18next';

export default (app) => {
  const checkAuth = (req, reply) => {
    req.flash('error', i18next.t('flash.authError'));
    reply.redirect(app.reverse('root'));
    return reply
  }
  app
    .get('/tasks', { name: 'tasks' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const filters = (() => {
        const pairs = req.url?.split('?')[1]?.split('&')
        return (pairs || []).reduce((acc, pair) => {
          const [name, value] = pair.split('=')
          return {...acc, [name]: value}
        }, {})
      })()

      let tasks =  app.objection.models.task.query().withGraphJoined('[status, creator, executor, label]')

      if (filters.status) {
        tasks.where('statusId', filters.status)
      }

      if (filters.executor) {
        tasks.skipUndefined().where('executorId', filters.executor)
      }

      if (filters.labels) {
        tasks.skipUndefined().where('labels', filters.labels)
      }

      if (filters.isCreatorUser === 'on') {
        const currentUserId = req?.user?.getUserId(req.user)
        tasks.where('creatorId', currentUserId)

      }

      tasks = await tasks;
      console.log('GET final task', tasks)

      const statuses = await app.objection.models.taskStatus.query();
      const labels = await app.objection.models.label.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/index', { tasks, statuses, users, labels, filters });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const task = new app.objection.models.task();
      const statuses = await app.objection.models.taskStatus.query();
      const labels = await app.objection.models.label.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/new', { task, statuses, users, labels });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const task = new app.objection.models.task();
      task.$set(req.body.data);
      try {
        const validTask = await app.objection.models.task.fromJson(req.body.data);
        const labels = await app.objection.models.label.query().findByIds(validTask.labels)

        const insertedTask = await app.objection.models.task.transaction(async (trx) => {
          console.log('validTaskvalidTask', validTask, labels)
          const insertedTask = await app.objection.models.task.query(trx)
            .insertGraph({...validTask, labels}, { relate: ['labels'] });
          return insertedTask;
        });

        console.log('POST insertedTask', insertedTask)
        // await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ( data ) {
        console.log("ERROR", data)
        req.flash('error', i18next.t('flash.tasks.create.error'));
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('tasks/new', { task, errors: undefined, statuses, labels, users });
      }

      return reply;
    })
    .get('/tasks/:id/edit', { name: 'editTasks' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      try {
        const task = await app.objection.models.task.query().findById(id);
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', { task, id, statuses, users, labels });
      } catch {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }
      return reply;
    })
    .get('/tasks/:id', { name: 'showTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      try {
        const task = await app.objection.models.task.query().findById(id).withGraphJoined('[status, creator, executor, label]');
        console.log('task card', task, task.labels)
        reply.render('/tasks/card', { task, id });
      } catch {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }
      return reply;
    })
    .delete('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const currentUserId = req?.user?.getUserId(req.user)
      const { id } = req.params;

      try {
      const task = await app.objection.models.task.query().findById(id);
      if (task.creatorId != currentUserId) {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
        return reply;
      }

        await app.objection.models.task.query().deleteById(id);
        req.flash('info', i18next.t('flash.tasks.delete.success'));
      } catch {
        req.flash('error', i18next.t('flash.tasks.delete.error'));
      }
      reply.redirect(app.reverse('tasks'));
    })
    .patch('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      const task = new app.objection.models.task();
      task.$set(req.body.data);

      try {
        const validTask = await app.objection.models.task.fromJson(req.body.data);
        await app.objection.models.task.query().where('id', id).first().then(value => {
          if(!value) {
              throw Error('Status not found')
          }

          return value.$query().patch(validTask)
      })

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', { task, id, statuses, users, labels, errors: data })
      }

      return reply;
    });
};