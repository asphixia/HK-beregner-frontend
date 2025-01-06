import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
