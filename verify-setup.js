#!/usr/bin/env node

/**
 * Script de Verificación de Instalación
 * Ejecuta: node verify-setup.js
 * 
 * Este script verifica que todos los archivos necesarios
 * para los custom hooks CRUD estén en su lugar.
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

console.log(`\n${BLUE}╔════════════════════════════════════════════╗${RESET}`);
console.log(`${BLUE}║     Verificación de Setup - CRUD Hooks     ║${RESET}`);
console.log(`${BLUE}╚════════════════════════════════════════════╝${RESET}\n`);

const requiredFiles = [
  // API
  { path: 'api/waterApi.ts', type: 'API Config' },
  
  // Interfaces
  { path: 'interfaces/product.ts', type: 'Interface' },
  { path: 'interfaces/types.ts', type: 'Interface' },
  { path: 'interfaces/index.ts', type: 'Interface' },
  
  // Hooks
  { path: 'hooks/useInventory.ts', type: 'Hook' },
  { path: 'hooks/useMovements.ts', type: 'Hook' },
  { path: 'hooks/useLocations.ts', type: 'Hook' },
  { path: 'hooks/index.ts', type: 'Hook' },
  { path: 'hooks/HOOKS_README.md', type: 'Documentation' },
  { path: 'hooks/EXAMPLE_INVENTORY.tsx', type: 'Example' },
  { path: 'hooks/EXAMPLE_MOVEMENTS.tsx', type: 'Example' },
  { path: 'hooks/EXAMPLE_LOCATIONS.tsx', type: 'Example' },
  
  // Providers
  { path: 'providers/QueryProvider.tsx', type: 'Provider' },
  
  // Documentation
  { path: 'CRUD_GUIDE.md', type: 'Documentation' },
  { path: 'IMPLEMENTATION_SUMMARY.md', type: 'Documentation' },
];

let allGood = true;
const results = {};

console.log(`${BLUE}Verificando archivos necesarios...${RESET}\n`);

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file.path);
  const exists = fs.existsSync(filePath);
  
  if (exists) {
    console.log(`${GREEN}✓${RESET} ${file.path.padEnd(40)} [${file.type}]`);
    results[file.type] = (results[file.type] || 0) + 1;
  } else {
    console.log(`${RED}✗${RESET} ${file.path.padEnd(40)} [${file.type}] ${RED}FALTA${RESET}`);
    allGood = false;
  }
});

console.log(`\n${BLUE}─────────────────────────────────────────────${RESET}\n`);

// Verificar dependencias en package.json
console.log(`${BLUE}Verificando dependencias...${RESET}\n`);

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const requiredDeps = [
  '@tanstack/react-query',
  'axios',
  'typescript',
];

let depsOk = true;
requiredDeps.forEach((dep) => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`${GREEN}✓${RESET} ${dep} instalado`);
  } else {
    console.log(`${RED}✗${RESET} ${dep} ${RED}NO ENCONTRADO${RESET}`);
    depsOk = false;
  }
});

console.log(`\n${BLUE}─────────────────────────────────────────────${RESET}\n`);

// Resumen
console.log(`${BLUE}📊 Resumen de Verificación:${RESET}\n`);

console.log(`${GREEN}Hooks:${RESET}           ${results['Hook'] || 0}/4`);
console.log(`${GREEN}Interfaces:${RESET}      ${results['Interface'] || 0}/3`);
console.log(`${GREEN}Providers:${RESET}       ${results['Provider'] || 0}/1`);
console.log(`${GREEN}Documentación:${RESET}   ${results['Documentation'] || 0}/5`);
console.log(`${GREEN}Ejemplos:${RESET}        ${results['Example'] || 0}/3`);

console.log(`\n${BLUE}─────────────────────────────────────────────${RESET}\n`);

if (allGood && depsOk) {
  console.log(`${GREEN}✓ ¡TODO ESTÁ LISTO PARA EMPEZAR!${RESET}\n`);
  console.log(`${YELLOW}Próximos pasos:${RESET}`);
  console.log(`  1. Lee [CRUD_GUIDE.md](./CRUD_GUIDE.md)`);
  console.log(`  2. Integra los hooks en tus componentes`);
  console.log(`  3. Consulta los ejemplos en [hooks/](./hooks/)`);
  console.log(`\n${GREEN}¡Happy coding! 🚀${RESET}\n`);
  process.exit(0);
} else {
  console.log(`${RED}✗ Faltan archivos o dependencias${RESET}\n`);
  console.log(`${YELLOW}Asegúrate de:${RESET}`);
  console.log(`  1. Copiar todos los archivos al proyecto`);
  console.log(`  2. Ejecutar: npm install`);
  console.log(`  3. Verificar la estructura de carpetas`);
  console.log(`\n`);
  process.exit(1);
}
