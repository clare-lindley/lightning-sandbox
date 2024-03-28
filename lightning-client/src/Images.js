import React from 'react';
import useFetchImageData from './ooks/useFetchImageData';

export default function Images() {
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
            data.map((item, index) => <img width="20%" height="20%" key={index} src={item} alt={`Image ${index}`} />)
        )}
    </div>
 );
};
