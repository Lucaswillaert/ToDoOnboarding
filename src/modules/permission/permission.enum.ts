export enum Permission {
  ALL_PERMISSIONS = 'all_permissions',

  USER_READ = 'user.read',
  USER_CREATE = 'user.create',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',

  ROLE_READ = 'role.read',
  ROLE_CREATE = 'role.create',
  ROLE_UPDATE = 'role.update',
  ROLE_DELETE = 'role.delete',

  CONTACT_CREATE = 'contact.create',
  CONTACT_READ = 'contact.read',
  CONTACT_UPDATE = 'contact.update',
  CONTACT_DELETE = 'contact.delete',

  TODO_CREATE = 'todo.create',
  TODO_READ = 'todo.read',
  TODO_DELETE = 'todo.delete',
  TODO_UPDATE = 'todo.update',

  TYPESENSE = 'typesense'
}
