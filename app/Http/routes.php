<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

// API routes.

Route::get('/runners', 'RunnersController@runners');

Route::put('/runners/{chip_code}', 'RunnersController@update');

Route::get('/dashboard', 'RunnersController@dashboard');
