/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
const { override, useBabelRc } = require('customize-cra');
const path = require('path');

module.exports = override(useBabelRc());
