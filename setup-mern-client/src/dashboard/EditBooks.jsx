import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Label, Textarea, TextInput } from "flowbite-react";

const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorName, URL, category, bookDescription, bookPDF } = useLoaderData();

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mistery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Bibliography", "Autobiography", "History",
    "Self-Help", "Memoir", "Business", "Children Books", "Travel",
    "Religion", "Art and design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category || bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  // Handle book submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const URL = form.URL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDF = form.bookPDFURL.value;

    const updateBookObj = { bookTitle, authorName, URL, category, bookDescription, bookPDF };

    // Update the book data
    fetch(`https://setu-mern-server.onrender.com/update-book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBookObj)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        alert("Book is updated successfully!!!");
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book Data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" name='bookTitle' type="text"
              defaultValue={bookTitle} placeholder="Book name" required shadow />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" name='authorName' type="text"
              defaultValue={authorName} placeholder="Author Name" required shadow />
          </div>
        </div>

        {/* Second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="URL" value="Book Image URL" />
            </div>
            <TextInput id="URL" name='URL' type="text"
              placeholder="Book image URL" defaultValue={URL} required shadow />
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <select id='inputState' name='categoryName' className='w-full rounded'
              value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" name='bookDescription'
            placeholder="Write your book description.." required defaultValue={bookDescription}
            className='w-full' rows={6} />
        </div>

        {/* Book PDF Link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput id="bookPDFURL" name='bookPDFURL' type="text"
            placeholder="Book PDF URL" defaultValue={bookPDF} required shadow />
        </div>

        <Button type="submit" className='mt-5'>
          Update Book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;