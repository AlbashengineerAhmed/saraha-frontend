import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./sender.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function Sender({ id, name }) {
  const { id:urlId, userName } = useParams(); // Get ID and Name from URL
  const user = name || (userName ? decodeURIComponent(userName) : "Anonymous");
  const [message, setMessage] = useState(null);
  const [isLinkVisible, setIsLinkVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [notification, setNotification] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://saraha-backend-pi.vercel.app/api/v1/message/${urlId}`,
        { messageBody: messageContent }
      );
      setMessage(data);      
      if (data?.message === 'Done') {
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      toast.error("Failed to send message!");
    }
    setTimeout(() => setMessage(null), 2000);
    setMessageContent("");
  }

  function handleChange(e) {
    setMessageContent(e.target.value);
  }

  function showLink() {
    setIsLinkVisible(true);
  }

  function copyToClipboard() {
    const url = `${window.location.origin}/sender/${id}/${encodeURIComponent(
      user
    )}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setNotification("Link copied to clipboard!");
    setTimeout(() => {
      setNotification("");
      setIsCopied(false);
    }, 3000);
  }

  function closeLinkCard() {
    setIsLinkVisible(false);
  }

  return (
    <div className={`${styles.wrapper} mt-5`}>
      {isLinkVisible && (
        <div className={styles.modelLink}>
          <p className={styles.linkText}>
            {window.location.origin}/sender/{id}/{encodeURIComponent(user)}
          </p>
          <button onClick={closeLinkCard} className={styles.closeButton}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          {!isCopied && (
            <button onClick={copyToClipboard} className={styles.copyButton}>
              Copy Link
            </button>
          )}
        </div>
      )}

      {notification && (
        <div className="alert alert-info text-center mt-2">{notification}</div>
      )}

      <p className="text-center fw-bold fs-4 text-secondary">
        Express or write your opinion about your friend{" "}
        <span className="text-white">{user}</span>
      </p>

      {/* {message && (
        <div className="alert alert-success text-center">{message.message}</div>
      )} */}

      <form className="col-lg-6 col-12" onSubmit={sendMessage}>
        <textarea
          className="border bg-transparent w-100 h-100 fs-4 rounded-3 form-control text-white"
          onChange={handleChange}
          value={messageContent}
          rows="5"
          placeholder="Tell me about myself."
        ></textarea>

        <div className="d-flex justify-content-end mt-3">
          {id?<button
            onClick={showLink}
            className="btn btn-outline-danger me-3"
            type="button"
          >
            <i className="fa-solid fa-share-nodes"></i> Share
          </button>:""}

          <button type="submit" className="btn btn-outline-success px-5">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
