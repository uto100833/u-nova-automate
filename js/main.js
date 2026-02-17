//===============================================================
// メニュー制御用の関数とイベント設定（※バージョン2025-1）
//===============================================================
$(function(){
  //-------------------------------------------------
  // 変数の宣言
  //-------------------------------------------------
  const $menubar = $('#menubar');
  const $menubarHdr = $('#menubar_hdr');
  const breakPoint = 9999;	// ここがブレイクポイント指定箇所です

  // ▼ここを切り替えるだけで 2パターンを使い分け！
  //   false → “従来どおり”
  //   true  → “ハンバーガーが非表示の間は #menubar も非表示”
  const HIDE_MENUBAR_IF_HDR_HIDDEN = false;

  // タッチデバイスかどうかの判定
  const isTouchDevice = ('ontouchstart' in window) ||
                       (navigator.maxTouchPoints > 0) ||
                       (navigator.msMaxTouchPoints > 0);

  //-------------------------------------------------
  // debounce(処理の呼び出し頻度を抑制) 関数
  //-------------------------------------------------
  function debounce(fn, wait) {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }

  //-------------------------------------------------
  // ドロップダウン用の初期化関数
  //-------------------------------------------------
  function initDropdown($menu, isTouch) {
    // ドロップダウンメニューが存在するliにクラス追加
    $menu.find('ul li').each(function() {
      if ($(this).find('ul').length) {
        $(this).addClass('ddmenu_parent');
        $(this).children('a').addClass('ddmenu');
      }
    });

    // ドロップダウン開閉のイベント設定
    if (isTouch) {
      // タッチデバイスの場合 → タップで開閉
      $menu.find('.ddmenu').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const $dropdownMenu = $(this).siblings('ul');
        if ($dropdownMenu.is(':visible')) {
          $dropdownMenu.hide();
        } else {
          $menu.find('.ddmenu_parent ul').hide(); // 他を閉じる
          $dropdownMenu.show();
        }
      });
    } else {
      // PCの場合 → ホバーで開閉
      $menu.find('.ddmenu_parent').hover(
        function() {
          $(this).children('ul').show();
        },
        function() {
          $(this).children('ul').hide();
        }
      );
    }
  }

  //-------------------------------------------------
  // ハンバーガーメニューでの開閉制御関数
  //-------------------------------------------------
  function initHamburger($hamburger, $menu) {
    $hamburger.on('click', function() {
      $(this).toggleClass('ham');
      if ($(this).hasClass('ham')) {
        $menu.show();
        // ▼ ブレイクポイント未満でハンバーガーが開いたら body のスクロール禁止
        //    （メニューが画面いっぱいに fixed 表示されている時に背後をスクロールさせないため）
        if ($(window).width() < breakPoint) {
          $('body').addClass('noscroll');
        }
      } else {
        $menu.hide();
        // ▼ ハンバーガーを閉じたらスクロール禁止を解除
        if ($(window).width() < breakPoint) {
          $('body').removeClass('noscroll');
        }
      }
      // ドロップダウン部分も一旦閉じる
      $menu.find('.ddmenu_parent ul').hide();
    });
  }

  //-------------------------------------------------
  // レスポンシブ時の表示制御 (リサイズ時)
  //-------------------------------------------------
  const handleResize = debounce(function() {
    const windowWidth = $(window).width();

    // bodyクラスの制御 (small-screen / large-screen)
    if (windowWidth < breakPoint) {
      $('body').removeClass('large-screen').addClass('small-screen');
    } else {
      $('body').removeClass('small-screen').addClass('large-screen');
      // PC表示になったら、ハンバーガー解除 + メニューを開く
      $menubarHdr.removeClass('ham');
      $menubar.find('.ddmenu_parent ul').hide();

      // ▼ PC表示に切り替わったらスクロール禁止も解除しておく (保険的な意味合い)
      $('body').removeClass('noscroll'); // ★追加

      // ▼ #menubar を表示するか/しないかの切り替え
      if (HIDE_MENUBAR_IF_HDR_HIDDEN) {
        $menubarHdr.hide();
        $menubar.hide();
      } else {
        $menubarHdr.hide();
        $menubar.show();
      }
    }

    // スマホ(ブレイクポイント未満)のとき
    if (windowWidth < breakPoint) {
      $menubarHdr.show();
      if (!$menubarHdr.hasClass('ham')) {
        $menubar.hide();
        // ▼ ハンバーガーが閉じている状態ならスクロール禁止も解除
        $('body').removeClass('noscroll'); // ★追加
      }
    }
  }, 200);

  //-------------------------------------------------
  // 初期化
  //-------------------------------------------------
  // 1) ドロップダウン初期化 (#menubar)
  initDropdown($menubar, isTouchDevice);

  // 2) ハンバーガーメニュー初期化 (#menubar_hdr + #menubar)
  initHamburger($menubarHdr, $menubar);

  // 3) レスポンシブ表示の初期処理 & リサイズイベント
  handleResize();
  $(window).on('resize', handleResize);

  //-------------------------------------------------
  // アンカーリンク(#)のクリックイベント
  //-------------------------------------------------
  $menubar.find('a[href^="#"]').on('click', function() {
    // ドロップダウンメニューの親(a.ddmenu)のリンクはメニューを閉じない
    if ($(this).hasClass('ddmenu')) return;

    // スマホ表示＆ハンバーガーが開いている状態なら閉じる
    if ($menubarHdr.is(':visible') && $menubarHdr.hasClass('ham')) {
      $menubarHdr.removeClass('ham');
      $menubar.hide();
      $menubar.find('.ddmenu_parent ul').hide();
      // ハンバーガーが閉じたのでスクロール禁止を解除
      $('body').removeClass('noscroll'); // ★追加
    }
  });

  //-------------------------------------------------
  // 「header nav」など別メニューにドロップダウンだけ適用したい場合
  //-------------------------------------------------
  // 例：header nav へドロップダウンだけ適用（ハンバーガー連動なし）
  initDropdown($('header nav'), isTouchDevice);
});


