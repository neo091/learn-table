# Onboarding técnico de Learn Table

Esta guía resume cómo está organizada la base de código y qué conviene aprender primero.

## 1) Arquitectura general

- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4 + componentes tipo shadcn/radix.
- **Entrada de la app:** `src/main.tsx` monta `<App />` dentro de `<GameProvider />`.
- **Navegación principal:** `src/App.tsx` renderiza pantallas por estado (`currentMode`) en vez de rutas.

## 2) Estructura de carpetas

### `src/context`

- `GameProvider.tsx`: estado global del juego y persistencia en `localStorage` (`gameState`).
- `GameReducer.ts`: transición de estado con acciones:
  - `SET_MODE`
  - `LEVEL_UP`
  - `RESET_MODE`
- `useGame.ts`: hook de acceso al contexto.

### `src/components`

- `MenuPrincipal.tsx`: menú de modos y control de bloqueos.
- `MenuTablas.tsx`: selección de tabla según nivel alcanzado.
- `Tabla.tsx`: juego de tablas (10 preguntas), confetti y modal de resultado.
- `AdditionMode.tsx` / `MultiplicationMode.tsx`: modos con lógica muy parecida.
- `GameResultModal.tsx`: modal reutilizable de feedback.
- `components/ui/*`: primitives de UI reutilizables.

### `src/lib`

- `gameEngine.ts`: generación de preguntas y opciones.
- `unlockRules.ts`: reglas para desbloquear modos.
- `utils.ts`: helper de clases (`cn`).

### `src/types`

- `game.ts`: tipos de `GameMode`, `Progress`, `GameState`.

## 3) Conceptos clave para personas nuevas

1. **Flujo central de estado:**
   - La app depende de `GameProvider` + `GameReducer`.
   - Cualquier cambio de progresión/desbloqueo suele tocar reducer + reglas.

2. **Persistencia automática:**
   - El estado completo se guarda en `localStorage` en cada cambio.
   - Si hay comportamientos extraños durante pruebas, limpiar `localStorage` ayuda.

3. **Reglas de desbloqueo desacopladas de la UI:**
   - `MenuPrincipal` consulta `isModeUnlocked`, no reimplementa lógica de negocio.

4. **Motor de preguntas compartido:**
   - Conviene extender `gameEngine.ts` antes que duplicar lógica en componentes.

## 4) Qué aprender después (ruta recomendada)

### Paso 1 (rápido): seguir un flujo end-to-end

- Entrar desde `MenuPrincipal`.
- Responder en un modo.
- Ver cuándo ocurre `LEVEL_UP`.
- Confirmar persistencia en `localStorage`.

### Paso 2 (intermedio): detectar y reducir duplicación

- Comparar `AdditionMode.tsx` y `MultiplicationMode.tsx`.
- Proponer un componente base de quiz (por ejemplo, `QuizMode`) para compartir layout y ciclo de preguntas.

### Paso 3 (calidad): agregar pruebas

- Añadir tests unitarios de:
  - `GameReducer` (transiciones de estado).
  - `gameEngine` (generación de opciones/preguntas).
- Actualmente no hay script `test` en `package.json`, así que esto sería una mejora importante de mantenibilidad.

## 5) Convenciones prácticas para contribuir

- Usar alias `@` para imports desde `src`.
- Mantener reglas de negocio en `lib/` o `context/`, no embebidas en la vista.
- Antes de abrir PR:
  - `npm run lint`
  - `npm run build`

