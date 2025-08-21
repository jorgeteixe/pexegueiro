import { useState, useEffect } from 'react'

interface OptimizedImage {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
  thumbnail: string
}

interface ImageCarouselClientProps {
  images: OptimizedImage[]
  alt: string
}

const ImageCarouselClient = ({ images, alt }: ImageCarouselClientProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Use provided optimized images or fallback to placeholders
  const displayImages = images.length > 0 ? images : [
    {
      src: 'https://via.placeholder.com/800x600/6b7280/ffffff?text=Mill+Photo+1',
      width: 800,
      height: 600,
      alt: `${alt} - Imaxe 1`,
      thumbnail: 'https://via.placeholder.com/200x150/6b7280/ffffff?text=1'
    },
    {
      src: 'https://via.placeholder.com/800x600/6b7280/ffffff?text=Mill+Photo+2', 
      width: 800,
      height: 600,
      alt: `${alt} - Imaxe 2`,
      thumbnail: 'https://via.placeholder.com/200x150/6b7280/ffffff?text=2'
    },
    {
      src: 'https://via.placeholder.com/800x600/6b7280/ffffff?text=Mill+Photo+3',
      width: 800,
      height: 600,
      alt: `${alt} - Imaxe 3`,
      thumbnail: 'https://via.placeholder.com/200x150/6b7280/ffffff?text=3'
    }
  ]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isModalOpen) return
    
    switch(e.key) {
      case 'Escape':
        closeModal()
        break
      case 'ArrowLeft':
        prevImage()
        break
      case 'ArrowRight':
        nextImage()
        break
    }
  }

  useEffect(() => {
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const currentImage = displayImages[currentIndex]

  return (
    <>
      {/* Main Carousel */}
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <div className="aspect-video relative">
          <img
            src={currentImage.src}
            srcSet={currentImage.srcSet}
            alt={currentImage.alt}
            width={currentImage.width}
            height={currentImage.height}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openModal}
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          />
          
          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Imaxe anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                aria-label="Seguinte imaxe"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Zoom Indicator */}
          <button
            onClick={openModal}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-2 py-1 rounded-md text-sm transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            Ampliar
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>
        
        {/* Thumbnail Navigation */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <img
                  src={image.thumbnail}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/90"
          onClick={closeModal}
          style={{ zIndex: 10000 }}
        >
          <div 
            className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              aria-label="Pechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Modal Image */}
            <img
              src={currentImage.src}
              srcSet={currentImage.srcSet}
              alt={currentImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              sizes="100vw"
            />
            
            {/* Modal Navigation */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                  aria-label="Imaxe anterior"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                  aria-label="Seguinte imaxe"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Modal Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} de {displayImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageCarouselClient