import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

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

async function getAllCharacters(): Promise<CharacterData> {
  const response = await fetch("http://localhost:3000/api/characters");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json(); // TypeScript now knows this returns `CharacterData`
}

export default async function Page() {
  const { characters } = await getAllCharacters();

  return (
    <main>
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
        {characters?.map((item) => {
          return (
            <Link
              href={`/characters/${item.slug}`}
              key={item.id} // Use `id` as key for uniqueness
              className="overflow-hidden rounded-md"
            >
              <Image
                src={`/characters/${item.avatar}`}
                alt={item.name}
                className="w-40 h-40 rounded-full object-cover transition-all duration-500 hover:scale-110 hover:-rotate-2"
                width={300}
                height={300}
              />
            </Link>
          );
        })}
      </Container>
    </main>
  );
}
