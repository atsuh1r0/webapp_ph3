`use strict`

// 学習時間
{
  fetch('/get-barChart-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(studyHours => {
    studyHoursDate = [];
    studyHoursTime = [];
    studyHours.forEach((element) => {
      studyHoursDate.push(element.date)
      studyHoursTime.push(element.time);
    })

    const ctx = document.getElementById('studyHoursGraph');
    const context = ctx.getContext('2d');
    const grad = context.createLinearGradient( 0 , 200 , 0 , 0 ) ;
    grad.addColorStop(0.0 , '#0f71bc');
    grad.addColorStop(1.0 , "#3ccfff");
  
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: studyHoursDate,
          datasets: [{
              label: '# of Votes',
              data: studyHoursTime,
              backgroundColor: grad,
              borderWidth: 1
          }]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 2,
              callback: function(value){
                if(value % 2 != 0  && value != 0){
                  return value + 1;
                };
              }
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2,
              callback: function(value){
                return value+'h';
              }
            },
          }
        },
        plugins: false
      }
    });
  })
  .catch(error => {
    // エラー処理
    console.log(error);
  });
}

// // Register the plugin to all charts:
Chart.register(ChartDataLabels);

// 学習言語
{
  // const languages = [
  //   {name: 'HTML', hour: 30, color: '#0000CD'},
  //   {name: 'CSS', hour: 20, color: '#4169E1'},
  //   {name: 'JavaScript', hour: 10, color: '#4682B4'},
  //   {name: 'PHP', hour: 5, color: '#20B2AA'},
  //   {name: 'Laravel', hour: 5, color: '#9370DB'},
  //   {name: 'SQL', hour: 20, color: '#8A2BE2'},
  //   {name: 'SHELL', hour: 20, color: '#00008B'},
  //   {name: '情報システム基礎知識（その他）', hour: 10, color: '#4B0082'},
  // ];
  fetch('/get-languagesPieChart-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(languages => {

    const ctx = document.getElementById('languagesPieChart');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: [languages[0].name, languages[1].name, languages[2].name, languages[3].name, languages[4].name, languages[5].name, languages[6].name, languages[7].name],
          datasets: [{
            data: [languages[0].hour, languages[1].hour, languages[2].hour, languages[3].hour, languages[4].hour, languages[5].hour, languages[6].hour, languages[7].hour],
            backgroundColor: [
              languages[0].color,
              languages[1].color,
              languages[2].color,
              languages[3].color,
              languages[4].color,
              languages[5].color,
              languages[6].color,
              languages[7].color,
            ],
            parsing: {
              yAxisKey: 'net'
            }
          }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            labels: {
              title: {
                color: "white",
              },
            },
            formatter: function (value, context) {
              return value + "%";
            },
          },
        }
      }
    });

    const languagesChartWrapper = document.getElementById('languagesChartWrapper');
    let languagesList = `<div class="contents-list">`
    + `<div><span style="color:${languages[0].color}">●</span>${languages[0].name}</div>`
    + `<div><span style="color:${languages[1].color}">●</span>${languages[1].name}</div>`
    + `<div><span style="color:${languages[2].color}">●</span>${languages[2].name}</div>`
    + `<div><span style="color:${languages[3].color}">●</span>${languages[3].name}</div>`
    + `<div><span style="color:${languages[4].color}">●</span>${languages[4].name}</div>`
    + `<div><span style="color:${languages[5].color}">●</span>${languages[5].name}</div>`
    + `<div><span style="color:${languages[6].color}">●</span>${languages[6].name}</div>`
    + `<div><span style="color:${languages[7].color}">●</span>${languages[7].name}</div>`
    + `</div>`;
    languagesChartWrapper.insertAdjacentHTML("beforeend", languagesList);
  })
  .catch(error => {
    // エラー処理
    console.log(error);
  });
}

// 学習コンテンツ
{
  // const contents = [
  //   {name: 'N予備校', hour: 40, color: '#0000CD'},
  //   {name: 'ドットインストール', hour: 60, color: '#1E90FF'},
  //   {name: 'POSSE課題', hour : 40, color: '#00BFFF'},
  // ];
  fetch('/get-contentsPieChart-data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(contents => {

    const ctx = document.getElementById('contentsPieChart');
    
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [contents[0].name, contents[1].name, contents[2].name],
        datasets: [{
          data: [contents[0].hour, contents[1].hour, contents[2].hour],
          backgroundColor: [
            contents[0].color,
            contents[1].color,
            contents[2].color,
          ],
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            labels: {
              title: {
                color: "white",
              },
            },
            formatter: function (value, context) {
              return value + "%";
            },
          },
        }
      }
    });
    
    const contentsChartWrapper = document.getElementById('contentsChartWrapper');
    let contentsList = `<div class="contents-list">`
    + `<div><span style="color:${contents[0].color}">●</span>${contents[0].name}</div>`
    + `<div><span style="color:${contents[1].color}">●</span>${contents[1].name}</div>`
    + `<div><span style="color:${contents[2].color}">●</span>${contents[2].name}</div>`
    + `</div>`;
    contentsChartWrapper.insertAdjacentHTML("beforeend", contentsList);
  })
    .catch(error => {
    // エラー処理
    console.log(error);
  });
}
