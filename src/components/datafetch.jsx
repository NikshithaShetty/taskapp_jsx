import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Datafetch = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user data using axios from the API
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      setIsLoading(false);
      // Destructure the response with appropriate keys needed.
      const { name, email } = response.data.results[0];
      setUserData({ name, email });

       // Save the user data to local storage
      localStorage.setItem('userData', JSON.stringify({ name, email }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } 
  };

  useEffect(() => {
     // Check if user data exists in local storage
    const cachedUserData = localStorage.getItem('userData');
    if (cachedUserData) {
      //JSON String to JavaScript Object
      setUserData(JSON.parse(cachedUserData));
      setIsLoading(false);
    } else {
        // If no data in local storage, fetch from API
      fetchUserData();
    }
  }, []);

  // Function to refresh user data
 const refreshData = () => {
    setIsLoading(true);
    fetchUserData();
  };

  return (
    <div >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <> <h2>User Information</h2>
          <p>Full Name:  {userData.name.title} {userData.name.first}{userData.name.last}</p>
          <p>Email: {userData.email}</p>
          <button onClick={refreshData}>Refresh</button>
        </>
      )}
    </div>
  );
};

export default Datafetch;