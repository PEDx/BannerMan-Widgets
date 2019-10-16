/* eslint-disable react/react-in-jsx-scope */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import bmSearchWidget from '../app.vue';
storiesOf('BannerMan Widgets', module).add('to Storybook', () => ({
  components: { bmSearchWidget },
  template: '<bm-search-widget />',
  methods: { action: linkTo('Button') },
}));
