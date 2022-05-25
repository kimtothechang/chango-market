const MainTemplate = ({ children, header, footer }) => {
  return (
    <div>
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
};

export default MainTemplate;
