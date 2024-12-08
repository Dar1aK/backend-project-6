export default {
    translation: {
      appName: 'Fastify Boilerplate',
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
            success: 'User deleted successfully',
          }
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
          }
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
        },
      },
      views: {
        session: {
          new: {
            signIn: 'Login',
            submit: 'Login',
          },
        },
        users: {
          id: 'ID',
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
        },
        edit: {
          submit: 'Edit'
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
          create: "Create status",
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
        },
      },
    },
  };