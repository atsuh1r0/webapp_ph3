'use strict'

{
  // 今月の日時を取得
  const now = new Date();
  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();
  let displayYear = thisYear;
  let displayMonth = thisMonth;

  // 今日が何週目かを表示
  const week = Math.floor((now.getDate() - now.getDay() + 12 ) / 7);
  const displayWeek = document.getElementById('thisWeek');
  displayWeek.innerHTML = week + 'th week'; 

  // 今の年月を表示
  const displayDate = document.getElementById('displayDate');
  displayDate.innerHTML = displayYear + '年' + displayMonth + '月'; 

  // 前月に
  const before = document.getElementById('oneMonthBefore');
  before.addEventListener('click', () => {
    displayMonth--;
    if (displayMonth == 0) {
      displayYear--;
      displayMonth = 12;
    }
    displayDate.innerHTML = displayYear + '年' + displayMonth + '月'; 
  })

  // 次月に
  const later = document.getElementById('oneMonthLater');
  later.addEventListener('click', () => {
    displayMonth++;
    if (displayMonth == 13) {
      displayYear++;
      displayMonth = 1;
    }
    displayDate.innerHTML = displayYear + '年' + displayMonth + '月'; 
  })
}
