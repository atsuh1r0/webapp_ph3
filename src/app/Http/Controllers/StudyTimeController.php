<?php

namespace App\Http\Controllers;

use App\Models\Contents;
use App\Models\Languages;
use App\Models\StudyTime;
use Illuminate\Http\Request;

class StudyTimeController extends Controller
{
    /**
     * 学習時間の一覧画面を表示する
     */
    public function index()
    {
        // 今月の学習時間を取得する
        // 今月の1日の0時0分0秒
        $startOfMonth = now()->startOfMonth();
        // 今月の最終日の23時59分59秒
        $endOfMonth = now()->endOfMonth();
        $studyHoursMonth = StudyTime::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->sum('time');
        // 今日の学習時間を取得する
        // 今日の0時0分0秒
        $startOfDay = now()->startOfDay();
        // 今日の23時59分59秒
        $endOfDay = now()->endOfDay();
        $studyHoursToday = StudyTime::whereBetween('created_at', [$startOfDay, $endOfDay])
            ->sum('time');
        // 累計の学習時間を取得する
        $studyHoursTotal = StudyTime::sum('time');

        return view('index', [
            'studyHoursMonth' => $studyHoursMonth,
            'studyHoursToday' => $studyHoursToday,
            'studyHoursTotal' => $studyHoursTotal,
        ]);
    }

    /**
     * 棒グラフ用のデータを取得・整形して返す
     */
    public function getBarChartData()
    {
        // 今月の1日の0時0分0秒
        $startOfMonth = now()->startOfMonth();
        // 今月の最終日の23時59分59秒
        $endOfMonth = now()->endOfMonth();
        $studyTimes = StudyTime::whereBetween('created_at', [$startOfMonth, $endOfMonth])
            ->selectRaw('DATE_FORMAT(created_at, "%d") AS date')
            ->selectRaw('SUM(time) AS timeOfDay')
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();
        $data = collect();
        for ($day = 1; $day <= $endOfMonth->day; $day++) {
            $studyTime = $studyTimes->firstWhere('date', $day);
            if ($studyTime) {
                $data->push([
                    'date' => $day,
                    'time' => (int)$studyTime->timeOfDay,
                ]);
            } else {
                $data->push([
                    'date' => $day,
                    'time' => 0,
                ]);
            }
        }
        return response()->json($data);
    }

    /**
     * 言語の円グラフ用のデータを取得・整形して返す
     */
    public function getLanguagesPieChartData()
    {
        $languages = Languages::all();
        $data = collect();
        foreach ($languages as $language) {
            // ここで時間を計算する
            // 今月の1日の0時0分0秒
            $startOfMonth = now()->startOfMonth();
            // 今月の最終日の23時59分59秒
            $endOfMonth = now()->endOfMonth();
            $amount = StudyTime::whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->where('language_id', $language->id)
                ->sum('time');
            $data->push([
                'name' => $language->name,
                'hour' => $amount,
                'color' => $language->color,
            ]);
        }
        return response()->json($data);
    }

    /**
     * コンテンツの円グラフ用のデータを取得・整形して返す
     */
    public function getContentsPieChartData()
    {
        $contents = Contents::all();
        $data = collect();
        foreach ($contents as $content) {
            // ここで時間を計算する
            // 今月の1日の0時0分0秒
            $startOfMonth = now()->startOfMonth();
            // 今月の最終日の23時59分59秒
            $endOfMonth = now()->endOfMonth();
            $amount = StudyTime::whereBetween('created_at', [$startOfMonth, $endOfMonth])
                ->where('content_id', $content->id)
                ->sum('time');
            $data->push([
                'name' => $content->name,
                'hour' => $amount,
                'color' => $content->color,
            ]);
        }
        return response()->json($data);
    }
}
