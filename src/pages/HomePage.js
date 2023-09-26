import React, { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Modal from "react-modal";
import "../Home.css";
import axios from 'axios';


const HomePage = () => {
 

  let { user } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: user.username,
    bio: "No bio",
    profile_image: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const [fetchProfileData, setFetchProfileData] = useState(true);





  // Function to handle image update
  const handleImageUpdate = (e) => {
    const file = e.target.files[0]; // Get the selected image file
    setImageFile(file);
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("bio", userData.bio);
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }
  
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update_user_profile/${user.user_id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 200) {
        // Profile updated successfully
        alert("Profile updated successfully");
        console.log('-------responsedata---------',response.data);
        // Fetch the updated user data and set it in state
        const { bio, profile_image } = response.data;
        // setFetchProfileData(true);
        setUserData({
          ...userData,
          bio,
          profile_image,
        });
  
        // Close the modal
        setIsModalOpen(false);
      }
      console.log('dddddddddddddd',userData);
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Failed to update profile");
    }
  
    console.log("immmmmmmmmmmmmmmag", userData.profile_image);
  };





  useEffect(() => {
 
    console.log("useEffect is triggered");
    // Fetch user profile data based on user ID
    const fetchUserProfile = async () => {
      try {
        // console.log("Fetching user profile...");
        // const response = await axios.get(
        //   `http://127.0.0.1:8000/get_user_profile/${user.user_id}/`
        const response = await axios.get(
          `http://127.0.0.1:8000/api/get_user_profile/${user.user_id}/`,
        );
        
        if (response.status === 200) {
          console.log("Profile data retrieved successfully:", response.data);
          const { username, bio, profile_image } = response.data;
          
            setUserData({
              username,
              bio,
              profile_image,
            });
           console.log("pppppppppppppppppppppppp",userData)
          
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, [user.user_id,]);


  return (
    <div>
      <ul className="nav">
        <li>
          <h3>{userData.username}</h3>
        </li>
        <li>
          <h3>
            {userData.bio ? (
              <p className="py-6">{userData.bio}</p>
            ) : (
              <p>Update your bio</p>
            )}
          </h3>
        </li>
        <li className="image-container">
          {userData.profile_image ? (
            <img className="resize-image" src={`${'http://127.0.0.1:8000/'+userData.profile_image}`} />
          ) : (
            <p>no image</p>
          )}
        </li>
      </ul>

      <button className="btnclick" onClick={() => setIsModalOpen(true)}>
        Update Profile
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update Profile Modal"
      >
        <h2>Update Profile</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              name="bio"
              placeholder="Enter your bio"
              className="textarea textarea-bordered"
              value={userData.bio}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="profile_image">Image:</label>
            <input
              type="file"
              name="profile_image"
              onChange={handleImageUpdate}
            />
          </div>
          <button type="submit">Update Image</button>
        </form>

        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default HomePage;
