import i18next from 'i18next';
import rollbarError from '../helpers/rollbar.js';

export default (app) => {
  const checkAuth = (req, reply) => {
    req.flash('error', i18next.t('flash.authError'));
    reply.redirect(app.reverse('root'));
    return reply;
  };
  app
    .get('/tasks', {
      name: 'tasks',
    }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const filters = (() => {
        const pairs = req.url.split('?')[1]?.split('&');
        return (pairs || []).reduce((acc, pair) => {
          const [name, value] = pair.split('=');
          return {
            ...acc, [name]: value,
          };
        }, {
        });
      })();

      try {
        const currentUserId = req?.user?.getUserId(req.user);

        const modifierFunc = (query) => {
          query.where({
            ...(filters.status ? { statusId: filters.status } : {}),
            ...(filters.executor ? { executorId: filters.executor } : {}),
            ...(filters.labels ? { labelsId: filters.labels } : {}),
            ...(filters.isCreatorUser === 'on' ? { creatorId: currentUserId } : {}),
          });
        };

        const tasks = await app.objection.models.task
          .query()
          .withGraphJoined('[status, creator, executor, labels]')
          .modify(modifierFunc);

        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('tasks/index', {
          tasks,
          statuses,
          users,
          labels,
          filters,
        });
      } catch (error) {
        rollbarError('GET tasks error', error);
        const users = await app.objection.models.user.query();
        reply.render('tasks/index', {
          users,
          filters: {
          },
          labels: [],
          statuses: [],
          tasks: [],
        });
      }
      return reply;
    })
    .get('/tasks/new', {
      name: 'newTask',
    }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const task = new app.objection.models.task();
      const statuses = await app.objection.models.taskStatus.query();
      const labels = await app.objection.models.label.query();
      const users = await app.objection.models.user.query();
      reply.render('tasks/new', {
        task, statuses, users, labels,
      });
      return reply;
    })
    .post('/tasks', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const task = new app.objection.models.task();
      task.$set(req.body.data);
      try {
        const validTask = await app.objection.models.task.fromJson(req.body.data);
        const labels = await app.objection.models.label
          .query()
          .skipUndefined()
          .findByIds(validTask.labels);

        await app.objection.models.task.transaction(async (trx) => {
          const insertedTask = await app.objection.models.task
            .query(trx)
            .insertGraph(
              {
                ...validTask, labels: validTask.labels ? labels : [],
              },
              {
                relate: ['labels'],
              },
            );
          return insertedTask;
        });

        req.flash('info', i18next.t('flash.tasks.create.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        rollbarError('POST tasks error', error);
        req.flash('error', i18next.t('flash.tasks.create.error'));
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('tasks/new', {
          task,
          errors: error && error.data,
          statuses,
          labels,
          users,
        });
      }

      return reply;
    })
    .get('/tasks/:id/edit', {
      name: 'editTasks',
    }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const {
        id,
      } = req.params;
      try {
        const task = await app.objection.models.task
          .query()
          .findById(id)
          .withGraphJoined('[status, creator, executor, labels]');
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', {
          task, id, statuses, users, labels,
        });
      } catch (error) {
        rollbarError('GET task edit error', error);
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }
      return reply;
    })
    .get('/tasks/:id', {
      name: 'showTask',
    }, async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const {
        id,
      } = req.params;
      try {
        const task = await app.objection.models.task
          .query()
          .findById(id)
          .withGraphJoined('[status, creator, executor, labels]');
        reply.render('/tasks/card', {
          task, id,
        });
      } catch (error) {
        rollbarError('GET task card error', error);
        req.flash('error', i18next.t('flash.tasks.delete.error'));
        reply.redirect(app.reverse('tasks'));
      }
      return reply;
    })
    .delete('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const currentUserId = req?.user?.getUserId(req.user);
      const {
        id,
      } = req.params;

      try {
        const task = await app.objection.models.task.query().findById(id);

        if (task.creatorId !== currentUserId.toString()) {
          req.flash('error', i18next.t('flash.tasks.delete.error'));
          reply.redirect(app.reverse('tasks'));
          return reply;
        }

        await app.objection.models.task.query().deleteById(id);
        req.flash('info', i18next.t('flash.tasks.delete.success'));
      } catch (error) {
        rollbarError('DELETE task error', error);
        req.flash('error', i18next.t('flash.tasks.delete.error'));
      }
      reply.redirect(app.reverse('tasks'));
      return reply;
    })
    .patch('/tasks/:id', async (req, reply) => {
      if (!req.isAuthenticated()) {
        return checkAuth(req, reply);
      }

      const {
        id,
      } = req.params;
      const task = new app.objection.models.task();
      task.$set(req.body.data);

      try {
        const validTask = await app.objection.models.task.fromJson(req.body.data);
        const labels = await app.objection.models.label
          .query()
          .skipUndefined()
          .findByIds(validTask.labels);

        await app.objection.models.task.transaction(async (trx) => {
          const insertedTask = await app.objection.models.task
            .query(trx)
            .upsertGraph(
              {
                ...validTask,
                id: Number(id),
                labels: validTask.labels ? labels : [],
              },
              {
                relate: ['labels'],
              },
            );
          return insertedTask;
        });

        await app.objection.models.task
          .query()
          .where('id', id)
          .first()
          .then((value) => {
            if (!value) {
              throw Error('Status not found');
            }

            return value.$query().patch(validTask);
          });

        req.flash('info', i18next.t('flash.tasks.edit.success'));
        reply.redirect(app.reverse('tasks'));
      } catch (error) {
        rollbarError('PATCH task error', error);
        req.flash('error', i18next.t('flash.tasks.edit.error'));
        const statuses = await app.objection.models.taskStatus.query();
        const labels = await app.objection.models.label.query();
        const users = await app.objection.models.user.query();
        reply.render('/tasks/edit', {
          task,
          id,
          statuses,
          users,
          labels,
          errors: error && error.data,
        });
      }

      return reply;
    });
};
