import Header from "@/components/Header/Header";
import classNames from "classnames/bind";
import Link from "next/link";
import React from "react"


import styles from "./MainLayout.module.scss"
const cx = classNames.bind(styles);

const MainLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
        <div className={cx('wrapper')}>
        <Header>
            <h1 style={{ margin: 0 }}>
                <Link
                href="/"
                style={{
                    textDecoration: `none`,
                }}
                >
                Peter Lenagh
                </Link>
            </h1>
        </Header>
        <div className={cx('main-wrapper')}>
          <main className={cx('main')}>{children}</main>
        </div>

        <footer className={cx('footer')}>
          <div className={cx('footer-contents')}>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.nextjs.org">Next.js</a>.
          </div>
        </footer>
      </div>
    </>
  )
}

export default MainLayout
