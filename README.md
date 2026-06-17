# Scaling Generative Foundation Models for Chest Radiography with Rectified Flow Transformers

<span style="line-height:1.5;">
<a href="https://scholar.google.com/citations?user=iIcKRG0AAAAJ&hl=en">Fabio De Sousa Ribeiro</a><sup>1,2,*</sup>
· <a href="https://scholar.google.com/citations?user=yj9NS6UAAAAJ&hl=en">Emma A.M. Stanley</a><sup>1,*</sup>
· <a href="https://scholar.google.com/citations?user=4PLajkUAAAAJ&hl=en">Charles Jones</a><sup>1</sup>
· <a href="https://scholar.google.com/citations?user=HnYh1aQAAAAJ&hl=en">Tian Xia</a><sup>1</sup>
· <a href="https://scholar.google.com/citations?user=4nstgukAAAAJ&hl=en">Dominic C. Marshall</a><sup>1,3</sup>
· <a href="https://scholar.google.com/citations?user=4th3eYYAAAAJ&hl=fr">Laurent Renard Triché</a><sup>4</sup>
· <a href="https://scholar.google.com/citations?user=57jIWn8AAAAJ&hl=en">Christopher V. Cosgriff</a><sup>6,7</sup>
· <a href="https://scholar.google.com.py/citations?user=Xz0qnGoAAAAJ&hl=en">Panagiotis Dimitrakopoulos</a><sup>2,5</sup>
· <a href="https://scholar.google.com/citations?user=jC1uFnYAAAAJ&hl=en">Sotirios A. Tsaftaris</a><sup>2,5</sup>
· <a href="https://scholar.google.com/citations?user=g_HtjLIAAAAJ&hl=en">Ben Glocker</a><sup>1,2</sup>
</span>
<br>
<br>
<span style="line-height:1.5;"><sup>1</sup>Imperial College London
· <sup>2</sup>Causality in Healthcare AI (CHAI) Hub
· <sup>3</sup>Cleveland Clinic London
· <sup>4</sup>Department of Perioperative Medicine, CHU Clermont-Ferrand
· <sup>5</sup>University of Edinburgh
· <sup>6</sup>Department of Medicine, Massachussetts General Hospital
· <sup>7</sup>Broad Institute of MIT and Harvard
· <sup>*</sup>Joint first authors
</span>

### Local Quick Start

1. Create and activate the environment, then install dependencies:

```bash
conda create -n radit-site -c conda-forge ruby=3.4.8 gxx
conda activate radit-site
gem install bundler jekyll
cd /path/to/radit-site
bundle install
```

2. Start the local Jekyll server:

```bash
bundle exec jekyll serve
```

3. Open the site in your browser:

http://localhost:4000/RadiT-site/
