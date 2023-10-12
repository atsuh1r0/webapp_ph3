<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WebAppRelatedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // languageテーブルの初期データ
        $languages = [
            ['name' => 'HTML', 'color' => '#0000CD'],
            ['name' => 'CSS', 'color' => '#4169E1'],
            ['name' => 'JavaScript', 'color' => '#4682B4'],
            ['name' => 'PHP', 'color' => '#20B2AA'],
            ['name' => 'Laravel', 'color' => '#9370DB'],
            ['name' => 'SQL', 'color' => '#8A2BE2'],
            ['name' => 'SHELL', 'color' => '#00008B'],
            ['name' => '情報システム基礎知識（その他）', 'color' => '#4B0082'],
        ];

        foreach ($languages as $language) {
            DB::table('languages')->insert([
                'name' => $language['name'],
                'color' => $language['color'],
            ]);
        }

        // contentテーブルの初期データ
        $contents = [
            ['name' => 'N予備校', 'color' => '#0000CD'],
            ['name' => 'ドットインストール', 'color' => '#1E90FF'],
            ['name' => 'POSSE課題', 'color' => '#00BFFF'],
        ];

        foreach ($contents as $content) {
            DB::table('contents')->insert([
                'name' => $content['name'],
                'color' => $content['color'],
            ]);
        }

        // study_timeテーブルの初期データをfactoryで作成
        \App\Models\StudyTime::factory(30)->create();
    }
}
