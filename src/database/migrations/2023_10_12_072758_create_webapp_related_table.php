<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color');
            $table->timestamps();
        });

        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color');
            $table->timestamps();
        });

        Schema::create('study_times', function (Blueprint $table) {
            $table->id();
            $table->integer('time');

            $table->foreignId('language_id')->constrained('languages');
            $table->foreignId('content_id')->constrained('contents');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('study_times');
        Schema::dropIfExists('contents');
        Schema::dropIfExists('languages');
    }
};
