import React, { useState } from 'react';
import { use } from 'react';

function PicGallery() {
 const [displayedPic, setDisplayedPic] = useState('')

const Pics = [
        'https://pixabay.com/photos/george-peabody-library-1629308/',
        'https://pixabay.com/photos/books-library-bookstore-study-7744938/',
        'https://pixabay.com/photos/library-library-of-congress-loc-74038/',
        'https://pixabay.com/photos/bodleian-library-oxford-university-4974735/'
    ]
    
    
  return (
    <div>
        
        <img>{displayedPic}</img>

        <button type='button'>previous</button>
        <button type='button'>next</button>
      <hr/>
    </div>
  );
}

// Code not completed
export default PicGallery;