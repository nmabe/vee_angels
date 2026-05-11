import React, { useState } from 'react'
import getDistance from 'geolib/es/getDistance';

export default function Distance({ address }) {
  const [address1, setAddress1] = useState({ latitude: '', longitude: '' })
  const [address2, setAddress2] = useState({
    street: address.street || '',
    city: address.city || '',
    country: 'South Africa',
    postalCode: '',
  });
  const [distance, setDistance] = useState(null)
  const [loading, setLoading] = useState(false)

  const geoCodeAddress = async (address) => {

    setLoading(true)
    const params = new URLSearchParams({
      ...address,
      format: 'json',
      addressdetails: 1,
    });

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params.toString(params)}`,
      {
        headers: {
          'User-Agent': 'VeeAngels/1.0'
        }
      }
    )



    const data = await res.json()
      if (data.length > 0) {
      setLoading(false)
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      }
    } else {
      setLoading(false)
      throw new Error('Address not found')
    }
  }

  const calculateDistance = async () => {
    try {
      setLoading(true)

     // const coords1 = await geoCodeAddress(address1);
      const coords2 = await geoCodeAddress(address2);
      console.log('Coordinates 2:', coords2);
      console.log('Coordinates 1:', address1);
      const dist = getDistance(address1, coords2, 1) / 1000; // Convert to km
      setDistance(dist.toFixed(2))
      console.log('Calculated distance: ', dist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress2((prev) => ({ ...prev, [name]: value }));
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setAddress1({ latitude, longitude })
        },
        (error) => {
          alert('Unable to retrieve your location')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser')
    }
  };


  useState(() => {
    if (navigator.geolocation) {
      getCurrentLocation()
    }
  }, [])

    useState(() => {
      calculateDistance();
  }, [])

  return (
    <div>
        {distance && <h3 className='p-0 m-0 text-s '> {distance} km away</h3>}
    </div>
  )
}
