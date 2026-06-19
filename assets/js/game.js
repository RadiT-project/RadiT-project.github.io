document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById("image-quiz-root");
  if (!root) return;

  const rounds = 10;
  const baseUrl =
    typeof window !== "undefined" && window.siteBaseurl
      ? window.siteBaseurl
      : "";
  const imageRoot = `${baseUrl}/assets/images`;
  const realLateralIndices = new Set([
    0, 1, 5, 7, 8, 16, 18, 19, 20, 21, 23, 25, 28, 36, 40, 43, 46, 48, 49,
  ]);
  const fakeLateralIndices = new Set([
    0, 1, 2, 4, 5, 7, 8, 11, 16, 18, 19, 20, 21, 23, 25, 28, 36, 40, 46, 48,
    49,
  ]);

  function buildItems(kind, lateralIndices) {
    return Array.from({ length: 50 }, (_, i) => {
      const isLateral = lateralIndices.has(i);
      return {
        src: `${imageRoot}/${kind}/${i}${isLateral ? "-L" : ""}.png`,
        isLateral,
      };
    });
  }

  const realItems = buildItems("real", realLateralIndices);
  const fakeItems = buildItems("fake", fakeLateralIndices);
  const pairCount = Math.min(rounds, realItems.length, fakeItems.length);
  const imagePreloadSet = new Set();

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildDeck() {
    const availableReal = {
      frontal: shuffle(realItems.filter((item) => !item.isLateral).slice()),
      lateral: shuffle(realItems.filter((item) => item.isLateral).slice()),
    };
    const availableFake = {
      frontal: shuffle(fakeItems.filter((item) => !item.isLateral).slice()),
      lateral: shuffle(fakeItems.filter((item) => item.isLateral).slice()),
    };
    const deck = [];

    for (let i = 0; i < pairCount; i++) {
      const availableViews = ["frontal", "lateral"].filter(
        (view) => availableReal[view].length > 0 && availableFake[view].length > 0,
      );
      const view = availableViews[Math.floor(Math.random() * availableViews.length)];
      const realItem = availableReal[view].pop();
      const fakeItem = availableFake[view].pop();
      const fakeOnLeft = Math.random() < 0.5;

      deck.push({
        left: fakeOnLeft ? fakeItem.src : realItem.src,
        right: fakeOnLeft ? realItem.src : fakeItem.src,
        correct: fakeOnLeft ? "left" : "right",
      });
    }

    return deck;
  }

  let deck = buildDeck();
  let index = 0;
  let score = 0;

  const leftBtn = document.getElementById("iq-left");
  const rightBtn = document.getElementById("iq-right");
  const roundEl = document.getElementById("iq-round");
  const totalEl = document.getElementById("iq-total");
  const msgEl = document.getElementById("iq-message");
  const actionBtn = document.getElementById("iq-restart");
  const leftImg = document.createElement("img");
  const rightImg = document.createElement("img");

  leftImg.alt = "Left radiograph option";
  rightImg.alt = "Right radiograph option";
  leftImg.loading = "eager";
  rightImg.loading = "eager";
  leftImg.decoding = "async";
  rightImg.decoding = "async";
  leftBtn.appendChild(leftImg);
  rightBtn.appendChild(rightImg);

  totalEl.textContent = pairCount;

  function preloadImage(src) {
    if (!src || imagePreloadSet.has(src)) {
      return;
    }

    imagePreloadSet.add(src);
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }

  function warmUpcomingPairs(fromIndex) {
    if (pairCount === 0) {
      return;
    }

    const current = deck[fromIndex];
    const next = deck[fromIndex + 1];

    if (current) {
      preloadImage(current.left);
      preloadImage(current.right);
    }

    if (next) {
      preloadImage(next.left);
      preloadImage(next.right);
    }
  }

  function renderPair() {
    if (pairCount === 0) {
      msgEl.textContent =
        "No pairs are available. Please add more real and fake images.";
      msgEl.classList.remove("correct", "wrong");
      leftBtn.disabled = true;
      rightBtn.disabled = true;
      actionBtn.classList.remove("restart");
      actionBtn.style.display = "none";
      return;
    }

    msgEl.textContent = "";
    msgEl.classList.remove("correct", "wrong");
    actionBtn.classList.remove("restart");
    leftBtn.className = "iq-choice";
    rightBtn.className = "iq-choice";
    leftBtn.disabled = false;
    rightBtn.disabled = false;
    actionBtn.style.display = "none";

    const pair = deck[index];
    roundEl.textContent = index + 1;

    leftImg.src = pair.left;
    rightImg.src = pair.right;
    warmUpcomingPairs(index);
  }

  function showResult() {
    const percent = Math.round((score / pairCount) * 100);
    msgEl.textContent = `You scored ${score}/${pairCount} (${percent}%).`;
    msgEl.classList.remove("correct", "wrong");
    actionBtn.textContent = "Play again";
    actionBtn.dataset.state = "restart";
    actionBtn.classList.add("restart");
    actionBtn.style.display = "inline-block";
  }

  function showFeedback(isCorrect) {
    msgEl.classList.remove("correct", "wrong");
    if (isCorrect) {
      msgEl.textContent = "Correct, nice job!";
      msgEl.classList.add("correct");
    } else {
      msgEl.textContent = `Incorrect, the synthetic radiograph is on the ${deck[index].correct}!`;
      msgEl.classList.add("wrong");
    }

    if (index === pairCount - 1) {
      showResult();
      return;
    }

    actionBtn.textContent = "Next";
    actionBtn.dataset.state = "next";
    actionBtn.style.display = "inline-block";
  }

  function handleChoice(side) {
    leftBtn.disabled = true;
    rightBtn.disabled = true;

    const isCorrect = side === deck[index].correct;
    if (isCorrect) {
      score += 1;
      const chosenBtn = side === "left" ? leftBtn : rightBtn;
      chosenBtn.classList.add("correct");
    } else {
      const chosenBtn = side === "left" ? leftBtn : rightBtn;
      const correctBtn = deck[index].correct === "left" ? leftBtn : rightBtn;
      chosenBtn.classList.add("wrong");
      correctBtn.classList.add("correct");
    }

    showFeedback(isCorrect);
  }

  leftBtn.addEventListener("click", () => handleChoice("left"));
  rightBtn.addEventListener("click", () => handleChoice("right"));
  actionBtn.addEventListener("click", () => {
    if (actionBtn.dataset.state === "next") {
      index += 1;
      renderPair();
    } else {
      index = 0;
      score = 0;
      deck = buildDeck();
      renderPair();
    }
  });

  renderPair();
});
