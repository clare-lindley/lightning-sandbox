import React from 'react';
import useFetchImageData from './ooks/useFetchImageData';

// I know it should be a single Image component don't @ me
export default function Images({ onImageClick }) {
 const { data, isLoading, error } = useFetchImageData()

 if (isLoading) {
    return <div>Loading...</div>;
 }

 if (error) {
    return <div>Error: {error.message}</div>;
 }

 return (
    <div>
        {data.length > 0 && (
            data.map((item, index) => <img style={{cursor:'pointer', margin: '5px'}} onClick={onImageClick} width="20%" height="20%" key={index} src={item} alt={`${index}`} />)
        )}
    </div>
 );
};
