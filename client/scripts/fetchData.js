export async function getBosses() {
  try {
    const response = await fetch("/api/bosses");
    if (!response.ok) throw new Error("Failed to fetch bosses");
    return await response.json();
  } catch (error) {
    console.error("Error fetching bosses:", error);
    return [];
  }
}

export async function getBossBySlug(slug) {
  try {
    const response = await fetch(`/api/bosses/${slug}`);
    if (!response.ok) throw new Error("Boss not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching boss:", error);
    return null;
  }
}