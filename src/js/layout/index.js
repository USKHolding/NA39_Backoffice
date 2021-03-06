import angular from 'angular';

// Create the module where our functionality can attach to
let layoutModule = angular.module('app.layout', []);


// Components
import AppHeader from './header.component';
layoutModule.component('appHeader', AppHeader);

import AppSidebar from './sidebar.component';
layoutModule.component('appSidebar', AppSidebar);

import AppDeteleModal from './delete_modal.component';
layoutModule.component('appDeleteModal', AppDeteleModal);


export default layoutModule;
