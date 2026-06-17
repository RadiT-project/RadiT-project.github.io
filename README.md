## Quick Start

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