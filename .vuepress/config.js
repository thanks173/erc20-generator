const vars = require('./.env.json');

module.exports = {
  description: 'Create an ERC20 Token in less than a minute with the most used Smart Contract Generator for ERC20 Token. No login. No setup. No coding required.',
  base: '/',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['script', { src: '/assets/js/web3.min.js' }],
  ],
  defaultNetwork: vars.defaultNetwork,
  infuraProjectId: vars.infuraProjectId,
};
