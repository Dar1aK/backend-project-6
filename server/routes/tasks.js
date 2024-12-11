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

      let tasks =  app.objection.models.task.query()

      if (filters.status) {
        tasks.where('statusId', filters.status)
      }

      if (filters.executor) {
        tasks.where('executorId', filters.executor)
      }

      if (filters.label) {
        tasks.where('label', filters.label)
      }

      if (filters.isCreatorUser === 'on') {
        const currentUserId = req?.user?.getUserId(req.user)
        tasks.where('creatorId', currentUserId)

      }

      tasks = await tasks;
      const statuses = await app.objection.models.taskStatus.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/index', { tasks, statuses, users, filters });
      return reply;
    })
    .get('/tasks/new', { name: 'newTask' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const task = new app.objection.models.task();
      const statuses = await app.objection.models.taskStatus.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/new', { task, statuses, users });
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
        await app.objection.models.task.query().insert(validTask);
        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.tasks.create.error'));
        reply.render('tasks/new', { task, errors: data });
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
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', { task, id, statuses, users });
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
        const task = await app.objection.models.task.query().findById(id);
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

      const { id } = req.params;
      try {
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
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', { task, id, statuses, users, errors: data })
      }

      return reply;
    });
};