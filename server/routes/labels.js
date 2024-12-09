import i18next from 'i18next';

export default (app) => {
  app
    .get('/labels', { name: 'labels' }, async (req, reply) => {
      const labels = await app.objection.models.label.query();
      reply.render('labels/index', { labels });
      return reply;
    })
    .get('/labels/new', { name: 'newLabel' }, (req, reply) => {
      const label = new app.objection.models.label();
      reply.render('labels/new', { label });
    })
    .post('/labels', async (req, reply) => {
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().insert(validLabel);
        req.flash('info', i18next.t('flash.labels.create.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.create.error'));
        reply.render('labels/new', { label, errors: data });
      }

      return reply;
    })
    .get('/labels/:id/edit', { name: 'editLabel' }, async (req, reply) => {
      const { id } = req.params;

      try {
        const label = await app.objection.models.label.query().findById(id);
        reply.render('/labels/edit', { label, id });
      } catch {
        req.flash('error', i18next.t('flash.label.delete.error'));
        reply.redirect(app.reverse('labels'));
      }

      return reply;
    })
    .delete('/labels/:id', async (req, reply) => {
      const { id } = req.params;

      try {
        await app.objection.models.label.query().deleteById(id);
        req.flash('info', i18next.t('flash.labels.delete.success'));
      } catch {
        req.flash('error', i18next.t('flash.labels.delete.error'));
      }

      reply.redirect(app.reverse('labels'));
    })
    .patch('/labels/:id', async (req, reply) => {
      const { id } = req.params;
      const label = new app.objection.models.label();
      label.$set(req.body.data);

      try {
        const validLabel = await app.objection.models.label.fromJson(req.body.data);
        await app.objection.models.label.query().where('id', id).first().then(value => {
          if(!value) {
              throw Error('Label not found')
          }

          return value.$query().patch(validLabel)
      })

        req.flash('labels', i18next.t('flash.labels.edit.success'));
        reply.redirect(app.reverse('labels'));
      } catch ({ data }) {
        req.flash('error', i18next.t('flash.labels.edit.error'));
        reply.render('/labels/edit', { label, errors: data, id })
      }

      return reply;
    });
};