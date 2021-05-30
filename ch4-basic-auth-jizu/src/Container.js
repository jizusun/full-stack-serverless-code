const styles = {
  container: {
    margin: '0 auto',
    padding: '50px 100px',
  },
};

const Container = ({ children }) => (
  <div style={styles.container}>{children}</div>
);

export default Container;
