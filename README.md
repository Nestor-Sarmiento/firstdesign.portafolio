# Portafolio · Néstor Sarmiento

Portafolio digital construido con React, TypeScript y Vite a partir del CV de Néstor Sarmiento, diseñado siguiendo las 10 heurísticas de usabilidad de Jakob Nielsen.

## Ejecutar

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
```

## Dónde editar el contenido

Todo el contenido del CV vive en `src/data/cv.ts`, y la explicación de cada heurística en `src/data/heuristics.ts`. Los componentes de `src/components/` solo leen esos datos.
