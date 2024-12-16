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
      },
      tasks: {
        create: {
          error: 'Не удалось создать задачу',
          success: 'Задача успешно создана',
        },
        edit: {
          error: 'Не удалось изменить задачу',
          success: 'Задача успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить задачу',
          success: 'Задача успешно удалена',
        },
      },
      labels: {
        create: {
          error: 'Не удалось создать метку',
          success: 'Метка успешно создана',
        },
        edit: {
          error: 'Не удалось изменить метку',
          success: 'Метка успешно изменена',
        },
        delete: {
          error: 'Не удалось удалить метку',
          success: 'Метка успешно удалена',
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
        form: {
          email: 'Email',
          password: 'Пароль'
        }
      },
      users: {
        id: 'ID',
        fullName: 'Полное имя',
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
        form: {
          firstName: 'Имя',
          lastName: 'Фамилия',
          email: 'Email',
          password: 'Пароль'
        }
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
          submit: 'Создать',
        },
        editTitle: 'Изменение статуса',
        submit: 'Сохранить',
        edit: 'Изменить',
        delete: 'Удалить',
        form: {
          name: 'Наименование',
        },
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
        label: 'Метки',
        create: 'Создать задачу',
        new: {
          create: 'Создать',
          submit: 'Сохранить',
          title: 'Создание задачи',
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
        form: {
          name: 'Наименование',
          description: 'Описание',
          statusId: 'Статус',
          email: 'Email',
          labels: 'Метки',
          executorId: 'Исполнитель',
        },
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
        editTitle: 'Изменение метки',
        submit: 'Сохранить',
        edit: 'Изменить',
        delete: 'Удалить',
        form: {
          name: 'Наименование',
        },
      }
    },
  },
};