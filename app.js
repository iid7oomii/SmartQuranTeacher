// app.js

// ------ بيانات المشروع ------
let currentSurah = "alfatiha";
let currentVerseIndex = 0;
let state = "IDLE"; // حالات: IDLE, PLAYING_VERSE, LISTENING_CHILD, EVALUATING

// تحميل JSON للسورة
async function loadSurahData() {
  const response = await fetch(`data/quran_text/${currentSurah}.json`);
  const data = await response.json();
  return data.ayahs;
}

let verses = []; // هنا نخزن الآيات بعد التحميل

// ------ عرض الآية الحالية ------
function displayCurrentVerse() {
  const verseText = document.getElementById("verseText");
  verseText.innerText = `${verses[currentVerseIndex].number}. ${verses[currentVerseIndex].text}`;
}

// ------ الانتقالات بين الحالات ------
function nextState(event) {
  console.log("حالة قبل:", state, "حدث:", event);

  if (state === "IDLE" && event === "START") {
    state = "PLAYING_VERSE";
    playVerse();
  } else if (state === "PLAYING_VERSE" && event === "FINISHED_VERSE") {
    state = "LISTENING_CHILD";
    listenChild();
  } else if (state === "LISTENING_CHILD" && event === "CHILD_DONE") {
    state = "EVALUATING";
    evaluateChild();
  } else if (state === "EVALUATING") {
    // محاكاة النتيجة: عشوائي صح أو خطأ
    let success = Math.random() > 0.4; // ~60% صح
    if (success) {
      if (currentVerseIndex < verses.length - 1) {
        currentVerseIndex++;
        state = "PLAYING_VERSE";
        playVerse();
      } else {
        state = "COMPLETED";
        alert("🎉 تم إكمال السورة!");
      }
    } else {
      state = "PLAYING_VERSE";
      playVerse(); // إعادة نفس الآية
    }
  }

  console.log("حالة بعد:", state);
  displayCurrentVerse();
}

// ------ محاكاة تشغيل آية ------
function playVerse() {
  console.log("🔊 شيخ يقرأ (محاكاة):", verses[currentVerseIndex].text);
  setTimeout(() => {
    nextState("FINISHED_VERSE");
  }, 1500);
}

// ------ محاكاة انتظار الطفل ------
function listenChild() {
  console.log("👂️ الطفل يكرر (محاكاة)...");
  setTimeout(() => {
    nextState("CHILD_DONE");
  }, 1500);
}

// ------ تقييم الطفل ------
function evaluateChild() {
  console.log("📊 تقييم الطفل...");
  nextState();
}

// ------ زر ابدأ ------
function startLearning() {
  nextState("START");
}

// ------ تحميل البيانات عند فتح الصفحة ------
window.onload = async function () {
  verses = await loadSurahData();
  displayCurrentVerse();
};
