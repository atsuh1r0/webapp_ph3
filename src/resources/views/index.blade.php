<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>webapp</title>
  <link rel="stylesheet" href="/css/reset.css"">
  <link rel=" stylesheet" href="/css/style.css">
</head>

<body id="body">
  <header class="header">
    <div class="header-left">
      <img src="/img/logo.svg" alt="logo">
      <p class="header-week-cnt" id="thisWeek"></p>
    </div>
    <button class="post" id="post">記録・投稿</button>
  </header>
  <main class="main">
    <div class="main-left">
      <section class="study-hours">
        <div class="today-wrapper">
          <div class="study-hours-title">Today</div>
          <div class="study-hours-hour" id="studyHoursToday">{{ $studyHoursToday }}</div>
          <div class="study-hours-unit">hour</div>
        </div>
        <div class="month-wrapper">
          <div class="study-hours-title">Month</div>
          <div class="study-hours-hour" id="studyHoursMonth">{{ $studyHoursMonth }}</div>
          <div class="study-hours-unit">hour</div>
        </div>
        <div class="total-wrapper">
          <div class="study-hours-title">Total</div>
          <div class="study-hours-hour" id="studyHoursTotal">{{ $studyHoursTotal }}</div>
          <div class="study-hours-unit">hour</div>
        </div>
      </section>
      <div class="section-border"></div>
      <section>
        <canvas id="studyHoursGraph">
          Canvas not supported...
        </canvas>
      </section>
    </div>
    <div class="main-right">
      <section class="languages-wrapper">
        <div class="languages-title">学習言語</div>
        <div class="languages-chart" id="languagesChartWrapper">
          <canvas id="languagesPieChart">
            Canvas not supported...
          </canvas>
        </div>
      </section>
      <section class="contents-wrapper">
        <div class="contents-title">学習コンテンツ</div>
        <div class="contents-chart" id="contentsChartWrapper">
          <canvas id="contentsPieChart">
            Canvas not supported...
          </canvas>
        </div>
      </section>
    </div>
  </main>
  <footer class="footer">
    <div class="one-month-before" id="oneMonthBefore">
      < </div>
        <div id="displayDate"></div>
        <div class="one-month-later" id="oneMonthLater">></div>
  </footer>
  <script src="/js/date.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js" integrity="sha512-ElRFoEQdI5Ht6kZvyzXhYG9NqjtkmlkfYk0wr6wHxU9JEHakS7UJZNeml5ALk+8IKlU6jDgMabC3vkumRokgJA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.1.0"></script>
  <script src="https://kit.fontawesome.com/afb3b2864c.js" crossorigin="anonymous"></script>
  <script src="/js/chart.js"></script>
  <script src="/js/modal.js"></script>
</body>

</html>
