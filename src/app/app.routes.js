(function(){
    'use strict';

    /**
     * Route configuration for the RDash module.
     */
     angular.module('upFrota')
     .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/');

            // Application routes
            $stateProvider
                .state('root',{
                    url: '',
                    abstract: true,
                    views: {
                        sidebar: {
                            templateUrl: 'templates/sidebar/sidebar.html'
                        },
                        header: {
                            templateUrl: 'templates/header/header.html'
                        },
                        'main@' : {
                            templateUrl: ''
                        }
                    }
                })
                .state('index', {
                    url: '/',
                    parent: 'root',
                    views:{
                        main: {
                            templateUrl: 'templates/dashboard/dashboard.html'
                        }
                    }
                })
                .state('tables', {
                    url: '/tables',
                    parent: 'root',
                    views: {                
                        main:{
                            templateUrl: 'templates/tables/tables.html'
                        }
                    }
                });
        }
        ]);
 })();