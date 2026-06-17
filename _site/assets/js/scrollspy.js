document.addEventListener("DOMContentLoaded", function () {
  const toc = document.querySelector(".toc-sidebar");
  if (!toc) {
    return;
  }

  const links = Array.from(toc.querySelectorAll('.toc-link[href^="#"]'));
  const sectionLinks = links.filter(function (link) {
    return !link.hasAttribute("data-expand-card");
  });
  const sections = sectionLinks
    .map(function (link) {
      const id = link.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      return section ? { id: id, section: section, link: link } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  let activeId = "";
  let hoveredCardId = "";
  let rafToken = null;

  function setActive(id, force) {
    if (!id || id === activeId) {
      return;
    }

    if (!force && hoveredCardId) {
      return;
    }

    activeId = id;
    links.forEach(function (link) {
      const linkId = link.getAttribute("href").slice(1);
      const active = linkId === id;
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "location" : "false");
    });
  }

  function setHoveredCard(cardId) {
    hoveredCardId = cardId || "";
    if (hoveredCardId) {
      setActive(hoveredCardId, true);
    } else {
      updateActiveSection();
    }
  }

  const cardLinks = Array.from(
    toc.querySelectorAll(".toc-link[data-expand-card]"),
  );

  function collapseExpandedCards() {
    cardLinks.forEach(function (link) {
      const cardId = link.getAttribute("data-expand-card");
      const card = cardId ? document.getElementById(cardId) : null;
      if (card) {
        card.classList.remove("is-expanded");
      }
    });
  }

  function expandCard(cardId) {
    if (!cardId) {
      return;
    }

    const card = document.getElementById(cardId);
    if (!card) {
      return;
    }

    collapseExpandedCards();
    card.classList.add("is-expanded");
  }

  function computeActiveId() {
    const probe = window.innerHeight * 0.3;
    let currentId = sections[0].id;

    sections.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= probe) {
        currentId = item.id;
      }
    });

    return currentId;
  }

  function updateActiveSection() {
    if (hoveredCardId) {
      setActive(hoveredCardId, true);
      return;
    }

    setActive(computeActiveId(), true);
  }

  function scheduleActiveSectionUpdate() {
    if (rafToken !== null) {
      return;
    }

    rafToken = window.requestAnimationFrame(function () {
      rafToken = null;
      updateActiveSection();
    });
  }

  cardLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const cardId = link.getAttribute("data-expand-card");
      expandCard(cardId);
      setHoveredCard(cardId);
    });
  });

  cardLinks.forEach(function (link) {
    const cardId = link.getAttribute("data-expand-card");
    const card = cardId ? document.getElementById(cardId) : null;
    if (!card) {
      return;
    }

    card.addEventListener("mouseenter", function () {
      setHoveredCard(cardId);
    });

    card.addEventListener("mouseleave", function () {
      setHoveredCard("");
    });
  });

  toc.addEventListener("mouseleave", function () {
    hoveredCardId = "";
    collapseExpandedCards();
    updateActiveSection();
  });

  const initialHash = window.location.hash ? window.location.hash.slice(1) : "";
  if (initialHash) {
    const initialCardLink = cardLinks.find(function (link) {
      return link.getAttribute("data-expand-card") === initialHash;
    });
    if (initialCardLink) {
      expandCard(initialHash);
      setHoveredCard(initialHash);
    }
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(scheduleActiveSectionUpdate, {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0, 0.01, 0.25, 0.5, 1],
    });

    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  } else {
    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });
  }

  window.addEventListener("resize", scheduleActiveSectionUpdate, {
    passive: true,
  });
  updateActiveSection();
});
