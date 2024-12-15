import i18next from 'i18next';
import { rollbarError } from '../helpers/rollbar.js'


export default (app) => {
  const checkAuth = (req, reply) => {
    req.flash('error', i18next.t('flash.authError'));
    reply.redirect(app.reverse('root'));
    return reply
  }
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const statuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', { statuses });
      return reply;
    })
    .get('/statuses/new', { name: 'newStatus' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const status = new app.objection.models.taskStatus();
      reply.render('statuses/new', { status });
      return reply;
    })
    .post('/statuses', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const status = new app.objection.models.taskStatus();
      status.$set(req.body.data);
      try {
        const validStatus = await app.objection.models.taskStatus.fromJson(req.body.data);
        await app.objection.models.taskStatus.query().insert(validStatus);
        req.flash('info', i18next.t('flash.statuses.create.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        rollbarError('POST statuses error', error);
        req.flash('error', i18next.t('flash.statuses.create.error'));
        reply.render('statuses/new', { status, errors: error && error.data });
      }

      return reply;
    })
    .get('/statuses/:id/edit', { name: 'editStatus' }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      try {
        const status = await app.objection.models.taskStatus.query().findById(id);
        reply.render('/statuses/edit', { status, id });
      } catch (error) {
        rollbarError('GET status edit error', error);
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(app.reverse('statuses'));
      }
      return reply;
    })
    .delete('/statuses/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      const isTasksConnectedWithStatus = await app.objection.models.task.query().where('statusId', id)

      if (isTasksConnectedWithStatus) {
        req.flash('error', i18next.t('flash.statuses.delete.error'));
        reply.redirect(app.reverse('statuses'));
        return reply;
      }

      try {
        await app.objection.models.taskStatus.query().deleteById(id);
        req.flash('info', i18next.t('flash.statuses.delete.success'));
      } catch (error) {
        rollbarError('DELETE status error', error);
        req.flash('error', i18next.t('flash.statuses.delete.error'));
      }
      reply.redirect(app.reverse('statuses'));
    })
    .patch('/statuses/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply)
      }

      const { id } = req.params;
      const status = new app.objection.models.taskStatus();
      status.$set(req.body.data);

      try {
        const validStatus = await app.objection.models.taskStatus.fromJson(req.body.data);
        await app.objection.models.taskStatus.query().where('id', id).first().then(value => {
          if(!value) {
              throw Error('Status not found')
          }

          return value.$query().patch(validStatus)
      })

        req.flash('info', i18next.t('flash.statuses.edit.success'));
        reply.redirect(app.reverse('statuses'));
      } catch (error) {
        rollbarError('PATCH status error', error);
        req.flash('error', i18next.t('flash.statuses.edit.error'));
        reply.render('/statuses/edit', { status, errors: error && error.data })
      }

      return reply;
    });
};