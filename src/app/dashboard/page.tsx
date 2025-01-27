import React from 'react'
import { fetchBooks } from '../../action/fetch-books'
import BookCard  from '../../components/dashboard/book-card'
import {SearchBar} from "../../components/dashboard/searchbar"
import PaginationControls from '../../components/pagination'

//TODO: error handling

async function HomePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}){

  const query: string = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 6;
  const offset = (Number(currentPage) - 1) * limit;

  const booksResponse = await fetchBooks(query,limit,offset);
  const booksList=booksResponse?.items
  const totalBooks=Number(booksResponse?.pagination.total);
  console.log(totalBooks)
  

  return (
    <div className="flex flex-col gap-2">
    <div className="mb-6">
            <SearchBar />
          </div>
    <div className="grid grid-cols-3 gap-3">
    {totalBooks! > 0 ? (
          booksList!.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              availableCopies={book.availableCopies}
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-black">No books found for `{query}`</p>
        )}
    </div>
    {totalBooks! > 0 ? (<PaginationControls 
         totalBooks={totalBooks}
         limit={limit}
      />):<></>}
    </div>
  )
}

export default  HomePage ;