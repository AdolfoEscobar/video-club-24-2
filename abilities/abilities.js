const { AbilityBuilder, Ability } = require('@casl/ability');

function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (user.role === 'admin') {
    can('manage', 'all');
  }

  if (user.role === 'editor') {
    can('read', ['Movie', 'Actor', 'Director', 'Genre', 'Role']);
    can('create', ['Movie', 'Actor', 'Director', 'Genre']);
    can('update', ['Movie', 'Actor', 'Director', 'Genre']);
    cannot('delete', 'all');
    cannot('manage', 'Role');
  }

  if (user.role === 'viewer') {
    can('read', ['Movie', 'Actor', 'Director', 'Genre']);
    cannot(['create', 'update', 'delete'], 'all');
    cannot('manage', 'Role');
  }

  return build();
}

module.exports = defineAbilityFor;
