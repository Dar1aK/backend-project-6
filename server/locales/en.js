export default {
  translation: {
    appName: 'Task manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'User changed successfully',
        },
        delete: {
          error: 'You can\'t edit or delete another user',
          deleteConnected: 'Can\'t edit or delete user',
          success: 'User deleted successfully',
        },
      },
      statuses: {
        create: {
          error: 'Failed to create',
          success: 'Status created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Status changed successfully',
        },
        delete: {
          error: 'Fail to delete',
          success: 'Status deleted successfully',
        },
      },
      tasks: {
        create: {
          error: 'Failed to create',
          success: 'Task created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Task changed successfully',
        },
        delete: {
          error: 'Fail to delete',
          success: 'Task deleted successfully',
        },
      },
      labels: {
        create: {
          error: 'Failed to create',
          success: 'Label created successfully',
        },
        edit: {
          error: 'Failed to edit',
          success: 'Label changed successfully',
        },
        delete: {
          error: 'Fail to delete',
          success: 'Label deleted successfully',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        tasks: 'Tasks',
        labels: 'Labels',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
        form: {
          email: 'Email',
          password: 'Password',
        },
      },
      users: {
        id: 'ID',
        fullName: 'Fullname',
        email: 'Email',
        createdAt: 'Created at',
        actions: 'Actions',
        new: {
          submit: 'Register',
          signUp: 'Register',
        },
        edit: 'Edit',
        delete: 'Delete',
        title: 'Users',
        form: {
          firstName: 'Firstname',
          lastName: 'Lastname',
          email: 'Email',
          password: 'Password',
        },
      },
      edit: {
        submit: 'Edit',
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        create: 'Create status',
        actions: 'Actions',
        title: 'Statuses',
        new: {
          title: 'Creating status',
          submit: 'Create',
        },
        edit: {
          title: 'Edit status',
        },
        submit: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        form: {
          name: 'Name',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        create: 'Create task',
        actions: 'Actions',
        title: 'Tasks',
        status: 'Status',
        creatorId: 'Author',
        executorId: 'Executor',
        label: 'Labels',
        new: {
          title: 'Creating task',
          submit: 'Submit',
          create: 'Create',
        },
        edit: {
          title: 'Edit task',
        },
        buttons: {
          submit: 'Show',
          edit: 'Edit',
          delete: 'Delete',
        },
        myOnly: 'Only my tasks',
        form: {
          name: 'Name',
          description: 'Description',
          statusId: 'Status',
          email: 'Email',
          labels: 'Labels',
          executorId: 'Executor',
        },
      },
      labels: {
        id: 'ID',
        name: 'Name',
        createdAt: 'Created at',
        create: 'Create label',
        actions: 'Actions',
        labels: 'Labels',
        title: 'Labels',
        new: {
          title: 'Creating label',
          submit: 'Create',
        },
        submit: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        form: {
          name: 'Name',
        },
      },
    },
  },
};
