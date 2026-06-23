import React from 'react';

function GalleryPage() {
  return (
    <div className="page-content"> {/* Added page-content class */}
      <h2>Project Gallery</h2>
      <p>This is where we will display a gallery of completed tiling projects.</p>
      <div className="gallery-grid">
        {/* Placeholder for gallery items - repeat as needed */}
        <div className="gallery-item">
          <img src="https://via.placeholder.com/300x200.png?text=Tiki+Project+1" alt="Tiling Project 1" />
          <p>Project 1 Description</p>
        </div>
        <div className="gallery-item">
          <img src="https://via.placeholder.com/300x200.png?text=Tiki+Project+2" alt="Tiling Project 2" />
          <p>Project 2 Description</p>
        </div>
        <div className="gallery-item">
          <img src="https://via.placeholder.com/300x200.png?text=Tiki+Project+3" alt="Tiling Project 3" />
          <p>Project 3 Description</p>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
