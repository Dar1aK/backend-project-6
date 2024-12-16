import i18next from 'i18next';
import rollbarError  from '../helpers/rollbar.js';


export default (app) => {
  app
    .get('/users', {
      name: 'users',
    }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      reply.render('users/index', {
        users,
      });
      return reply;
    })
    .get('/users/new', {
      name: 'newUser',
    }, (req, reply) => {
      const user = new app.objection.models.user();
      reply.render('users/new', {
        user,
      });
    })
    .post('/users', async (req, reply) => {
      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user.query().insert(validUser);
        req.flash('info', i18next.t('flash.users.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (error) {
        rollbarError('POST user error', error);
        req.flash('error', i18next.t('flash.users.create.error'));
        reply.render('users/new', {
          user, errors: error && error.data,
        });
      }

      return reply;
    })
    .get('/users/:id/edit', {
      name: 'editUser',
    }, async (req, reply) => {
      const {
        id,
      } = req.params;
      const currentUserId = req?.user?.getUserId(req.user);

      if (currentUserId == id) {
        const user = await app.objection.models.user.query().findById(id);
        reply.render('/users/edit', {
          user,
        });
      } else {
        req.flash('error', i18next.t('flash.users.delete.error'));
        reply.redirect(app.reverse('users'));
      }

      return reply;
    })
    .delete('/users/:id', async (req, reply) => {
      const {
        id,
      } = req.params;
      const currentUserId = req?.user?.getUserId(req.user);
      if (!currentUserId) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const isTasksConnectedWithUser = await app.objection.models.task
        .query()
        .where('executorId', `${currentUserId}`);
      if (currentUserId == id) {
        req.logOut();
        await app.objection.models.user.query().deleteById(id);
        req.flash('info', i18next.t('flash.users.delete.success'));
      } else if (isTasksConnectedWithUser && isTasksConnectedWithUser.length) {
        req.flash('error', i18next.t('flash.users.deleteConnected.error'));
      } else {
        req.flash('error', i18next.t('flash.users.delete.error'));
      }

      reply.redirect(app.reverse('users'));
    })
    .patch('/users/:id', async (req, reply) => {
      const {
        id,
      } = req.params;
      const currentUserId = req?.user?.getUserId(req.user);
      if (!currentUserId) {
        req.flash('error', i18next.t('flash.authError'));
        reply.redirect(app.reverse('root'));
        return reply;
      }

      const user = new app.objection.models.user();
      user.$set(req.body.data);

      try {
        const validUser = await app.objection.models.user.fromJson(req.body.data);
        await app.objection.models.user
          .query()
          .where('id', id)
          .first()
          .then((value) => {
            if (!value) {
              throw Error('User not found');
            }

            return value.$query().patch(validUser);
          });

        req.flash('info', i18next.t('flash.users.edit.success'));
        reply.redirect(app.reverse('users'));
      } catch (error) {
        rollbarError('PATCH user error', error);
        req.flash('error', i18next.t('flash.users.edit.error'));
        reply.render('/users/edit', {
          user, errors: error && error.data,
        });
      }

      return reply;
    });
};
