const heroMessages = [
  {
    kicker: "大阪・福島、路地の奥。",
    title: "喧騒を置いてくる、\n大人の隠れ家。",
    text: "元は酒蔵だった小さな扉の先で、旬の魚と日本酒を静かに。"
  },
  {
    kicker: "静かに、心ゆくまで。",
    title: "魚と日本酒、\n店主の心遣いに酔う一軒。",
    text: "冷酒と燗酒、料理に寄り添う温度まで楽しめる福島の和食店。"
  },
  {
    kicker: "知る人だけが、たどり着く。",
    title: "余白で語る、\n路地裏の静謐な割烹。",
    text: "上質なのに敷居が高すぎない。大切な方との会話をゆっくりと。"
  },
  {
    kicker: "毎日の手書きメニュー。",
    title: "その日だけの肴を、\nその酒とともに。",
    text: "お造り、焼き物、揚げ物、一品料理。迷う時間も味わいのひとつ。"
  },
  {
    kicker: "温度で合わせる日本酒。",
    title: "冷酒と燗酒が、\n料理の余韻をつなぐ。",
    text: "魚、野菜、肉、締めの一品まで。小さな店で静かに満ちる夜。"
  }
];

const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".slide-dots button")];
const heroCopy = document.querySelector(".hero-copy");
const heroKicker = document.querySelector("#heroKicker");
const heroTitle = document.querySelector("#heroTitle");
const heroText = document.querySelector("#heroText");
let activeSlide = 0;
let slideTimer;

function setHero(index) {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });

  const message = heroMessages[activeSlide];
  heroCopy.classList.remove("is-changing");
  void heroCopy.offsetWidth;
  heroKicker.textContent = message.kicker;
  heroTitle.innerHTML = message.title.replace("\n", "<br>");
  heroText.textContent = message.text;
  heroCopy.classList.add("is-changing");
}

function startHero() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => setHero(activeSlide + 1), 5600);
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    setHero(index);
    startHero();
  });
});

startHero();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});
