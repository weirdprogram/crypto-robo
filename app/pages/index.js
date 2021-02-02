import React, {
  useEffect,
  useState
} from 'react';
import {
  firebaseCloudMessaging
} from './notification';
import firebase from 'firebase/app';

import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [Token, SetToken] = useState('Not registered');
  const [TokenShow, SetTokenShow] = useState(false);

  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          SetToken(token)
          SetTokenShow(true)
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((payload) =>{
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon
        };
        if (!("Notification" in window)) {
          console.log("This browser does not support system notifications");
        }
        else if (Notification.permission === "granted") {
            const notification = new Notification(notificationTitle,notificationOptions);
            notification.onclick = (event) => {
                event.preventDefault();
                if(payload.notification.click_action !== undefined){
                  window.open(payload.notification.click_action , '_blank');
                }
                notification.close();
            }
        }
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Lucu-Lucuan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Robo-Robo Chan</a>
        </h1>

        <p className={styles.description}>
          Peringatan{' '}
          <code className={styles.code}>pelajari dulu apa yang ingin dilakukan</code>
        </p>

        <div className={styles.grid}>
          
          {TokenShow ?
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Tokenmu &rarr;</h3>
            <p>{Token}</p>
          </a> : null }

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Chart &rarr;</h3>
            <p>Liat-liat chart dulu.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Notification &rarr;</h3>
            <p>Alert kalau mau di ingetin.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.detik.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Baru belajar Trading
        </a>
      </footer>
    </div>
  )
}
