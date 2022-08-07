/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_liveBlocksPublicKey: string
  readonly VITE_liveBlocksPrivateKey: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
