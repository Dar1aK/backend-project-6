import fastify from 'fastify';

import init from '../server/plugin.js';
import {
  getTestData, prepareData,
} from './helpers/index.js';

describe('test labels CRUD', () => {
  let app;
  let knex;
  let models;
  const testData = getTestData();

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: {
        target: 'pino-pretty',
      },
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

  it('index', async () => {
    const responseLabels = await app.inject({
      method: 'GET',
      url: app.reverse('labels'),
    });
    expect(responseLabels.statusCode).toBe(200);
  });

  it('new', async () => {
    const responseNewLabel = await app.inject({
      method: 'GET',
      url: app.reverse('newLabel'),
    });

    expect(responseNewLabel.statusCode).toBe(200);
  });

  it('create', async () => {
    const params = testData.labels.new;
    const response = await app.inject({
      method: 'POST',
      url: app.reverse('labels'),
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const label = await models.label.query().findOne({
      name: params.name,
    });
    expect(label).toMatchObject(expected);
  });

  it('edit', async () => {
    const params = testData.labels.existing;
    const response = await app.inject({
      method: 'PATCH',
      url: '/labels/1',
      payload: {
        data: params,
      },
    });

    expect(response.statusCode).toBe(302);

    const expected = params;
    const label = await models.label.query().findOne({
      name: params.name,
    });
    expect(label).toMatchObject(expected);
  });

  it('delete', async () => {
    const params = testData.labels.existing;
    const response = await app.inject({
      method: 'DELETE',
      url: '/labels/1',
      payload: {
        data: params,
      },
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
