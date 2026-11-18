import { mkdir, writeFile } from 'node:fs/promises';
import { setDefaultResultOrder } from 'node:dns';

setDefaultResultOrder('ipv4first');

const images = {
  'coffee-moment.jpg': ['photo-1442512595331-e89e73853f31', 2200],
  'cafe-space.jpg': ['photo-1501339847302-ac426a4a7cbb', 1200],
  'coffee.jpg': ['photo-1509042239860-f550ce710b93', 1000],
  'pastry.jpg': ['photo-1555507036-ab1f4038808a', 1000],
  'brunch.jpg': ['photo-1525351484163-7529414344d8', 1000],
};

await mkdir(new URL('../public/images/', import.meta.url), { recursive: true });
await Promise.all(Object.entries(images).map(async ([name, [id, width]]) => {
  const response = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`);
  if (!response.ok) throw new Error(`Image ${name}: ${response.status}`);
  await writeFile(new URL(`../public/images/${name}`, import.meta.url), Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${name}`);
}));
