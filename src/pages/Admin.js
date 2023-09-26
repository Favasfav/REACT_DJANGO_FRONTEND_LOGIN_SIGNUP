import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import '../Admin.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Modal from "react-modal";

// Configure react-modal for accessibility
Modal.setAppElement("#root");

function Admin() {
    const { user } = useContext(AuthContext);
    const [userlist, setUserlist] = useState([]);
    const [editUser, setEditUser] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
        username: "",
        // Add more fields as needed
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:8000/api/get_usertodelete/${id}`,
            );

            if (response.status === 204) {
                setUserlist(userlist.filter((user) => user.id !== id));
                return Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            }
        } catch {
            alert('Failed to delete user');
        }
    };

    const openEditModal = (user) => {
        setEditUser(user);
        setEditedUserData({
            username: user.username,
           
        });
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setEditUser(null);
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({
            ...editedUserData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a PUT request to update the user data with editedUserData
            await axios.put(
                // `http://127.0.0.1:8000/api/update_user/${editUser.id}`,
                // editedUserData
                `http://127.0.0.1:8000/api/update_user/${editUser.id}/`

            );

            // Update the userlist with the updated data
            const updatedUserList = userlist.map((user) => {
                if (user.id === editUser.id) {
                    return {
                        ...user,
                        ...editedUserData,
                    };
                }
                return user;
            });

            setUserlist(updatedUserList);

            Swal.fire({
                title: 'Success',
                text: 'User data updated successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            closeEditModal();
        } catch (error) {
            // Handle errors here
            console.error('Error updating user data:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/get_userlist`,
                );

                if (response.status === 200) {
                    setUserlist(response.data);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [user.user_id]);

    return (
        <div className="user-list">
            {userlist.map((user, index) => (
                <div className="user-card" key={index}>
                    <img className="user-photo" src={`http://127.0.0.1:8000/${user.profile_image}`} />
                    <h2 className="user-name">{user.username}</h2>
                    <button type="button" className="btn btn-primary" onClick={() => openEditModal(user)}>Edit</button>
                    <button type="button" onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                </div>
            ))}

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeEditModal}
                    contentLabel="Edit User Modal"
                >
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={editedUserData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* Add more form fields for other user data */}
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Admin;