//===============================================================
// スムーススクロール（※バージョン2024-1）※通常タイプ
//===============================================================
$(function() {
    // ページ上部へ戻るボタンのセレクター
    var topButton = $('.pagetop');
    // ページトップボタン表示用のクラス名
    var scrollShow = 'pagetop-show';

    // スムーススクロールを実行する関数
    // targetにはスクロール先の要素のセレクターまたは'#'（ページトップ）を指定
    function smoothScroll(target) {
        // スクロール先の位置を計算（ページトップの場合は0、それ以外は要素の位置）
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        // アニメーションでスムーススクロールを実行
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    // ページ内リンクとページトップへ戻るボタンにクリックイベントを設定
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); // デフォルトのアンカー動作をキャンセル
        var id = $(this).attr('href') || '#'; // クリックされた要素のhref属性を取得、なければ'#'
        smoothScroll(id); // スムーススクロールを実行
    });

    // スクロールに応じてページトップボタンの表示/非表示を切り替え
    $(topButton).hide(); // 初期状態ではボタンを隠す
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { // スクロール位置が300pxを超えたら
            $(topButton).fadeIn().addClass(scrollShow); // ボタンを表示
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); // それ以外では非表示
        }
    });

    // ページロード時にURLのハッシュが存在する場合の処理
    if(window.location.hash) {
        // 1. まずブラウザの自動ジャンプを阻止して、トップで待機させる
        // （これを入れないと、ブラウザによってはガクッと先に移動してしまうため）
        $('html, body').scrollTop(0);
        
        // 2. 0.7秒待ってから、改めてスムーススクロール実行
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 700);
    }
});


//===============================================================
// スライドショー
//===============================================================
$(function() {
  $('.mainimg').each(function() {
    var $root = $(this);
    var slides = $root.find('.slide');
    var slideCount = slides.length;
    var currentIndex = 0;

    var INTERVAL = 5000;     // 自動切替の間隔（ms）
    var FADE_MS   = 1000;    // CSSの transition: opacity 1s に合わせる
    var autoTimer = null;
    var isAnimating = false;

    // インジケータ作成
    var $indicators = $root.find('.slide-indicators').empty();
    for (var i = 0; i < slideCount; i++) {
      $indicators.append('<span class="indicator" data-index="' + i + '"></span>');
    }
    var $dots = $indicators.find('.indicator');

    // 初期表示
    slides.css('opacity', 0).removeClass('active');
    slides.eq(0).css('opacity', 1).addClass('active');
    $dots.removeClass('active').eq(0).addClass('active');

    function setActive(nextIndex) {
      if (nextIndex === currentIndex) return;
      isAnimating = true;

      slides.eq(currentIndex).css('opacity', 0).removeClass('active');
      slides.eq(nextIndex).css('opacity', 1).addClass('active');

      $dots.eq(currentIndex).removeClass('active');
      $dots.eq(nextIndex).addClass('active');

      currentIndex = nextIndex;

      // フェード中の連打対策（CSSの1秒に合わせて解除）
      setTimeout(function(){ isAnimating = false; }, FADE_MS);
    }

    function next() {
      var n = (currentIndex + 1) % slideCount;
      setActive(n);
      restartTimer(); // 次回の発火を今からINTERVAL後に張り直し
    }

    function restartTimer() {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(next, INTERVAL);
    }

    // クリックで移動 → タイマーをリセット
    $dots.on('click', function() {
      var to = $(this).data('index');
      if (isAnimating) return;          // フェード中は無視
      if (to === currentIndex) {        // 同じスライドならタイマーだけリセット
        return restartTimer();
      }
      setActive(to);
      restartTimer();                   // クリック時に経過時間をクリア
    });

    // 自動再生開始
    restartTimer();
  });
});


