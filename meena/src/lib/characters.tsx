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
  
  export async function getAllCharacters(): Promise<CharacterData> {
    const response = await fetch("http://localhost:3000/api/characters");
  
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return response.json(); // TypeScript now knows this returns `CharacterData`
  }