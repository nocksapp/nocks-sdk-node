const context = require('../context');

return context.user.delete({ uuid: 'ac25ce10-83f7-456a-9a3c-582ca07cf699', twoFactorCode: '123456' });
