# Sierra Creek Ventures

Static website for sierracreekventures.com. Plain HTML, CSS and images; no build step.
Published with Cloudflare Pages from the `main` branch (framework preset: None, no build command, output directory: root).

## Blog posts

Each post lives in `blog/<slug>/index.html` and is listed in `blog/index.html` (newest first) and `sitemap.xml`.
Posts made from a newsletter use the newsletter's own images, in the post and as the `og:image` (currently linked from Follow Up Boss's public attachment URLs; copy them into `img/newsletter/` when a download is possible). Other posts get a link-preview share card in `img/share/<slug>.jpg` (1200x630, photo plus title), made with `source/make-share-card.py` and referenced by the post's `og:image` tag, so each link shows a unique photo when texted or shared.
