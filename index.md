---
layout: default
title: Home
permalink: /
---

<nav class="toc-sidebar" aria-label="Table of contents">
  <p class="toc-title">Contents</p>
  <a href="#overview" class="toc-link">Overview</a>
  <a href="#real-vs-ai" class="toc-link"><strong class="animated-word-alt">Real</strong> vs <strong class="animated-word">AI</strong> Game</a>
  <a href="#key-contributions" class="toc-link">Key Contributions</a>
  <a href="#contrib-cxr7" class="toc-link toc-subsection" data-expand-card="contrib-cxr7">CXR7-1M Dataset</a>
  <a href="#contrib-foundation" class="toc-link toc-subsection" data-expand-card="contrib-foundation">Foundation Model</a>
  <a href="#contrib-causal" class="toc-link toc-subsection" data-expand-card="contrib-causal">Causal Model</a>
  <a href="#contrib-editing" class="toc-link toc-subsection" data-expand-card="editing-demo">Controllable Editing</a>
  <a href="#contrib-realism" class="toc-link toc-subsection" data-expand-card="clinical-realism">Clinical Realism</a>
</nav>

<section class="hero" id="overview">
  <div class="hero-copy">
    <h1 class="hero-title">Scaling Generative Foundation Models for Chest Radiography with Rectified Flow Transformers</h1>

    <div class="hero-meta">
      <span style="line-height:1.5;">
      <a href="https://scholar.google.com/citations?user=iIcKRG0AAAAJ&hl=en">Fabio De Sousa Ribeiro</a><sup>1,2,*</sup>
      · <a href="https://scholar.google.com/citations?user=yj9NS6UAAAAJ&hl=en">Emma A.M. Stanley</a><sup>1,*</sup>
      · <a href="https://scholar.google.com/citations?user=4PLajkUAAAAJ&hl=en">Charles Jones</a><sup>1</sup>
      · <a href="https://scholar.google.com/citations?user=HnYh1aQAAAAJ&hl=en">Tian Xia</a><sup>1</sup>
      · <a href="https://scholar.google.com/citations?user=4nstgukAAAAJ&hl=en">Dominic C. Marshall</a><sup>1,3</sup>
      · <a href="https://scholar.google.com/citations?user=4th3eYYAAAAJ&hl=fr">Laurent Renard Triché</a><sup>4</sup>
      · <a href="https://scholar.google.com/citations?user=57jIWn8AAAAJ&hl=en">Christopher V. Cosgriff</a><sup>6,7</sup>
      · <br><a href="https://scholar.google.com.py/citations?user=Xz0qnGoAAAAJ&hl=en">Panagiotis Dimitrakopoulos</a><sup>2,5</sup>
      · <a href="https://scholar.google.com/citations?user=jC1uFnYAAAAJ&hl=en">Sotirios A. Tsaftaris</a><sup>2,5</sup>
      · <a href="https://scholar.google.com/citations?user=g_HtjLIAAAAJ&hl=en">Ben Glocker</a><sup>1,2</sup>
      </span>
      <span style="line-height:1.5;"><sup>1</sup>Imperial College London
      · <sup>2</sup>Causality in Healthcare AI (CHAI) Hub
      · <sup>3</sup>Cleveland Clinic London
      · <sup>4</sup>Department of Perioperative Medicine, CHU Clermont-Ferrand
      · <br><sup>5</sup>University of Edinburgh
      · <sup>6</sup>Department of Medicine, Massachussetts General Hospital
      · <sup>7</sup>Broad Institute of MIT and Harvard
      · <sup>*</sup>Joint first authors
      </span>
    </div>

    <div class="hero-actions">
      <a href="https://arxiv.org/pdf/2606.19460" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-external-link-alt"></i> Read Paper
      </a>
      <a href="https://arxiv.org/abs/2606.19460" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
        <i class="fas fa-external-link-alt"></i> View arXiv
      </a>
      <a href="#real-vs-ai" class="btn btn-secondary">
        <!-- <i class="fas fa-play-circle"></i> Try Real vs AI Demo -->
        <i class="fas fa-play-circle"></i><span class="demo-btn-label">Try <span class="demo-tight"><strong class="animated-word-alt">Real</strong> vs <strong class="animated-word">AI</strong></span> Demo</span>
      </a>
    </div>

  </div>

    <div class="hero-tldr" aria-label="TLDR">
      <h2>TL;DR</h2>
      <ul>
        <li>First billion-parameter scale generative foundation model for chest radiography trained from scratch.</li>
        <li>Built on CXR7-1M, the largest open source CXR dataset with over 1M radiographs and clinical expert-guided metadata.</li>
        <li>State-of-the-art synthesis fidelity, indistinguishable from real radiographs to clinical experts.</li>
      </ul>
    </div>

  <div class="main-figure">
    <div class="paper-card main-figure-card">
      <img
        src="{{ site.baseurl }}/assets/images/main_diagram.svg"
        alt="Main diagram"
        loading="eager"
      />
      <p class="figure-caption"><strong>Frontier generative foundation model for chest radiography.</strong>
        <strong>a)</strong> The proposed CXR7-1M dataset, harmonised from seven existing datasets and augmented with additional radiologist-guided metadata. <strong>b)</strong> Radiographic rectified flow transformer (RadiT), and VAE trained with a domain-specific Rad-DINO perceptual loss (Rad-VAE). <strong>c)</strong> Synthetic 512x512 resolution chest radiographs generated using our <strong class="animated-word">RadiT XL (1.3B)</strong> model.
      </p>
      <div class="abstract-reveal">
        <h2>Abstract</h2>
        <p>We introduce the first generative foundation model for chest radiograph synthesis trained from scratch at the billion-parameter scale. Existing radiographic AI models often suffer from poor generalisation across patient subpopulations, institutions, and acquisition settings, resulting in limited real-world clinical utility. Controlled, high-fidelity synthesis of chest radiographs is a promising path toward diversifying clinical datasets and evaluating the robustness of diagnostic models. Therefore, we present the largest specialist generative foundation model for chest radiographs to date, with over <strong>1.3B</strong> parameters, trained for <strong>1.6T</strong> tokens on a curated, heterogeneous dataset comprising <strong>1.2M</strong> radiographs and clinical expert-guided metadata.
  Our model supports controllable radiograph generation and editing across multiple demographic subgroups, acquisition views, and a dozen pathologies. Moreover, we significantly advance the state-of-the-art in radiograph synthesis fidelity, producing images that are indistinguishable from real radiographs to clinical experts.
        </p>
      </div>
    </div>
  </div>

  <div class="section-header" id="real-vs-ai">
    <h1 class="iq-title" style="font-size: 2.2rem;">
      <strong class="animated-word-alt">Real</strong> vs
      <strong class="animated-word">AI</strong> Radiographs: Can You Tell?
    </h1>
  </div>
  <div id="image-quiz-root" class="image-quiz-root">
    <section class="paper-card image-quiz">
      <div class="iq-header">
        <div>
          <p class="iq-challenge">Test yourself on the same real-vs-synthetic challenge used with clinical experts.</p>
          <p class="iq-subtitle">Choose the synthetic radiograph generated by <strong class="animated-word">RadiT XL</strong>. Good luck!</p>
        </div>
        <div class="iq-progress"><span id="iq-round">1</span>/<span id="iq-total">0</span></div>
      </div>
      <div class="iq-pair" id="iq-pair">
        <button class="iq-choice" id="iq-left" aria-label="Left answer"></button>
        <button class="iq-choice" id="iq-right" aria-label="Right answer"></button>
      </div>
      <div class="iq-footer" id="iq-footer">
        <div id="iq-message" class="iq-message"></div>
        <button id="iq-restart" class="btn btn-primary iq-restart" style="display:none;">Play again</button>
      </div>
    </section>
  </div>

  <div class="section-header" id="key-contributions" style="display:flex; justify-content:space-between; align-items:center;">
  <h1 style="font-size: 2rem;">Key Contributions</h1>
  <span class="tooltip">Hover over cards for details</span>
