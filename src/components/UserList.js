const UserList = ({ users }) => {
  const tableStyle = { borderCollapse: 'collapse' };
  const cellStyle = {
    border: '1px solid #000',
    padding: '8px',
  };
  const renderedUsers = users.map((user) => {
    return (
      <tr key={user.name}>
        <td style={cellStyle}>{user.name}</td>
        <td style={cellStyle}>{user.email}</td>
      </tr>
    );
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>Name</th>
          <th style={cellStyle}>Email</th>
        </tr>
      </thead>
      <tbody data-testid="users">{renderedUsers}</tbody>
    </table>
  );
};
export default UserList;
