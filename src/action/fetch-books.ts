import { BookRepository } from './../repository/book.repository';
import { db } from '../db/db';

const bookRepo = new BookRepository(db);

export async function fetchBooks(
  search: string,
  limit: number,
  offset: number
) {
  try {
    const books = await bookRepo.list({
      search: search,
      limit: limit,
      offset: offset,
    });
    if (books) {
      console.log("Received books");
      return books;
    } else {
      console.log("Books not received");
    }
  } catch (error) {
    console.error("Error handling book request:", error);
  }
}
  
