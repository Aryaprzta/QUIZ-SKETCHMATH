const quizData = [
    {
        question: "Seorang praktikan ingin mengukur diameter dalam dari sebuah rongga silinder pada komponen mesin. Komponen jangka sorong manakah yang paling tepat digunakan untuk keperluan tersebut?",
        options: ["Rahang luar (outer jaws)", "Rahang dalam (inner jaws)", "Batang kedalaman (depth rod)", "Baut pengunci (locking screw)"],
        correct: 1,
        rationale: "Rahang dalam berfungsi secara spesifik untuk mengukur diameter dalam suatu lubang, celah, atau rongga pada benda kerja."
    },
    {
        question: "Ketika melakukan pengukuran dengan jangka sorong, posisi mata pembaca tidak tegak lurus dengan skala pengukuran. Jenis kesalahan apa yang terjadi akibat tindakan tersebut?",
        options: ["Kesalahan paralaks", "Kesalahan gaya cekam", "Kesalahan posisi miring", "Kesalahan deformasi material"],
        correct: 0,
        rationale: "Kesalahan paralaks terjadi akibat sudut pandang pembaca yang miring atau tidak tegak lurus dengan garis skala, sehingga merusak akurasi pembacaan."
    },
    {
        question: "Pada sebuah jangka sorong dengan ketelitian 0,05 mm, hasil pembacaan skala utama menunjukkan angka 24 mm. Jika garis pada skala nonius yang berimpit tegak lurus dengan skala utama adalah garis ke-7, berapakah hasil akhir pengukuran tersebut?",
        options: ["24,05 mm", "24,35 mm", "24,70 mm", "31,05 mm"],
        correct: 1,
        rationale: "Sesuai rumus H = SU + (SN × K), maka hasil akhir didapat dari 24 + (7 × 0,05) = 24 + 0,35 = 24,35 mm."
    },
    {
        question: "Fungsi utama dari komponen baut pengunci (locking screw) pada jangka sorong dalam rangkaian proses pengukuran adalah...",
        options: ["Menyeimbangkan berat jangka sorong agar tidak miring", "Mengubah tingkat ketelitian jangka sorong dari 0,05 mm menjadi 0,02 mm", "Mengunci posisi rahang agar hasil pengukuran tidak berubah saat alat dilepas untuk dibaca", "Menggerakkan rahang geser secara halus saat mendekati benda kerja"],
        correct: 2,
        rationale: "Baut pengunci berfungsi mengamankan posisi rahang geser agar pembacaan skala tetap akurat dan tidak bergeser setelah dilepas dari benda kerja."
    },
    {
        question: "Manakah di antara pilihan berikut yang merupakan dampak negatif langsung dari memberikan gaya cekam berlebihan pada rahang jangka sorong saat mengukur benda kerja?",
        options: ["Meningkatkan ketelitian alat hingga melebihi batas 0,02 mm", "Menyebabkan potensi kerusakan fisik pada komponen alat ukur dan hasil menjadi tidak akurat", "Mengubah fungsi rahang luar menjadi batang kedalaman otomatis", "Menghilangkan kesalahan paralaks secara menyeluruh saat membaca skala"],
        correct: 1,
        rationale: "Penekanan rahang yang terlalu keras dapat membengkokkan mekanisme presisi rahang atau merusak material objek, memicu bias data ukur."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackBox = document.getElementById("feedback-box");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextBtn.classList.add("hidden");
    feedbackBox.classList.add("hidden");
    feedbackBox.className = "feedback hidden";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedIndex, clickedButton) {
    let currentQuestion = quizData[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    allButtons.forEach((button, index) => {
        button.disabled = true; // Kunci semua pilihan setelah memilih
        if (index === currentQuestion.correct) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
        feedbackBox.innerText = `Benar! \n💡 Analisis: ${currentQuestion.rationale}`;
        feedbackBox.classList.add("correct-style");
    } else {
        clickedButton.classList.add("wrong");
        feedbackBox.innerText = `Salah! \n💡 Analisis: ${currentQuestion.rationale}`;
        feedbackBox.classList.add("wrong-style");
    }

    feedbackBox.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreText.innerText = `Anda menjawab benar ${score} dari ${quizData.length} pertanyaan. Nilai Akhir: ${(score / quizData.length) * 100}`;
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
});

// Jalankan kuis pertama kali saat halaman dimuat
loadQuestion();