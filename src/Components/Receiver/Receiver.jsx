import axios from "axios";
import React, { useState, useEffect } from "react";
import "./receiver.css";
import moment from "moment";
import img from "../../Images/green.jpg"; // User image
import noMessageImg from "../../Images/no.jpg";
import { toast } from "react-toastify";

export default function Receiver({name}) {
  let [Messages, setMessages] = useState(null);

  let token = localStorage.getItem("token");
  const headers = {
    Authorization: `Ahmed ${token}`,
  };

  async function MessageList() {
    try {
      let { data } = await axios.get(
        `https://saraha-backend-pi.vercel.app/api/v1/message`,
        {
          headers: headers,
        }
      );
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        toast.success("Messages loaded successfully!");
      } else {
        toast.info("No new messages.");
      }
    } catch (error) {
      toast.error("Failed to load messages!");
    }
  }

  useEffect(() => {
    MessageList();
  }, []);

  return (
    <div className={`wrapper messages mb-5`}>
      <div className="user-image pt-5">
        <img src={img} alt="user" />
      </div>
    <h4 className="text-white pt-5">Welcome {name}</h4>
      <div className="row pt-5 d-flex justify-content-center align-items-center col-sm-11 col-md-10 col-lg-12">
        {Messages && Messages.length > 0 ? (
          Messages.map((message, index) => (
            <div className="col-md-6 col-lg-4 col-11 my-2" key={index}>
              <div
                className="card mb-3 d-flex justify-content-center shadow-lg"
                style={{ maxWidth: "540px" }}
              >
                <div className="row g-0 position-relative">
                  <div className="col-md-4">
                    <img
                      src={img}
                      className="img-fluid h-100 rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title text-muted fst-italic">
                        Unknown
                      </h5>
                      <p className="card-text">{message.messageBody}</p>
                      <div className="d-flex justify-content-between">
                        <p className="card-text mb-0">
                          <span className="text-muted">
                            {moment(message.createdAt)
                              .format("lll")
                              .replace(/,/g, "")
                              .split(" ")
                              .slice(1, 2)}
                          </span>{" "}
                          <span className="text-muted">
                            {moment(message.createdAt)
                              .format("lll")
                              .replace(/,/g, "")
                              .split(" ")
                              .slice(0, 1)}
                          </span>
                        </p>
                        <p className="card-tex p-1 mb-0 position-absolute end-0">
                          <span className="text-muted">
                            {moment(message.createdAt)
                              .format("lll")
                              .replace(/,/g, "")
                              .split(" ")
                              .slice(2, 3)}
                          </span>
                        </p>
                        <p className="card-text mb-0">
                          <span className="text-muted p-2 position-absolute top-0 end-0">
                            {moment(message.createdAt)
                              .format("lll")
                              .replace(/,/g, "")
                              .split(" ")
                              .slice(3, 5)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Show Image when no messages exist
          <div className="text-center">
            <img
              src={noMessageImg}
              alt="No messages yet"
              className="img-fluid"
              style={{ maxWidth: "400px" }}
            />
            <p className="mt-3 fs-4 text-muted">No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
