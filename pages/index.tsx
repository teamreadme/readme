import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/auth/login">Login</Link>
    </div>
  );
};

export default Home;
