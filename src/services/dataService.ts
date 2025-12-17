export async function loadInitialData(): Promise<any> {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
}
