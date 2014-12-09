/* global angular */
'use strict'; // jshint ignore:line


angular.module('lumx.search-filter', [])
    .directive('lxSearchFilter', ['$timeout', function($timeout)
    {
        return {
            restrict: 'E',
            templateUrl: 'lumx.search_filter.html',
            scope: {
                model: '=?'
            },
            link: function(scope, element, attrs)
            {
                var $input = element.find('.search-filter__input'),
                    $label = element.find('.search-filter__label'),
                    $cancel = element.find('.search-filter__cancel'),
                    $searchFilter = element.find('.search-filter'),
                    $searchFilterContainer = element.find('.search-filter__container');

                if (angular.isDefined(attrs.closed))
                {
                    $searchFilter.addClass('search-filter--is-closed');
                }

                // Width
                attrs.$observe('filterWidth', function(filterWidth)
                {
                    $searchFilterContainer.css({ width: filterWidth });
                });

                // Theme
                attrs.$observe('theme', function(theme)
                {
                    $searchFilter.removeClass('search-filter--light-theme search-filter--dark-theme');

                    if (theme === 'light')
                    {
                        $searchFilter.addClass('search-filter--light-theme');
                    }
                    else
                    {
                        $searchFilter.addClass('search-filter--dark-theme');
                    }
                });

                if (angular.isUndefined(attrs.theme))
                {
                    $searchFilter.addClass('search-filter--dark-theme');
                }

                // Events
                $input
                    .on('input', function()
                    {
                        if ($input.val())
                        {
                            $searchFilter.addClass('search-filter--is-focused');
                        }
                        else
                        {
                            $searchFilter.removeClass('search-filter--is-focused');
                        }
                    })
                    .on('blur', function()
                    {
                        if (angular.isDefined(attrs.closed) && !$input.val())
                        {
                            $searchFilter.velocity({ 
                                width: 40
                            }, {
                                duration: 400,
                                easing: 'easeOutQuint',
                                queue: false
                            });
                        }
                    });

                $label.on('click', function()
                {
                    if (angular.isDefined(attrs.closed))
                    {
                        $searchFilter.velocity({ 
                            width: attrs.filterWidth ? attrs.filterWidth: 240
                        }, {
                            duration: 400,
                            easing: 'easeOutQuint',
                            queue: false
                        });

                        $timeout(function()
                        {
                            $input.focus();
                        }, 401);
                    }
                    else
                    {
                        $input.focus();
                    }
                });

                $cancel.on('click', function()
                {
                    $input.val('').focus();

                    $searchFilter.removeClass('search-filter--is-focused');
                });

                // Init the field
                $timeout(function()
                {
                    if ($input.val())
                    {
                        element.addClass('search-filter--is-active');
                    }
                });
            }
        };
    }]);
