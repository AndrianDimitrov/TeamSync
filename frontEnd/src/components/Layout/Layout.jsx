import { Link, NavLink } from 'react-router-dom';

import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <nav className={classes.nav}>
        <div className={classes['nav__left-section']}>
          <ul className={classes['nav__list']}>
            <li className={classes['nav__list-item']}>
              <NavLink
                to={'/'}
                className={({ isActive }) => {
                  return isActive
                    ? `${classes['nav__list-link']} ${classes['active']}`
                    : classes['nav__list-link'];
                }}
              >
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes['nav__right-section']}>
          <ul className={classes['nav__list']}>
            <li className={classes['nav__list-item']}>
              <NavLink
                to={'/registerCompany'}
                className={({ isActive }) => {
                  return isActive
                    ? `${classes['nav__list-link']} ${classes['active']}`
                    : classes['nav__list-link'];
                }}
              >
                Add Company
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <main className={classes.container}>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
