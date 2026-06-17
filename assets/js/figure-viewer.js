document.addEventListener("DOMContentLoaded", function () {
  const baseUrl =
    typeof window !== "undefined" && window.siteBaseurl
      ? window.siteBaseurl
      : "";
  const imageCount = 10;
  let currentIndex = 0;

  const synthImageEls = [
    document.getElementById("synth-image-0"),
    document.getElementById("synth-image-1"),
  ];
  const prevBtn = document.getElementById("synth-prev");
  const nextBtn = document.getElementById("synth-next");

  const editingSlides = [
    {
      src: `${baseUrl}/assets/images/editing/age.apng`,
      label: '<strong>Age:</strong> 55 <span class="animated-arrow">➜</span> 7',
      alt: "Animation showing age counterfactual",
    },
    {
      src: `${baseUrl}/assets/images/editing/sex.apng`,
      label:
        '<strong>Sex:</strong> Male <span class="animated-arrow">➜</span> Female',
      alt: "Animation showing sex counterfactual",
    },
    {
      src: `${baseUrl}/assets/images/editing/view.apng`,
      label:
        '<strong>View:</strong> Lateral <span class="animated-arrow">➜</span> PA',
      alt: "Animation showing view counterfactual",
    },
    {
      src: `${baseUrl}/assets/images/editing/pleural.apng`,
      label:
        '<strong>Pleural Effusion:</strong> Negative <span class="animated-arrow">➜</span> Positive',
      alt: "Animation showing pleural effusion counterfactual",
    },
    {
      src: `${baseUrl}/assets/images/editing/sd.apng`,
      label:
        '<strong>Support Devices:</strong> Positive <span class="animated-arrow">➜</span> Negative',
      alt: "Animation showing support devices counterfactual",
    },
    {
      src: `${baseUrl}/assets/images/editing/cm.apng`,
      label:
        '<strong>Cardiomegaly:</strong> Negative <span class="animated-arrow">➜</span> Positive',
      alt: "Animation showing cardiomegaly counterfactual",
    },
  ];

  let editingIndex = 0;
  const editImageEls = [
    document.getElementById("edit-image-0"),
    document.getElementById("edit-image-1"),
  ];
  const editCaptionEls = [
    document.getElementById("edit-caption-0"),
    document.getElementById("edit-caption-1"),
  ];
  const editDotContainer = document.getElementById("edit-dots");
  const synthDotContainer = document.getElementById("synth-dots");
  const editPrevBtn = document.getElementById("edit-prev");
  const editNextBtn = document.getElementById("edit-next");
  const editingDecodeCache = new Map();
  const synthDecodeCache = new Map();
  let editingIsSwitching = false;
  let synthViewerActive = false;
  const synthViewer = document.querySelector(".synthetic-radiographs-viewer");

  function preloadAndDecode(src, priority, cache) {
    if (cache.has(src)) {
      return cache.get(src);
    }

    const img = new Image();
    img.decoding = "async";
    if ("fetchPriority" in img) {
      img.fetchPriority = priority || "low";
    }

    const ready = new Promise(function (resolve) {
      img.onload = function () {
        resolve();
      };
      img.onerror = function () {
        resolve();
      };
    }).then(function () {
      if (typeof img.decode !== "function") {
        return;
      }
      return img.decode().catch(function () {
        return undefined;
      });
    });

    img.src = src;
    cache.set(src, ready);
    return ready;
  }

  function preloadAndDecodeEditing(src, priority) {
    return preloadAndDecode(src, priority, editingDecodeCache);
  }

  function preloadAndDecodeSynth(src, priority) {
    return preloadAndDecode(src, priority, synthDecodeCache);
  }

  function normalizeEditingIndex(i) {
    return (i + editingSlides.length) % editingSlides.length;
  }

  function warmEditingSlides(anchorIndex) {
    if (!editingSlides.length) {
      return;
    }

    const warmOrder = [
      anchorIndex,
      anchorIndex + 1,
      anchorIndex + 2,
      anchorIndex + 3,
      anchorIndex - 1,
      anchorIndex - 2,
    ];

    warmOrder.forEach(function (rawIndex, order) {
      const idx = normalizeEditingIndex(rawIndex);
      const priority = order < 2 ? "high" : "low";
      preloadAndDecodeEditing(editingSlides[idx].src, priority);
    });
  }

  function preloadAllEditingSlides() {
    editingSlides.forEach(function (slide, index) {
      preloadAndDecodeEditing(slide.src, index < 2 ? "high" : "low");
    });
  }

  function normalizeSynthIndex(i) {
    return (i + imageCount) % imageCount;
  }

  function warmSynthImages(anchorIndex) {
    if (!synthImages.length) {
      return;
    }

    const warmOrder = [
      anchorIndex,
      anchorIndex + 1,
      anchorIndex + 2,
      anchorIndex + 3,
      anchorIndex - 2,
    ];

    warmOrder.forEach(function (rawIndex, order) {
      const idx = normalizeSynthIndex(rawIndex);
      const priority = order < 2 ? "high" : "low";
      preloadAndDecodeSynth(synthImages[idx], priority);
    });
  }

  const synthImages = Array.from(
    { length: imageCount },
    (_, i) => `${baseUrl}/assets/images/expert-classified/${i}.png`,
  );

  function renderDots(container, pageCount, activePage) {
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < pageCount; i += 1) {
      const dot = document.createElement("span");
      dot.className = `viewer-dot${i === activePage ? " active" : ""}`;
      container.appendChild(dot);
    }
  }

  async function updateEditingDisplay(waitForDecode) {
    const firstIndex = editingIndex;
    const secondIndex = (editingIndex + 1) % editingSlides.length;
    const firstSlide = editingSlides[firstIndex];
    const secondSlide = editingSlides[secondIndex];

    if (waitForDecode) {
      await Promise.all([
        preloadAndDecodeEditing(firstSlide.src, "high"),
        preloadAndDecodeEditing(secondSlide.src, "high"),
      ]);
    }

    editImageEls.forEach((el, idx) => {
      if (!el) return;
      const slide = idx === 0 ? firstSlide : secondSlide;
      el.loading = "eager";
      el.decoding = "async";
      el.style.opacity = "0";
      el.src = slide.src;
      el.alt = slide.alt;
    });

    editCaptionEls.forEach((el, idx) => {
      if (!el) return;
      const slide = idx === 0 ? firstSlide : secondSlide;
      el.innerHTML = slide.label;
    });

    const pageCount = Math.ceil(editingSlides.length / 2);
    const activePage = (editingIndex / 2) % pageCount;
    renderDots(editDotContainer, pageCount, activePage);

    requestAnimationFrame(function () {
      editImageEls.forEach(function (el) {
        if (!el) return;
        el.style.opacity = "1";
      });
    });

    warmEditingSlides(editingIndex);
  }

  function updateDisplay() {
    if (!synthImageEls[0] || !synthImageEls[1]) {
      return;
    }

    const firstIndex = currentIndex;
    const secondIndex = (currentIndex + 1) % imageCount;
    const firstSrc = synthImages[firstIndex];
    const secondSrc = synthImages[secondIndex];

    synthImageEls[0].loading = "eager";
    synthImageEls[0].decoding = "async";
    synthImageEls[1].loading = "eager";
    synthImageEls[1].decoding = "async";

    if (synthImageEls[0].src !== firstSrc) {
      synthImageEls[0].src = firstSrc;
    }
    if (synthImageEls[1].src !== secondSrc) {
      synthImageEls[1].src = secondSrc;
    }

    const pageCount = Math.ceil(imageCount / 2);
    const activePage = (currentIndex / 2) % pageCount;
    renderDots(synthDotContainer, pageCount, activePage);

    warmSynthImages(currentIndex);
  }

  if (editPrevBtn && editNextBtn) {
    editPrevBtn.addEventListener("click", async function () {
      if (editingIsSwitching) {
        return;
      }
      editingIsSwitching = true;
      editPrevBtn.disabled = true;
      editNextBtn.disabled = true;
      editingIndex =
        (editingIndex - 2 + editingSlides.length) % editingSlides.length;
      await updateEditingDisplay(true);
      editPrevBtn.disabled = false;
      editNextBtn.disabled = false;
      editingIsSwitching = false;
    });

    editNextBtn.addEventListener("click", async function () {
      if (editingIsSwitching) {
        return;
      }
      editingIsSwitching = true;
      editPrevBtn.disabled = true;
      editNextBtn.disabled = true;
      editingIndex = (editingIndex + 2) % editingSlides.length;
      await updateEditingDisplay(true);
      editPrevBtn.disabled = false;
      editNextBtn.disabled = false;
      editingIsSwitching = false;
    });
  }

  if (!synthImageEls[0] || !synthImageEls[1] || !prevBtn || !nextBtn) {
    updateEditingDisplay(true);
    return; // Viewer not present on this page
  }

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 2 + imageCount) % imageCount;
    updateDisplay();
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 2) % imageCount;
    updateDisplay();
  });

  if (synthViewer) {
    synthViewer.addEventListener("mouseenter", function () {
      synthViewerActive = true;
    });
    synthViewer.addEventListener("mouseleave", function () {
      synthViewerActive = false;
    });
    synthViewer.addEventListener("focusin", function () {
      synthViewerActive = true;
    });
    synthViewer.addEventListener("focusout", function () {
      synthViewerActive = false;
    });
  }

  // Keyboard navigation for the synthetic viewer only when it is active
  document.addEventListener("keydown", function (e) {
    const tag =
      e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
    if (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      (e.target && e.target.isContentEditable)
    ) {
      return;
    }

    if (!synthViewerActive) {
      return;
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextBtn.click();
    }
  });

  updateEditingDisplay(true);
  updateDisplay();

  const scheduleEditingWarmup =
    window.requestIdleCallback ||
    function (callback) {
      return window.setTimeout(callback, 0);
    };

  scheduleEditingWarmup(function () {
    preloadAllEditingSlides();
  });
});
