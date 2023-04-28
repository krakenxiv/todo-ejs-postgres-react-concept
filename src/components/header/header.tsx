import React from 'react';
import Logout from '../../components/logout/logout';
import { useAuth0 } from '@auth0/auth0-react';
import classes from './header.module.scss';

interface HeaderProps {
  handleSortChange: Function;
  handleOrderbyChange: Function;
}

const Header = (props: HeaderProps) => {
  const { user } = useAuth0();
  return (
    <>
      <div className={classes.userBar}>
        {user && user.name ? (
          <span className={classes.userInfo}>Welcome {user.name}</span>
        ) : null}
        <Logout />
      </div>
      <div className={`d-flex justify-content-between ${classes.headerBar}`}>
        <h2 className="text-light">Todo Manager</h2>
        <button
          className={`btn btn-primary`}
          data-bs-toggle="modal"
          data-bs-target="#addTodoModal"
        >
          ADD TODO +
        </button>
      </div>
      <div className={`${classes.sortRow}`}>
        <div className={`${classes.sortBy}`}>
          <label
            className={`form-check-label ${classes.selectLabel}`}
            htmlFor="sort-by-select"
          >
            Sort By
          </label>
          <select
            className={`form-select ${classes.sortSelect}`}
            id="sort-by-select"
            onChange={(e) => {
              props.handleSortChange(e);
            }}
          >
            <option value="name" defaultValue={'name'}>
              Name
            </option>
            <option value="description">Description</option>
            <option value="completed">Completed</option>
            <option value="id">ID</option>
          </select>
        </div>
        <div className={`${classes.orderBy}`}>
          <label
            className={`form-check-label ${classes.selectLabel}`}
            htmlFor="order-by-select"
          >
            Order By
          </label>
          <select
            className={`form-select ${classes.sortSelect}`}
            id="order-by-select"
            onChange={(e) => {
              props.handleOrderbyChange(e);
            }}
          >
            <option value="asc" defaultValue={'asc'}>
              ASC
            </option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Header;
