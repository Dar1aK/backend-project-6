export default {
    translation: {
      appName: 'Fastify Шаблон',
      flash: {
        session: {
          create: {
            success: 'Вы залогинены',
            error: 'Неправильный емейл или пароль',
          },
          delete: {
            success: 'Вы разлогинены',
          },
        },
        users: {
          create: {
            error: 'Не удалось зарегистрировать',
            success: 'Пользователь успешно зарегистрирован',
          },
          edit: {
            error: 'Не удалось изменить пользователя',
            success: 'Пользователь успешно изменён',
          },
          delete: {
            error: 'Вы не можете редактировать или удалять другого пользователя',
            success: 'Пользователь успешно удалён',
          }
        },
        authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      },
      layouts: {
        application: {
          users: 'Пользователи',
          signIn: 'Вход',
          signUp: 'Регистрация',
          signOut: 'Выход',
          statuses: 'Статусы',
        },
      },
      views: {
        session: {
          new: {
            signIn: 'Вход',
            submit: 'Войти',
          },
        },
        users: {
          id: 'ID',
          email: 'Email',
          createdAt: 'Дата создания',
          actions: 'Действия',
          new: {
            submit: 'Сохранить',
            signUp: 'Регистрация',
          },
          edit: 'Изменить',
          delete: 'Удалить'
        },
        edit: {
          submit: 'Изменить'
        },
        welcome: {
          index: {
            hello: 'Привет от Хекслета!',
            description: 'Практические курсы по программированию',
            more: 'Узнать Больше',
          },
        },
        statuses: {
          id: 'ID',
          name: 'Имя',
          createdAt: 'Дата создания',
        }
      },
    },
  };