import sectorsData from '../data/sectors.json';

// In a real app, this would fetch data from a database
export async function getSectorsList() {
  // For simplicity, we're using a local JSON file
  // This would normally be a database call
  return sectorsData;
} 