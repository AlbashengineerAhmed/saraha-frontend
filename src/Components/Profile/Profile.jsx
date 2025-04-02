import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Profile() {
  const [details, setDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const headers = {
    Authorization: `Ahmed ${token}`,
  };

  async function fetchUserDetails() {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        { headers }
      );
      setDetails(data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle file selection
  function fileSelectedHandler(e) {
    setFile(e.target.files[0]);
  }

  // Handle file upload
  async function fileUploadHandler() {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file); 

    try {
      const response = await axios.patch(
        "http://localhost:3001/api/v1/user/profile/pic",
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );

      alert("Profile picture updated successfully!");
      setDetails((prevDetails) => ({
        ...prevDetails,
        profilePic: response.data.user.profilePic,
      }));
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.left} d-flex justify-content-center align-items-center flex-column`}
      >
        <img
          src={details?.profilePic || "https://i.imgur.com/cMy8V5j.png"}
          alt="User"
          width="100"
        />
        {details && <h2 className="mt-3 fw-bold fst-italic">{details.name}</h2>}

        <div className="d-flex">
          <input type="file" onChange={fileSelectedHandler} />
          <button
            className="btn btn-outline-success"
            onClick={fileUploadHandler}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              {details && <p className="fs-5">{details.email}</p>}
            </div>
            <div className={styles.data}>
              <h4>Phone</h4>
              {details && <p className="fs-5">{details.phone}</p>}
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <h3>Info</h3>
          <div className={styles.projects_data}>
            <div className={styles.data}>
              <h4>Age</h4>
              {details && <p className="fs-5">{details.age}</p>}
            </div>
            <div className={styles.data}>
              <h4>Gender</h4>
              {details && <p className="fs-5">{details.gender}</p>}
            </div>
          </div>
        </div>

        <div className={styles.social_media}>
          <ul>
            <li>
              <a href="www.facebook.com">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="www.twitter.com">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="http://www.instagram.com">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
