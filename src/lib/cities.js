import fs from 'fs';
import path from 'path';

// Function to get all cities
export function getCities() {
  const filePath = path.join(process.cwd(), 'src/data', 'cities.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

// Function to get a specific city by slug
export function getCity(slug) {
  const cities = getCities();
  return cities.find(city => city.slug === slug);
}