//===============================================================
// 画面幅1000px未満でclassの付け外し
//===============================================================
$(function () {
  const mq = window.matchMedia('(max-width: 1000px)');
  const apply = () => {
    $('.fix-col').toggleClass('window-s', mq.matches);
  };
  apply(); // 初期適用
  if (mq.addEventListener) {
    mq.addEventListener('change', apply);
  } else {
    mq.addListener(apply); // 古いブラウザ向け
  }
});


//===============================================================
// headerのフェード
//===============================================================
const header = document.getElementById('header');
let lastScrollY = 0; // 直前の位置をメモ

// --- 設定値（ここを変えると動きが変わります） ---
const startPos = 150;     // 何px以上スクロールしたら隠し始めるか
const tolerance = 10;     // 何px以上「戻した」時に表示させるか（遊びの量）
// --------------------------------------------

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // 1. ページ最上部付近なら必ず表示する
    if (currentScrollY < startPos) {
        header.classList.remove('is-hide');
    } 
    // 2. 下にスクロールしている時
    else if (currentScrollY > lastScrollY) {
        header.classList.add('is-hide');
    } 
    // 3. 上にスクロールしている時（遊びを持たせる）
    else if (lastScrollY - currentScrollY > tolerance) {
        header.classList.remove('is-hide');
    }

    // 現在の位置をメモして次に備える
    lastScrollY = currentScrollY;
});


//===============================================================
// コンテンツが終了するまで見出しをstickyで固定
//===============================================================
    $(window).on('scroll', function() {
      $('.box').each(function() {
        var $box = $(this);
        // text の下端がビューの上端を越えたらフェードアウト
        var textBottom = $box.find('.text')[0].getBoundingClientRect().bottom;
        if (textBottom <= 0) {
          $box.find('.title').addClass('fade');
        } else {
          $box.find('.title').removeClass('fade');
        }
      });
    });


//===============================================================
// 汎用開閉処理
//===============================================================
$(function() {
	$('.openclose').next().hide();
	$('.openclose').click(function() {
		// クリックした要素に active クラスをトグルする
		$(this).toggleClass('active');
		$(this).next().slideToggle();
		// クリックされた要素以外の active クラスを除去し、その dd を閉じる
		$('.openclose').not(this).removeClass('active').next().slideUp();
	});
});


//===============================================================
// 画像アップのパララックス
//===============================================================
(() => {
  "use strict";

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  /* =========================================================
    ▼ここだけ調整（全ブロック共通）
  ========================================================= */
  const maxMove     = 80;   // px：上下に動く最大量（大きいほど動く）
  const speed       = 1;    // 倍率：0.7で弱め、1.3で強め
  const dir         = 1;    // 1=通常 / -1=逆方向
  const extraHeight = 240;  // px：黒背景が見える時に増やす（目安：maxMove*2より大きく）
  /* ========================================================= */

  const boxes = Array.from(document.querySelectorAll(".scrollfx-box"));
  if (!boxes.length) return;

  const items = boxes.map(box => {
    const move = box.querySelector(".scrollfx-move");
    if (!move) return null;
    move.style.setProperty("--fx-extra", `${extraHeight}px`);
    return { box, move, top: 0, height: 0 };
  }).filter(Boolean);

  if (!items.length) return;

  const clamp01 = n => (n < 0 ? 0 : (n > 1 ? 1 : n));

  let vh = window.innerHeight || 0;
  let ticking = false;

  function measure(){
    vh = window.innerHeight || 0;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    items.forEach(item => {
      const r = item.box.getBoundingClientRect();
      item.top = r.top + scrollY;
      item.height = r.height || 0;
    });

    requestTick();
  }

  function update(){
    ticking = false;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const viewBottom = scrollY + vh;

    items.forEach(item => {
      const denom = (vh + item.height) || 1;
      const p = clamp01((viewBottom - item.top) / denom); // 0..1
      const t = (p - 0.5) * 2; // -1..+1
      const y = t * maxMove * speed * dir;

      item.move.style.transform = `translate3d(0, calc(-50% + ${y.toFixed(2)}px), 0)`;
    });
  }

  function requestTick(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestTick, { passive: true });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 100);
  });

  window.addEventListener("load", measure);
})();


