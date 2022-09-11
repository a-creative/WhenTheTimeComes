<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


use App\Http\Controllers\AuthController;
use App\Http\Controllers\MemberUpdatePostItemController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagCategoryController;
use App\Http\Controllers\TagController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});

Route::middleware(['auth:web'])->group(function () {
    Route::resource('tags', TagController::class);
    Route::resource('tagCategories', TagCategoryController::class);

    Route::get('/memberUpdatePostItems/getPostContent', [MemberUpdatePostItemController::class, 'getPostContent']);
    Route::delete('/memberUpdatePostItems/confirmUpdateSent',  [MemberUpdatePostItemController::class, 'confirmUpdateSent']);
    Route::resource('memberUpdatePostItems', MemberUpdatePostItemController::class);

    Route::post('/posts/import', [PostController::class, 'import' ] );
});


