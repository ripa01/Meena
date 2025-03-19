import Image from "next/image";
import Link from "next/link";
import { TbArrowBigRightFilled } from "react-icons/tb";
import Container from "@/components/Container";

// Define the structure of the response data
interface QuizResponse {
  randomQuestion: string;
}

// Fetch function to get a random quiz question
export async function getRandomQuizQuestion(): Promise<QuizResponse> {
  const response = await fetch(`http://localhost:3000/quiz/random`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

// Main Page component
export default async function Page() {
  try {
    const data = await getRandomQuizQuestion();

    return (
      <Container
        as="main"
        className="flex flex-col gap-5 py-5 md:flex-row-reverse md:justify-between"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="md:w-[24rem]">
            <Image src="/wallpaper.jpg" alt="Quiz Wallpaper" width={700} height={700} />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent md:bg-gradient-to-r"></div>
        </div>

        {/* Quiz Information */}
        <div className="md:w-[50%] flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">Family Guy Quiz</h1>
          <p className="text-sm leading-6 text-gray-300">
            Take this quiz to find out how much you know about the hit animated
            sitcom Family Guy. Test your knowledge of the characters, the
            episodes, and the show&apos;s many pop culture references.
          </p>

          {/* Quiz Start Button */}
          <Link
            href={`/quiz/${data.randomQuestion}`}
            className="flex items-center justify-center gap-1 px-5 py-4 font-semibold text-orange-500 transition-colors rounded-md outline duration-600 hover:bg-orange-950"
          >
            <TbArrowBigRightFilled className="text-lg" />
            Take a Quiz Now!
          </Link>
        </div>
      </Container>
    );
  } catch (error) {
    return (
      <Container as="main" className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold text-red-500">Error loading quiz</h1>
        <p className="text-gray-300">Please try again later.</p>
      </Container>
    );
  }
}
