import { configure } from '@storybook/vue';

const req = require.context('../packages/', true, /stories\/.+.js$/);
const loadStories = () => {
  req.keys().forEach(module => req(module));
};

configure(loadStories, module);
