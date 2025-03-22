"use client";

import { useState, useEffect } from "react";

interface Book {
  title: string;
  author: string;
  year: string;
  genre: string;
  read: boolean;
}

const genres = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Sci-Fi", "Drama", "Comedy", "Horror"];

export default function BookCollection() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    year: "",
    genre: genres[0],
    read: false,
  });

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]") as Book[];
    setBooks(storedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addBook = () => {
    setBooks([...books, form]);
    setForm({ title: "", author: "", year: "", genre: genres[0], read: false });
  };

  const deleteBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold mb-4 text-center">📚 Book Collection Manager</h1>

      <div className="bg-amber-500 p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        >
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="read"
            checked={form.read}
            onChange={handleChange}
          />
          <span>Read</span>
        </label>
        <button
          onClick={addBook}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Add Book
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3 text-center">Your Books</h2>
        {books.length === 0 ? (
          <p className="text-gray-600 text-center">No books added yet.</p>
        ) : (
          <ul className="space-y-3">
            {books.map((book, index) => (
              <li key={index} className="bg-white p-3 rounded shadow-md flex justify-between items-center">
                <div>
                  <p className="font-semibold">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author} - {book.year} ({book.genre})</p>
                  <p className="text-xs text-green-600">{book.read ? "Read" : "Unread"}</p>
                </div>
                <button
                  onClick={() => deleteBook(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        )}
      
      </div>
      <a href="https://www.instagram.com/hooria_codehub?igsh=ZWhvMmVucm5ueHBl" className="mt-5 font-bold text-blue-800">@Hooria_Codehub</a>
    </div>
  );
}
