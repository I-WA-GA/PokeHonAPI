// static/js/script.js

const textInput = document.getElementById("text");
document.addEventListener("DOMContentLoaded", function () {
  // ここにJavaScriptコードを配置
  document.getElementById("play-translated-text").addEventListener("click", function () {
    var translatedText = "{{ translated_text }}"; // 翻訳されたテキストを取得
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(translatedText);
    synth.speak(utterance);
  });
});

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
const screenWidth = window.innerWidth;
if (screenWidth <= 800) {
  balloon.style.display = "none";
  balloon2.style.display = "none";
}

// ウィンドウのリサイズイベントを監視してバルーンの表示を更新
window.addEventListener('resize', updateBalloonVisibility);

// ページ読み込み時にも一度実行して初期状態を設定
window.addEventListener('load', updateBalloonVisibility);
