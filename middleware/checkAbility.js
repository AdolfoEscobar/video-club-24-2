const defineAbilityFor = require('../abilities/abilities');

function checkAbility(action, subject) {
  return (req, res, next) => {
    const { user } = req;
    if (!user) return res.status(401).json({ message: 'No autorizado' });

    const ability = defineAbilityFor(user);

    if (ability.can(action, subject)) {
      next();
    } else {
      res.status(403).json({ message: 'Acceso prohibido' });
    }
  };
}

module.exports = checkAbility;