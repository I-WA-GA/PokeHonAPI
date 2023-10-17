// static/js/script.js

const textInput = document.getElementById("text");
// 翻訳テキストを読み上げるJavaScript
document.getElementById("play-translated-text").addEventListener("click", function () {
  var translatedText = "{{ translated_text }}"; // 翻訳されたテキストを取得
  var synth = window.speechSynthesis;
  var utterance = new SpeechSynthesisUtterance(translatedText);
  synth.speak(utterance);
});


// その他のポケモン情報を表示
// 画像の初期位置
let x = window.innerWidth / 2 - 50; // 画像の幅の半分を引く
let y = window.innerHeight / 2 - 50; // 画像の高さの半分を引く

// 画像の移動量と方向
let moveSpeed = 3;
let moveXDirection = 1; // x方向の移動方向
let moveYDirection = 1; // y方向の移動方向

// 画像要素を取得
const imageElement = document.getElementById("pokemon-image");

// メインループ（画像の移動を制御）
function moveImage() {
  // 画像の位置を更新（自動的に移動）
  x += moveSpeed * moveXDirection;
  y += moveSpeed * moveYDirection;

  // 画像が画面の端に達した場合、方向を逆にして反対側から再び現れるように制御
  if (x <= 0 || x >= window.innerWidth - imageElement.width) {
    moveXDirection *= -1;
  }
  if (y <= 0 || y >= window.innerHeight - imageElement.height) {
    moveYDirection *= -1;
  }

  // 画像の位置を設定
  imageElement.style.left = x + "px";
  imageElement.style.top = y + "px";

  // メインループを再帰的に呼び出す
  requestAnimationFrame(moveImage);
}

// メインループを開始
moveImage();


const translatedText = "{{ translated_text }}";
const balloon = document.getElementById("balloon");
const balloon2 = document.getElementById("success-balloon2");

if (translatedText.trim() !== "") {
  // 翻訳後の表示を制御
  balloon.style.display = "none"; // 翻訳前のバルーン非表示
  balloon2.style.display = "block"; // 翻訳後のバルーン表示
}else {
  balloon.style.display = "block"; // 翻訳前のバルーン表示
  balloon2.style.display = "none"; // 翻訳後のバルーン非表示
}

// 画面が小さくなる場合、バルーンを非表示にする
if (screenWidth <= 800) {
  balloon.style.display = "none";
  balloon2.style.display = "none";
}

// ウィンドウのリサイズイベントを監視してバルーンの表示を更新
window.addEventListener('resize', updateBalloonVisibility);

// ページ読み込み時にも一度実行して初期状態を設定
window.addEventListener('load', updateBalloonVisibility);
