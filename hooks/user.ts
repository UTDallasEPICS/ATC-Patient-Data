import {useState, useEffect} from "react";
export const useUserInformation = () => {  
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {  
        // TODO: check cookies to see if we have user info cached
        // otherwise, load from network
        // we only need stuff for controlling UI stuff
        // API still needs to perform validation
        const response = await fetch("/api/user");  
        const data = await response.json()
        setUser(data)
      } catch (error) {  
        console.error("Error retrieving user information:", error);  
        return null;  
      } 
    }
    getUser()
  })
  return user;  
};  