</div>
  <div class="grid grid-3">
    <article class="feature-card" id="contrib-cxr7">
      <div class="feature-content">
        <h3>The CXR7-1M Dataset</h3>
        <p>We collate the CXR7-1M dataset, the largest-scale open-source chest X-ray dataset to date, comprising over <strong>1.2M</strong> radiographs, harmonised from multiple existing datasets and paired with radiologist-guided metadata systematically extracted through expert consultation.</p>
      </div>
      <div class="feature-figure" data-figure="cxr7-1m"></div>
      <div class="figure-caption">CXR7-1M dataset composition, showing the seven different original dataset sources and all the available patient metadata variables, which were harmonised through iterative consultation with clinical experts.</div>
    </article>
    <article class="feature-card" id="contrib-foundation">
      <div class="feature-content">
        <h3>Frontier Generative Foundation Model for Chest Radiography</h3>
        <p>We build a series of scaled rectified flow transformers for chest X-ray generation,
up to <strong>1.3B</strong> parameters. Our largest model, <strong class="animated-word">RadiT XL</strong>, was trained for <strong>1.6T</strong> tokens and attains four-fold FDD and ten-fold
KDD improvements over prior state-of-the-art on the CheXGenBench benchmark.</p>
      </div>
      <div class="feature-figures-stack">
        <div class="figure-item">
          <div class="feature-figure" data-figure="foundation-model-1"></div>
          <div class="figure-caption">We optimise our VAE variants for radiographic fidelity by either training them from scratch or LoRA fine-tuning from a
FLUX.2 VAE base,<br>using a domain-specific Rad-DINO perceptual loss.</div>
        </div>
        <div class="figure-item">
          <div class="feature-figure" data-figure="foundation-model-2"></div>
          <div class="figure-caption"><strong>a)</strong> Latent-space rectified flow models operate
