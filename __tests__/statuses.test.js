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
    const responseStatuses = await app.inject({
      method: 'GET',
      url: app.reverse('statuses'),
      cookies: cookie,
    });
    expect(responseStatuses.statusCode).toBe(200);
  });

  it('new', async () => {
    const responseNewStatus = await app.inject({
      method: 'GET',
      url: app.reverse('newStatus'),
      cookies: cookie,
    });

    expect(responseNewStatus.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.task_statuses.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('statuses'),
      payload: {
        data: params,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const status = await models.taskStatus
      .query()
      .findOne({ name: params.name });
    expect(status).toMatchObject(expected);
  });

  it('edit', async () => {
    const params = testData.task_statuses.existing;
    const response = await app.inject({
      method: 'PATCH',
      url: '/statuses/1',
      payload: {
        data: params,
      },
      cookies: cookie,
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const status = await models.taskStatus
      .query()
      .findOne({ name: params.name });
    expect(status).toMatchObject(expected);
  });

  it('delete', async () => {
    const params = testData.task_statuses.existing;
    const response = await app.inject({
      method: 'DELETE',
      url: '/statuses/1',
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
