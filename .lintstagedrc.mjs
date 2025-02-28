import path from 'node:path'

function createCommand(prefix, join) {
  return (filenames) =>
    `${prefix} ${filenames.map((f) => path.relative(process.cwd(), f)).join(`${join} `)}`
}

export default {
  '*.{js,jsx,ts,tsx}': [
    createCommand('pnpm eslint --fix', ''),
    // unlock the code to enable prettier format if you use it
    // createCommand('prettier --write', '--write')
  ],
  '*.rs': [
    // Format files with rustfmt.
    'cargo fmt --manifest-path ./src-tauri/Cargo.toml -- --check',
    // Check the package for errors.
    'cargo check --manifest-path ./src-tauri/Cargo.toml --all',
    // Lint rust sources.
    'cargo clippy --manifest-path ./src-tauri/Cargo.toml --all-targets --all-features --tests --benches -- -D warnings',
  ],
}
