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

            var baseViews = { 
                sidebar: {
                    templateUrl: 'templates/sidebar/sidebar.html'
                }
            };

            // Application routes
            $stateProvider
            .state('index', {
                url: '/',
                views:{
                    sidebar: {
                        templateUrl: 'templates/sidebar/sidebar.html'
                    },
                    main: {
                        templateUrl: 'templates/dashboard/dashboard.html'
                    }
                }
            })
            .state('tables', {
                url: '/tables',
                views: {                
                    sidebar: {
                        templateUrl: 'templates/sidebar/sidebar.html'
                    },
                    main:{
                        templateUrl: 'templates/tables/tables.html'
                    }
                }
            });
        }
        ]);
 })();