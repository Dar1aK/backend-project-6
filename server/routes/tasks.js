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

      const tasks = await app.objection.models.task.query();
      const statuses = await app.objection.models.taskStatus.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/index', { tasks, statuses, users });
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
        reply.render('/tasks/edit', { task, id });
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
    // .delete('/statuses/:id', async (req, reply) => {
    //   if (!req.isAuthenticated()) {
    //     return checkAuth(req, reply)
    //   }

    //   const { id } = req.params;
    //   try {
    //     await app.objection.models.taskStatus.query().deleteById(id);
    //     req.flash('info', i18next.t('flash.statuses.delete.success'));
    //   } catch {
    //     req.flash('error', i18next.t('flash.statuses.delete.error'));
    //   }
    //   reply.redirect(app.reverse('statuses'));
    // })
    // .patch('/statuses/:id', async (req, reply) => {
    //   if (!req.isAuthenticated()) {
    //     return checkAuth(req, reply)
    //   }

    //   const { id } = req.params;
    //   const status = new app.objection.models.taskStatus();
    //   status.$set(req.body.data);

    //   try {
    //     const validStatus = await app.objection.models.taskStatus.fromJson(req.body.data);
    //     await app.objection.models.taskStatus.query().where('id', id).first().then(value => {
    //       if(!value) {
    //           throw Error('Status not found')
    //       }

    //       return value.$query().patch(validStatus)
    //   })

    //     req.flash('info', i18next.t('flash.statuses.edit.success'));
    //     reply.redirect(app.reverse('statuses'));
    //   } catch ({ data }) {
    //     req.flash('error', i18next.t('flash.statuses.edit.error'));
    //     reply.render('/statuses/edit', { status, errors: data })
    //   }

    //   return reply;
    // });
};