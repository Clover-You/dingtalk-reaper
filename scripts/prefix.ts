const isProd = process.env.NODE_ENV === 'production'

const internalHost = process.env.TAURI_DEV_HOST || 'localhost'

export async function getAssetPrefix() {
  return isProd ? undefined : `http://${internalHost}:3000`
}
