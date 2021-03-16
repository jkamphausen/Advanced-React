import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2>I'm a Page!</h2>
      {children}
    </div>
  );
}

/* define what types are allowed here; basic react */
Page.propTypes = {
  children: PropTypes.any,
};
