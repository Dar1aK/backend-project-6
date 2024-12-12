export default {
    translation: {
      appName: 'Менеджер задач',
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
            deleteConnected: 'Не удалось удалить пользователя',
            success: 'Пользователь успешно удалён',
          }
        },
        statuses: {
          create: {
            error: 'Не удалось создать статус',
            success: 'Статус успешно создан',
          },
          edit: {
            error: 'Не удалось изменить статус',
            success: 'Статус успешно изменён',
          },
          delete: {
            error: 'Не удалось удалить статус',
            success: 'Статус успешно удалён',
          },
          tasks: {
            create: {
              error: 'Не удалось создать задачу',
              success: 'Задача успешно создана',
            },
            edit: {
              error: 'Не удалось изменить задачу',
              success: 'Задача успешно изменёна',
            },
            delete: {
              error: 'Не удалось удалить задачу',
              success: 'Задача успешно удалёна',
          },
          labels: {
            create: {
              error: 'Не удалось создать метку',
              success: 'Метка успешно создана',
            },
            edit: {
              error: 'Не удалось изменить метку',
              success: 'Метка успешно изменёна',
            },
            delete: {
              error: 'Не удалось удалить метку',
              success: 'Метка успешно удалёна',
            }
          },
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
          tasks: 'Задачи',
          labels: 'Метки',
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
          delete: 'Удалить',
          title: 'Пользователи',
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
          create: "Создать статус",
          actions: 'Действия',
          title: 'Статусы',
          new: {
            title: 'Создание статуса',
            submit: 'Создать'
          },
          edit: {
            title: 'Изменение статуса',
          },
          submit: 'Сохранить',
          edit: 'Изменить',
          delete: 'Удалить',
        },
        tasks: {
          id: 'ID',
          name: 'Имя',
          createdAt: 'Дата создания',
          actions: 'Действия',
          title: 'Задачи',
          status: 'Статус',
          creatorId: 'Автор',
          executorId: 'Исполнитель',
          labels: 'Метки',
          new: {
            submit: 'Сохранить',
            signUp: 'Регистрация',
          },
          edit: {
            title: 'Изменение задачи',
          },
          buttons: {
            submit: 'Показать',
            edit: 'Изменить',
            delete: 'Удалить',
          },
          myOnly: 'Только мои задачи',
        },
        labels: {
          id: 'ID',
          name: 'Имя',
          createdAt: 'Дата создания',
          create: "Создать метку",
          actions: 'Действия',
          labels: 'Метки',
          title: 'Метки',
          new: {
            title: 'Создание метки',
            submit: 'Создать'
          },
          submit: 'Сохранить',
          edit: 'Изменить',
          delete: 'Удалить',
        }
      },
    },
  },
}
