<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {

    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->group('/api', function (Group $group) {
        $group->group('/history', function (Group $group) {
            $group->get('', 'App\Controllers\HistoryController:list');
            $group->post('/create', 'App\Controllers\HistoryController:create');
        });

        $group->group('/country', function (Group $group) {
            $group->get('', 'App\Controllers\CountryController:list');
            // $group->post('/create', 'App\Controllers\CountryController:create');
        });

        $group->group('/city', function (Group $group) {
            $group->get('', 'App\Controllers\CityController:list');
            // $group->post('/create', 'App\Controllers\CityController:create');
        });
    });
};
