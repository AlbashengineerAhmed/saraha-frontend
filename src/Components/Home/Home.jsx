import React from 'react'
import styles from './home.module.css'
export default function Home() {
  return (
    <>
      <div
        className={`${styles.backgroundPhoto} d-flex flex-column justify-content-center align-items-center position-relative`}
      >
        <div
          className={`${styles.overlay} position-absolute top-0 bottom-0 end-0 start-0`}
        ></div>
        <h1 className={`${styles.index}`}>Welcome to Saraha</h1>
        <ul className={`${styles.no}`}>
          <h2 className={`${styles.move} text-white mt-4`}>Created by Ahmed</h2>
        </ul>
        <div className="d-flex justify-content-center">
          <p className={`text-center ${styles.size} text-light`}>
            With the frankly website, you can now send your frankness to your
            friend to know what people say about you and your personality
          </p>
        </div>
      </div>
    </>
  );
}
