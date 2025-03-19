// Character interface definition
interface Character {
  id: number;
  name: string;
  slug: string;
  skills: string[];
  description: string;
  age: string;
  avatar: string;
  images: string[];
  occupations: string[];
}

// Interface for the response structure
interface CharacterData {
  characters: Character[];
}

// Function to fetch all characters
export async function getAllCharacters(): Promise<CharacterData> {
  const response = await fetch("http://localhost:3000/api/characters");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json(); // TypeScript knows this returns `CharacterData`
}

// Function to fetch a character by its slug
export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/characters/${slug}`);

    if (!response.ok) {
      return null; // If the slug does not exist, return null
    }

    const character: Character = await response.json();
    return character;
  } catch (error) {
    console.error("Failed to fetch character by slug:", error);
    return null;
  }
}
