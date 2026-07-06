# VaultBank • WebGL 3D Banking Workspace

VaultBank Premium – React + TypeScript + Tailwind + **Three.js WebGL**

Refactor bersih dari `accountcard (1).md` (10.719 baris) → modular Vite project + background 3D interaktif.

## Fitur WebGL 3D
- `src/components/three/WebGLBackground.tsx` – Three.js via @react-three/fiber
  - ParticleField 140 points
  - BankCoin 3D MeshDistortMaterial
  - FloatingCard3D
  - OrbitControls autoRotate
  - Resize otomatis, dpr [1,2], pointer-events:none
- Terintegrasi di: LandingPage, HeroSection, Dashboard, Login, Register, Transfer

## Logika tetap IDENTIK
- useAuth, accountService, transactionService, normalizers, formatters → tidak diubah
- Endpoint: /auth/login, /accounts/me, /admin/accounts, /accounts/transfer, /accounts/deposit, /accounts/withdraw, /accounts/transactions

## Run
```bash
npm install
npm run dev
# http://localhost:5173
```

VITE_API_BASE_URL default `/api`

File monolitik asli sudah dihapus sesuai permintaan.
