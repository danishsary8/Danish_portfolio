<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Conventions

- App media (photos, screenshots, documents) is served from the CDN via `.asset.json` pointer files — never commit raw binaries into the repo.
- Portfolio content must render visibly before hydration and without viewport observers; motion is a progressive enhancement, never a prerequisite for reading the page.
- Keep technical skill presentation in a dedicated component; React Bits pointer effects use event-local CSS variables and semantic tokens to stay SSR-safe and lightweight.
- Keep the skills architecture illustration separate from the category controls; every technology remains visible and selection changes only its matching visual layer.
- Keep name typing in a dedicated React Bits-adapted component with a complete SSR text underlay and one post-hydration pass; this prevents blank headings, layout shifts and unwanted looping.
