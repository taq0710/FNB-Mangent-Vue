export async function loadInitialData() {
  try {
    const response = await fetch('/data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

