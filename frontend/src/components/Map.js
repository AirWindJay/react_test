import React, { useEffect, useState } from 'react';

const Map = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div>
      <h3>Your Location</h3>
      {location.lat && location.lng ? (
        <iframe
          title="Map"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${location.lat},${location.lng}&zoom=15`}
        />
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default Map;
