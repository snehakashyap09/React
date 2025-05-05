import { useState ,useEffect,useRef} from 'react'

import './App.css'

const fetchImages = async (page,signal)=>{
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=5`,
    {signal}
  )
  const data = await response.json();
  return data;
}

function App() {
 const [images,setImages] = useState([]);
 const [page,setPage] = useState(3);
 const [loading,setLoading] = useState(false);
 const observerRef = useRef(null);
 const lastImageRef = useRef(null);
 const abortControllerRef = useRef(null);


 useEffect(()=>{
  if(abortControllerRef.current){
    abortControllerRef.current?.abort();
  }

  const controller = new AbortController();
  abortControllerRef.current = controller;

  const loadImages = async ()=>{
    setLoading(true);
    const newImages = await fetchImages(page,controller?.signal);
    setImages((prev)=> [...prev,...newImages]);
    setLoading(false);
  }

  loadImages();

  return()=>{
    if(abortControllerRef.current){
      abortControllerRef.current.abort();
    }
  }

 },[page]);

 useEffect(()=>{
  observerRef.current = new IntersectionObserver(
    (entries)=>{
      if(entries[0].isIntersecting && !loading){
        setPage((prev) => prev+ 1);
      }
    },
    {threshold : 1.0}
  );

  if(lastImageRef.current){
    observerRef.current.observe(lastImageRef.current);
  }

  return ()=> observerRef.current && observerRef.current.disconnect();

 },[loading])

  return (
  <div className="min-h-screen p-6 bg-gray-900 text-white flex flex-col items-center">
   <h2 className='text-2xl font-bold mb-4'>📸 Infinite Image Gallery</h2>
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8'>
 {images.map((img,index)=>(
  <img 
  key = {img.id}
  src={img.download_url} 
  width={300}
  height={200}
  alt={img.alt_description || "Unsplash Image"} 
  className='w-full h-48 object-cover rounded-lg shadow-lg'
  ref={index === images.length - 1 ? lastImageRef : null}
  />
 ))}
   </div>
   {loading && <p className='mt-4 text-center'>🔄 Loading more...</p>}
  </div>
  )
}

export default App;