//===============================================================
// お客様の声ブロックで使用しているサムネイルのスライド
//===============================================================
$(function() {
    var slideDuration = 1000; // アニメーション時間（ミリ秒）
    var autoSlideInterval = 5000; // 自動スライドの間隔（ミリ秒）

    var imagesPerView, slideBy;
    var slideInterval;
    var $slider = $('.slide-thumbnail');
    var $imgParts = $slider.find('.img');
    var $divs = $imgParts.children('div').not('.clone');
    var totalImages = $divs.length;
    var isAnimating = false;
    var currentImageIndex = 0;

    function initSlider() {
        // スライドショーをリセット
        currentImageIndex = 0;

        // 既存のタイマーをクリア
        clearInterval($slider.data('interval'));

        // 既存のクローン要素とインジケータを削除
        $imgParts.find('.clone').remove();
        $slider.find('.slide-indicators').empty();

        var windowWidth = $(window).width();

        if (windowWidth >= 801) {
            imagesPerView = 4;
            slideBy = 2;
        } else {
            imagesPerView = 2;
            slideBy = 1;
        }

        // 子要素をクローンして追加（無限ループのため）
        $divs.clone().addClass('clone').appendTo($imgParts);

        // インジケーターボタンを生成
        var $indicators = $slider.find('.slide-indicators');
        var totalSlides = Math.ceil(totalImages / slideBy);
        for (var i = 0; i < totalSlides; i++) {
            $indicators.append('<span class="indicator" data-index="' + (i * slideBy) + '"></span>');
        }
        var $indicatorItems = $indicators.find('.indicator');

        // インジケーターボタンの状態を更新
        function updateIndicators() {
            var activeIndex = Math.floor(currentImageIndex / slideBy) % totalSlides;
            $indicatorItems.removeClass('active');
            $indicatorItems.eq(activeIndex).addClass('active');
        }

        // スライドを特定のインデックスに移動する関数
        function slideTo(index) {
            if (isAnimating) return;
            isAnimating = true;
            currentImageIndex = index;

            // アニメーションを設定
            $imgParts.css({
                'transition': 'transform ' + (slideDuration / 1000) + 's ease',
                'transform': 'translateX(' + (-currentImageIndex * (100 / imagesPerView)) + '%)'
            });

            updateIndicators();

            setTimeout(function() {
                // ループ処理
                if (currentImageIndex >= totalImages) {
                    // transitionを無効にして一瞬で戻す
                    $imgParts.css('transition', 'none');
                    $imgParts.css('transform', 'translateX(0)');
                    currentImageIndex = 0;
                    updateIndicators();

                    // 再描画を強制
                    $imgParts[0].offsetHeight;

                    // transitionを再設定
                    $imgParts.css('transition', 'transform ' + (slideDuration / 1000) + 's ease');
                }
                isAnimating = false;
            }, slideDuration);
        }

        // 初期位置にスライド
        $imgParts.css({
            'transition': 'none',
            'transform': 'translateX(0)'
        });
        updateIndicators();

        // スライドを自動的に進める
        function startAutoSlide() {
            slideInterval = setInterval(function() {
                slideTo(currentImageIndex + slideBy);
            }, autoSlideInterval);
            $slider.data('interval', slideInterval);
        }

        function stopAutoSlide() {
            clearInterval($slider.data('interval'));
        }

        startAutoSlide();

        // マウスオーバーでスライドを停止（モバイルデバイスでは無効）
        $slider.off('mouseenter mouseleave').on('mouseenter', function() {
            stopAutoSlide();
        }).on('mouseleave', function() {
            startAutoSlide();
        });

        // インジケーターボタンをクリックしたときの処理
        $indicatorItems.off('click').on('click', function() {
            var index = $(this).data('index');
            slideTo(index);
            // 自動再生を再開
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // 初期化
    initSlider();

    // リサイズ時に再初期化（リセット）
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initSlider();
        }, 250);
    });
});
