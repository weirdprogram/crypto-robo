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

  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          SetToken(token)
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((message) => console.log('foreground:', message));
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

          <a id="token" href="https://nextjs.org/docs" className={styles.card}>
            <h3>Tokenmu &rarr;</h3>
            <p>{Token}</p>
          </a>

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
