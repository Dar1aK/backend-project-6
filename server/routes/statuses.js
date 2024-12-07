import i18next from 'i18next';

export default (app) => {
  app
    .get('/statuses', { name: 'statuses' }, async (req, reply) => {

        console.log("app.objection.models***", await app.objection.models.taskStatus.query() )
    //   const statuses = await app.objection.models.taskStatus.query();
      reply.render('statuses/index', ); //{ statuses }
      return reply;
    })
};