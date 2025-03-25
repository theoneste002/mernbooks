// import React, { useState } from 'react'
// import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
// import { Link } from "react-router-dom";


// const UploadBook = () => {
//   const bookCategories = [
//     "Fiction",
//     "Non-Fiction",
//     "Mistery",
//     "Programming",
//     "Science Fiction",
//     "Fantasy",
//     "Horror",
//     "Bibliography",
//     "Autobiography",
//     "History",
//     "Self-Help",
//     "Memoir",
//     "Business",
//     "Children Books",
//     "Travel",
//     "Religion",
//     "Art and design"
//   ]
//   const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

//   const handleChangeSelectedVlue = (event) => {
//     console.log(event.target.value);
//     setSelectedBookCategory(event.target.value);
//   }

//   // handle book submission
//   const handleBookSubmit = (event) => {
//         event.preventDefault();
//         const from = event.target;

//         const bookTitle = from.bookTitle.value;
//         const authorName = from.authorName.value;
//         const URL = from.URL.value;
//         const category = from.categoryName.value;
//         const bookDescription = from.bookDescription.value;
//         const bookPDFURL = from.bookPDFURL.value;
        
//         const bookObj = {
//           bookTitle, authorName, URL, category, bookDescription, bookPDFURL
//         }
//         console.log(bookObj);

//         // send data to db

//         fetch("https://setu-mern-server.onrender.com", {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(bookObj)
//         }).then(res => res.json()).then(data => {
//          // console.log(data)
//          alert("Book uploaded successfully!!!");
//          from.reset();
//         });
//   }
//   return (
//     <div className='px-4 my-12'>
//       <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

//       <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
//         {/* first row */}
//       <div className='flex gap-8'>
//       <div className='lg:w-1/2'>
//         <div className="mb-2 block">
//           <Label htmlFor="bookTitle" value="Book Title" />
//         </div>
//         <TextInput id="bookTitle" 
//         name='bookTitle'
//         type="text"
//          placeholder="Book name" required shadow />
//       </div>
//       <div className='lg:w-1/2'>
//         <div className="mb-2 block">
//           <Label htmlFor="authorName" value="Author Name" />
//         </div>
//         <TextInput id="authorName" 
//         name='authorName'
//         type="text"
//          placeholder="Author Name" required shadow />
//       </div>
//       </div>
//       {/* second row */}
//       <div className='flex gap-8'>
//       <div className='lg:w-1/2'>
//         <div className="mb-2 block">
//           <Label htmlFor="URL" value="Book image URL" />
//         </div>
//         <TextInput id="URL" 
//         name='URL'
//         type="text"
//          placeholder="Book image URL" required shadow />
//       </div>
//       {/* category */}
//       <div className='lg:w-1/2'>
//       <div className="mb-2 block">
//           <Label htmlFor="inputState" value="Book Category" />
//         </div>

//         <select id='inputState' name='categoryName' className='w-full rounded'
//          value={selectedBookCategory} onChange={handleChangeSelectedVlue}>,
//           {
//             bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
//           }

//         </select>
//       </div>
//       </div>

//       {/* bookDescription */}
     
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="bookDescription"
//            value="Book Description" />
//         </div>
//         <Textarea 
//        id="bookDescription" 
//         name='bookDescription'
//         placeholder="Write your book description.." 
//         required 
//         className='w-full'
//         rows={6} />
        
//       </div>

//       {/* book bdn link */}
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="bookPDFURL" 
//           value="Book PDF URL" />
//         </div>
//         <TextInput
//          id="bookPDFURL" 
//          name='bookPDFURL'
//          type="text"
//           placeholder="book pdf url" 
//           required shadow />
//       </div>
//       <Button 
//       type="submit" className='mt-5'>
//         Upload Book
//         </Button>
     
//     </form>
//     </div>
//   )
// }

// export default UploadBook



import React, { useState } from 'react';
import { Button, Label, Textarea, TextInput } from "flowbite-react";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-Help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and design"
  ];
  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  // handle book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const URL = form.URL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      bookTitle, authorName, URL, category, bookDescription, bookPDFURL
    };
    console.log(bookObj);

    // send data to db
    fetch("https://setu-mern-server.onrender.com/upload-book", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookObj)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        alert("Book uploaded successfully!!!");
        form.reset();
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle" 
              name='bookTitle'
              type="text"
              placeholder="Book name" required shadow />
          </div>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput id="authorName" 
              name='authorName'
              type="text"
              placeholder="Author Name" required shadow />
          </div>
        </div>
        {/* second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="URL" value="Book image URL" />
            </div>
            <TextInput id="URL" 
              name='URL'
              type="text"
              placeholder="Book image URL" required shadow />
          </div>
          {/* category */}
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

        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea 
            id="bookDescription" 
            name='bookDescription'
            placeholder="Write your book description.." 
            required 
            className='w-full'
            rows={6} />
        </div>

        {/* book PDF link */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput
            id="bookPDFURL" 
            name='bookPDFURL'
            type="text"
            placeholder="Book PDF URL" 
            required shadow />
        </div>
        <Button type="submit" className='mt-5'>
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;