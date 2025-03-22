import NumberGuessingGame from "./component/Game"; // Corrected casing

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <NumberGuessingGame />
        <h1 className="text-3xl font-bold text-gray-800 mt-6">Hello!</h1>
        <p className="text-lg text-gray-600 mt-2">Welcome to your single application.</p>
        <p className="mt-4 text-gray-700">
          This is a fun Python project, and I also made it using Next.js! 😄
        </p>
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-700">Follow me on Instagram:</p>
          <a
            href="https://www.instagram.com/hooria_codehub?igsh=ZWhvMmVucm5ueHBl"
            className="text-blue-500 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Hooria_Codehub
          </a>
        </div>
      </div>
    </div>
  );
}
