<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudyTimeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [StudyTimeController::class, 'index'])->name('study_time.index');
Route::get('/get-barChart-data', [StudyTimeController::class, 'getBarChartData']);
Route::get('/get-languagesPieChart-data', [StudyTimeController::class, 'getLanguagesPieChartData']);
Route::get('/get-contentsPieChart-data', [StudyTimeController::class, 'getContentsPieChartData']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
