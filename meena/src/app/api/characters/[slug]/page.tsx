import Container from "@/components/Container";
import Image from "next/image";
import { getAllCharacters } from '@/lib/characters'

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

export const dynamicParams = false;

export async function generateStaticParams() {
  const { characters }: { characters: Character[] } = await getAllCharacters();
  return characters.map(character => ({ slug: character.slug }));
}

export async function getCharacterBySlug(slug: string): Promise<{ character: Character }> {
  const data = await fetch(`http://localhost:3000/api/characters/${slug}`);

  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.json();
}

export default async function Page({ params }: PageProps) {
  const { character } = await getCharacterBySlug(params.slug);

  return (
    <Container className="flex flex-col gap-5 py-5" as="main">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold capitalize">{character.name}</h1>
        
        {/* Ensure `occupations` exists before mapping */}
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

      {/* Ensure `images` exists before mapping */}
      {character.images?.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {character.images.map((image: string) => (
            <li key={image} className="relative flex overflow-hidden bg-gray-900 rounded-xl">
              <Image
                className="transition-all duration-500 hover:scale-110 hover:rotate-2"
                src={image}
                alt={character.name}
                width={760}
                height={435}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Ensure `skills` exists before rendering */}
      {character.skills && character.skills.length > 0 && (
        <>
          <h2 className="text-xl font-bold">Power and Skills</h2>
          <ul className="flex flex-wrap gap-1">
            {character.skills.map((item: string) => (
              <li key={item} className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950">
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
