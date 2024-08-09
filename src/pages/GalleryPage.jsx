import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader } from '@nextui-org/react';
import CardComponent from '../components/CardComponent';
import { fetchImages } from '../gallerySlice';

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { images, status, error } = useSelector((state) => state.gallery);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <>
      <Card className="max-w-full texture lg:px-24" radius='none'>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-2xl pb-3">Images Gallery </p>
            <p className="text-small text-default-500">Omni-Zero: A diffusion pipeline for zero-shot stylized portrait creation.</p>
          </div>
        </CardHeader>
      </Card>

      <div className='grid justify-center gap-y-6 mx-auto lg:grid-cols-4 lg:px-20 py-10'>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && images && images.length > 0 ? (
          images.map(image => (
            <CardComponent key={image.id} image={image} getAllImage={() => dispatch(fetchImages())} />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </>
  );
};

export default GalleryPage;