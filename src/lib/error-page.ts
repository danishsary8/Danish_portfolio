export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>System Exception // 500</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg-base: #F5F0E8;
        --bg-card: #FAF7F2;
        --text-primary: #0A0A0A;
        --text-muted: #5A554C;
        --accent-gold: #C9973A;
        --border-subtle: rgba(10, 10, 10, 0.10);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg-base: #0A0A0A;
          --bg-card: #181818;
          --text-primary: #F5F0E8;
          --text-muted: #9A948A;
          --accent-gold: #C9973A;
          --border-subtle: rgba(245, 240, 232, 0.12);
        }
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        background: var(--bg-base);
        color: var(--text-primary);
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 2rem 1.5rem;
      }
      .card {
        max-width: 32rem;
        width: 100%;
        text-align: left;
        padding: 2.5rem;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: 3px;
        box-shadow: none;
      }
      .code-badge {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.05em;
        color: var(--accent-gold);
        margin-bottom: 1rem;
        display: block;
      }
      h1 {
        font-family: 'Syne', sans-serif;
        font-size: 1.5rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: -0.02em;
        line-height: 1.15;
        margin-bottom: 0.75rem;
        color: var(--text-primary);
      }
      p {
        color: var(--text-muted);
        font-size: 0.875rem;
        line-height: 1.6;
        margin-bottom: 1.75rem;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      a, button {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 0.625rem 1.25rem;
        border-radius: 3px;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.15s ease;
        border: 1px solid transparent;
      }
      .primary {
        background: var(--text-primary);
        color: var(--bg-base);
      }
      .primary:hover {
        background: var(--accent-gold);
        color: var(--text-primary);
      }
      .secondary {
        background: transparent;
        color: var(--text-primary);
        border-color: var(--border-subtle);
      }
      .secondary:hover {
        border-color: var(--accent-gold);
        color: var(--accent-gold);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="code-badge">[HTTP 500 // RUNTIME_EXCEPTION]</span>
      <h1>System Exception Encountered</h1>
      <p>A fatal execution exception was captured during the current request lifecycle. You can reload this process or navigate back to the primary engineering ledger.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Reload Session</button>
        <a class="secondary" href="/">Return to Index</a>
      </div>
    </div>
  </body>
</html>`;
}