on Rad-VAE latent tokens and use patient metadata conditioning to generate controllable chest
radiographs. <strong>b)</strong> Pixel-space rectified flow models operate directly on image patch tokens with the
same metadata conditioning interface, avoiding an explicit VAE bottleneck.</div>
        </div>
        <div class="figure-item">
          <div class="feature-figure" data-figure="foundation-model-3"></div>
          <div class="figure-caption">Comparative evaluation of CXR generative fidelity. All metrics were computed using Rad-DINO features. Benchmark results are from CheXGenBench<br>(Dutt et al., 2025). We also report results on two internal test splits from CXR7-1M, a MIMIC-CXR 5K split and a separate 50K split.<br>Superscript (pix) denotes our flow model variants trained in pixel-space at 512×512 resolution.</div>
        </div>
      </div>
    </article>
    <article class="feature-card" id="contrib-causal">
      <div class="feature-content">
        <h3>Clinical Expert-Guided Causal Model</h3>
        <p>We introduce an expert-designed, clinically plausible causal graph for chest X-ray and instantiate it
as the largest continuous flow-based causal model to date, spanning <strong>19</strong> demographic
and radiological variables, and unlocking scalable exact abduction for discrete factors.</p>
      </div>
      <div class="feature-figure" data-figure="causal-model"></div>
      <div class="figure-caption">Proposed clinical expert-informed causal graph of demographic factors and radiologic findings, developed through iterative discussions with three clinical experts. A continuous flow-based structural causal model was then built such that CXR synthesis can reflect known clinical dependencies between variables.
      </div>
    </article>
    <article class="feature-card" id="editing-demo">
      <div class="feature-content">
        <h3>Controllable Image Editing</h3>
        <p>We evaluate our models on controllable image generation and editing, showing that <strong class="animated-word">RadiT XL</strong> achieves high-fidelity control over multiple demographic, acquisition-view, and clinical attributes.</p>
      </div>
      <div class="editing-carousel">
        <div class="viewer-container viewer-container-2up">
          <button class="viewer-btn viewer-btn-prev" id="edit-prev" aria-label="Previous editing animation">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="viewer-image-row">
            <div class="viewer-image-wrapper">
              <img id="edit-image-0" src="{{ site.baseurl }}/assets/images/editing/age.apng" alt="Animation showing age counterfactual" class="editing-image" loading="lazy" decoding="async" />
              <div id="edit-caption-0" class="editing-image-caption">Age: 55 <span class="editing-arrow">➜</span> 7</div>
            </div>
            <div class="viewer-image-wrapper">
              <img id="edit-image-1" src="{{ site.baseurl }}/assets/images/editing/sex.apng" alt="Animation showing sex counterfactual" class="editing-image" loading="lazy" decoding="async" />
              <div id="edit-caption-1" class="editing-image-caption">Sex: Male <span class="editing-arrow">➜</span> Female</div>
            </div>
          </div>
          <button class="viewer-btn viewer-btn-next" id="edit-next" aria-label="Next editing animation">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="viewer-controls">
          <div id="edit-dots" class="viewer-dots" aria-label="Editing carousel progress"></div>
        </div>
      </div>
    </article>
    <article class="feature-card" id="clinical-realism">
      <div class="feature-content">
        <h3>Clinically Indistinguishable Synthetic Radiographs</h3>
        <p>We conduct a blind real-vs-synthetic discrimination experiment and show that <strong class="animated-word">RadiT XL</strong> produces chest radiographs that expert clinicians find indistinguishable from real ones.</p>
      </div>
      <div class="feature-figure" data-figure="synthetic-radiographs"></div>
      <div class="figure-caption">Clinical experts' performance on the real-vs-synthetic task across 2 presentations.<br>Near-chance accuracy and low intra- and inter-rater Cohen's kappa indicate high synthetic image realism.</div>
      <div class="synthetic-radiographs-viewer">
        <div class="viewer-container viewer-container-2up">
          <button class="viewer-btn viewer-btn-prev" id="synth-prev" aria-label="Previous image">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="viewer-image-row">
            <div class="viewer-image-wrapper">
              <img id="synth-image-0" src="{{ site.baseurl }}/assets/images/expert-classified/0.png" alt="Synthetic radiograph 1" loading="lazy" decoding="async" />
            </div>
            <div class="viewer-image-wrapper">
              <img id="synth-image-1" src="{{ site.baseurl }}/assets/images/expert-classified/1.png" alt="Synthetic radiograph 2" loading="lazy" decoding="async" />
            </div>
          </div>
          <button class="viewer-btn viewer-btn-next" id="synth-next" aria-label="Next image">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        <div class="viewer-controls">
          <div id="synth-dots" class="viewer-dots" aria-label="Synthetic carousel progress"></div>
        </div>
      </div>
      <div class="figure-caption">Synthetic chest radiographs generated by <strong class="animated-word">RadiT XL</strong> that all three clinical experts thought were real.</div>
    </article>
  </div>

    <script>
    window.siteBaseurl = "{{ site.baseurl }}";

  </script>
</section>
