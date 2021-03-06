/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;


import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';
import ElementUI from 'element-ui';

import commons from './mixins/commons';

Vue.use(ElementUI, {
    size: 'medium'
});

Vue.mixin(commons);



/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('sales-component', require('./components/SalesComponent.vue').default);
Vue.component('item-component', require('./components/Items/CreateItemComponent.vue').default);



// tools
Vue.component('file-upload', require('./components/Tools/UploadFile').default);
Vue.component('image-dialog', require('./components/Tools/ImageDialog').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    mixins: [commons],
    data() {
        return {
            primaryColor: "#021C73"
        }
    },
});
