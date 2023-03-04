/* eslint-disable react/no-unescaped-entities */
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './page.module.scss';

const cx = classNames.bind(styles);

export default function Home() {
  return (<>
    <h1>Welcome</h1>
    <p>
      I am a Senior Software Engineer / Frontend Architect with over a decade
      of experience in the constantly evolving landscape of frontend development.
    </p>
    <p>
      This is my personal website, I mostly use to host presentations or demo work, so I'm afraid there's not loads here to see...
    </p>
  </>
  )
}
