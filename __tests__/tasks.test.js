import _ from 'lodash';
import fastify from 'fastify';

import init from '../server/plugin.js';
import { getTestData, prepareData } from './helpers/index.js';

describe('test statuses CRUD', () => {
  let app;
  let knex;
  let models;
  let cookie;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;

    // TODO: пока один раз перед тестами
    // тесты не должны зависеть друг от друга
    // перед каждым тестом выполняем миграции
    // и заполняем БД тестовыми данными
    await knex.migrate.latest();
    await prepareData(app);
  });

  beforeEach(async () => {
      const response = await app.inject({
        method: 'GET',
        url: app.reverse('newSession'),
      });

      expect(response.statusCode).toBe(200);

      const responseSignIn = await app.inject({
        method: 'POST',
        url: app.reverse('session'),
        payload: {
          data: testData.users.existing,
        },
      });

      expect(responseSignIn.statusCode).toBe(302);
      //auth
      const [sessionCookie] = responseSignIn.cookies;
      const { name, value } = sessionCookie;
      cookie = { [name]: value };
  });


  it('index', async () => {
    const responseTasks = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
      cookies: cookie,
    });
    expect(responseTasks.statusCode).toBe(200);
  });

  it('index without auth', async () => {
    const responseTasks = await app.inject({
      method: 'GET',
      url: app.reverse('tasks'),
    });
    expect(responseTasks.statusCode).toBe(302);
  });

  it('new', async () => {
    const responseNewStatus = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
      cookies: cookie,
    });

    expect(responseNewStatus.statusCode).toBe(200);
  });

  it('new without auth', async () => {
    const responseNewStatus = await app.inject({
      method: 'GET',
      url: app.reverse('newTask'),
    });

    expect(responseNewStatus.statusCode).toBe(302);
  });

  it('create', async () => {
    const params = testData.tasks.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('tasks'),
      payload: {
        data: params,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const task = await models.task.query().findOne({ name: params.name });
    expect(task).toMatchObject(expected);
  });

  it('edit', async () => {
    const params = testData.tasks.existing;
    const response = await app.inject({
      method: 'PATCH',
      url: '/tasks/1',
      payload: {
        data: params,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const task = await models.task.query().findOne({ name: params.name });
    expect(task).toMatchObject(expected);
  });

  it('delete', async () => {
    const params = testData.users.existing;
    const response = await app.inject({
      method: 'DELETE',
      url: '/tasks/1',
      payload: {
        data: params,
      },
      cookies: cookie,

    });

    expect(response.statusCode).toBe(302);
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});
