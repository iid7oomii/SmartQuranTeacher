const ayahs = [
    "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "الرَّحْمَٰنِ الرَّحِيمِ",
    "مَالِكِ يَوْمِ الدِّينِ"
];

let currentAyah = 0;
const ayahContainer = document.getElementById("ayah-container");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
    showAyah();
});

function showAyah() {
    if (currentAyah < ayahs.length) {
        ayahContainer.innerText = ayahs[currentAyah];
        currentAyah++;
    } else {
        ayahContainer.innerText = "تمت السورة";
    }
}
