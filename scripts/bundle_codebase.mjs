import fs from 'fs';
import path from 'path';

const files = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  '.env.example',
  'metadata.json',
  'server.ts',
  'src/types.ts',
  'src/main.tsx',
  'src/index.css',
  'src/App.tsx',
  'src/data/translations.ts',
  'src/data/gujaratArtisansDataset.ts',
  'src/data/allIndiaCraftDataset.ts',
  'src/data/globalCraftDataset.ts',
  'src/data/marketData.ts',
  'src/data/hackathonData.ts',
  'src/data/rawDocuments.ts',
  'src/components/Navbar.tsx',
  'src/components/GujaratArtisansPortalView.tsx',
  'src/components/AllIndiaCraftDatasetView.tsx',
  'src/components/ModelTrainingView.tsx',
  'src/components/PrototypeView.tsx',
  'src/components/ProblemMarketView.tsx',
  'src/components/QuickReferenceView.tsx',
  'src/components/GlobalCraftDatasetView.tsx',
  'src/components/HackathonRoadmapView.tsx',
  'src/components/PitchGuideView.tsx'
];

let doc = '# SrijanSetu: Complete Project Codebase (Indian Heritage & Gujarat Artisans AI Platform)\n\n';
doc += 'This file contains the complete source code of all files in this project in one place.\n\n';
doc += '## Table of Contents\n\n';

files.forEach((f, idx) => {
  const anchor = f.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  doc += `${idx + 1}. [${f}](#${anchor})\n`;
});

doc += '\n---\n\n';

for (const file of files) {
  const fullPath = path.resolve(file);
  if (fs.existsSync(fullPath)) {
    const ext = path.extname(file).replace('.', '');
    const lang = (ext === 'tsx' || ext === 'ts') ? 'typescript' : ext === 'json' ? 'json' : ext === 'html' ? 'html' : ext === 'css' ? 'css' : 'text';
    const content = fs.readFileSync(fullPath, 'utf8');
    doc += `## ${file}\n\n`;
    doc += '```' + lang + '\n';
    doc += content;
    if (!content.endsWith('\n')) doc += '\n';
    doc += '```\n\n---\n\n';
  }
}

fs.writeFileSync('CONSOLIDATED_CODEBASE.md', doc, 'utf8');
console.log('Successfully written CONSOLIDATED_CODEBASE.md. Total size: ' + fs.statSync('CONSOLIDATED_CODEBASE.md').size + ' bytes');
