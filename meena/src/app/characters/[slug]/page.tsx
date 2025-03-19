import Container from "@/components/Container";
import Image from "next/image";
import { getAllCharacters, getCharacterBySlug } from '@/lib/characters'

interface Character {
  slug: string;
  name: string;
  occupations: string[];
  description: string;
  images: string[];
  skills?: string[];
}

interface PageProps {
  params: { slug: string };
}

interface CharacterResponse {
  character: Character | null;  // Character is wrapped inside this 'character' property
}

export const dynamicParams = false;

// Generate static paths for characters
export async function generateStaticParams() {
  const { characters }: { characters: Character[] } = await getAllCharacters();
  return characters.map(character => ({ slug: character.slug }));
}

// Page component
export default async function Page({ params }: PageProps) {
  const { slug } = params;  // Destructure slug directly from params

  // Fetch character data using the slug from params
  const data : CharacterResponse = await getCharacterBySlug(slug);

  // If no character data is found, show a message
  if (!data || !data.character) {
    return <div className="text-center text-red-500">Character not found.</div>;
  }

  const character = data.character;  // Destructure character correctly

  // Render character information
  return (
    <Container className="flex flex-col bg-green-900 gap-5 py-5" as="main">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{character.name}</h1>
        
        {character.occupations?.length > 0 && (
          <ul className="flex flex-wrap gap-1 text-sm">
            {character.occupations.map((item: string) => (
              <li key={item} className="p-2 text-gray-300 bg-gray-800 rounded-md">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-sm leading-6">{character.description}</p>

      {character.images?.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {character.images.map((image: string, index: number) => (
            <li key={index} className="relative flex overflow-hidden bg-gray-900 rounded-xl">
              <Image
                className="transition-all duration-500 hover:scale-110 hover:rotate-2"
                src={`/images/${image}`}  // Assuming the images are stored in the public/images folder
                alt={character.name}
                width={760}
                height={435}
              />
            </li>
          ))}
        </ul>
      )}

      {character.skills && character.skills.length > 0 && (
        <>
          <h2 className="text-xl font-bold">Power and Skills</h2>
          <ul className="flex flex-wrap gap-1">
            {character.skills.map((item: string, index: number) => (
              <li key={index} className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
