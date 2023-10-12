'use strict'

const contents = ['N予備校', 'ドットインストール', 'POSSE課題'];
const languages = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'SQL', 'SHELL', '情報システム基礎知識（その他）'];

{
  // 今月の日時を取得
  const now = new Date();

  const post = document.getElementById('post');
  
  post.addEventListener('click', () => {
    // 投稿ボタンを非表示
    if (window.innerWidth <= 768) {
      post.style.display = 'none';
    }
    let twitterFlg = false;
    let modal = `<div class="modal-back-color" id="modalRemove">`
    + `<div class="modal" id="modal">`
    + `<div class="modal-close" id="modalClose"><div></div><p>×</p></div>`
    + `<div class="modal-input-content-and-button" id="modalInputContentAndButton">`
    + `<div class="modal-input-content" id="modalInputContent">`;

    modal += `<div class="modal-left">`
    + `<div class="modal-date">`
    + `<p class="modal-lists">学習日</p>`
    + `<input type="date" class="modal-date-input" id="learnDate" value="${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate()}"></input>`
    + `</div>`
    + `<div class="modal-contents">`
    + `<p class="modal-lists">学習コンテンツ（複数選択可）</p>`
    + `<ul class="modal-contents-lists">`;

    contents.forEach(element => {
      modal += `<li class="modal-contents-list"><span class="fa-solid fa-check modal-contents-list-icon"></span>${element}</li>`
    });

    modal += `</ul>`
    + `</div>`
    + `<div class="modal-languages">`
    + `<p  class="modal-lists">学習言語（複数選択可）</p>`
    + `<ul class="modal-languages-lists">`;

    languages.forEach(element => {
      modal += `<li class="modal-languages-list"><span class="fa-solid fa-check modal-languages-list-icon"></span>${element}</li>`
    });

    modal += `</ul>`
    + `</div>`
    + `</div>`

    modal += `<div class="modal-right">`
    + `<div class="modal-hour">`
    + `<p  class="modal-lists">学習時間</p>`
    + `<input type="text" class="modal-hour-text" id="studyHours"></input>`
    + `</div>`
    + `<div class="modal-twitter">`
    + `<p  class="modal-lists">Twitter用コメント</p>`
    + `<textarea id="twitterText" class="modal-twitter-text"></textarea>`
    + `<div class="modal-twitter-button"><span id="modalTwitterIcon" class="fa-solid fa-check modal-twitter-icon"></span>Twitterにシェアする</div>`
    + `</div>`
    + `</div>`

    modal += `</div>`
    + `<button class="modal-post" id="record">記録・投稿</button>`
    + `</div></div></div>`;

    const body = document.getElementById('body');
    body.insertAdjacentHTML('beforeBegin', modal);

    // モーダルを閉じる
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', () => {
      location.reload();
      const modalRemove = document.getElementById('modalRemove');
      modalRemove.remove();

      // 投稿ボタンを再表示
    if (window.innerWidth <= 768) {
      post.style.display = 'block';
    }
    })

    // 選択した際の挙動
    const modalContentsList = document.getElementsByClassName('modal-contents-list');
    const modalContentsLists = Array.from(modalContentsList);
    const modalLanguagesList = document.getElementsByClassName('modal-languages-list');
    const modalLanguagesLists = Array.from(modalLanguagesList);
    const modalContentsListIcon = document.getElementsByClassName('modal-contents-list-icon');
    const modalContentsListsIcon = Array.from(modalContentsListIcon);
    const modalLanguagesListIcon = document.getElementsByClassName('modal-languages-list-icon');
    const modalLanguagesListsIcon = Array.from(modalLanguagesListIcon);

    modalContentsLists.forEach((element, index) => {
      element.addEventListener('click', () => {
        element.classList.toggle('modal-contents-list-clicked');
        modalContentsListsIcon[index].classList.toggle('modal-contents-list-icon-clicked');
      })
    })
    modalLanguagesLists.forEach((element, index) => {
      element.addEventListener('click', () => {
        element.classList.toggle('modal-languages-list-clicked');
        modalLanguagesListsIcon[index].classList.toggle('modal-languages-list-icon-clicked');
      })
    })

    // Twitterをクリック
    const modalTwitterIcon = document.getElementById('modalTwitterIcon');
    const modalTwitterIconClass = document.getElementsByClassName('modal-twitter-icon');
    modalTwitterIcon.addEventListener('click', () => {
      modalTwitterIconClass[0].classList.toggle('modal-twitter-icon-clicked');
      if (twitterFlg === true) {
        twitterFlg = false;
      } else {
        twitterFlg = true;
      }
    })

    const record = document.getElementById('record');
    record.addEventListener('click', () => {
      // Twitterにチェックがついているとき、ページ移動
      let text = document.getElementById('twitterText').value;
      if (twitterFlg) {
        const twitter = "https://twitter.com/intent/tweet?text="+text;
        window.open(twitter,'_blank');
      }

      // データ取得
      const contentsCount = Array.from(document.getElementsByClassName('modal-contents-list-clicked')).length;
      for (let contentsNum = 0; contentsNum < contentsCount; contentsNum++) {
        contents[contentsNum] = Array.from(document.getElementsByClassName('modal-contents-list-clicked'))[contentsNum].textContent
      }
      const languagesCount = Array.from(document.getElementsByClassName('modal-languages-list-clicked')).length;

      const submitData = {
        date           : document.getElementById('learnDate').value,
        contentsCount  : contentsCount,
        contents       : contents,
        languagesCount : languagesCount,
        languages      : Array.from(document.getElementsByClassName('modal-languages-list-clicked'))[0].textContent,
        studyHours     : parseInt(document.getElementById('studyHours').value / contentsCount * 10) / 10,
      };

      const modalInputContent = document.getElementById('modalInputContent');
      const modalInputContentAndButton = document.getElementById('modalInputContentAndButton');
      const modalRoadHeight = modalInputContentAndButton.getBoundingClientRect().height;
      record.style.display = "none";
      modalInputContentAndButton.style.height = modalRoadHeight + 'px';
      modalInputContent.innerHTML = `<div class="modal-loading"></div>`;

      // 5秒ロード後に画面遷移
      function finishLoad() {
        modalInputContent.innerHTML = `<div class="modal-loading-finish">`
        + `<div class="modal-loading-finish-title">AWESOME!</div>`
        + `<div class="modal-loading-finish-check"></div>`
        + `<p>記録・投稿<br>完了しました</p>`
        + `</div>`;
      }

      // データの登録
      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData),
      })
      .then(response => response.json())
      .then(res => {
        setTimeout(finishLoad, 5000);
      })
      .catch(error => {
        // エラー表示
        console.log(error);
      })
    });
  })
}
