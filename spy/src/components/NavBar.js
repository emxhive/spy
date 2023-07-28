import "../css/navbar.css";

export default function NavBar({ applogo }) {
  return (
    <div className="left-nav">
      <a href=".">
        <img src={applogo} alt="LOGO" />
        <h2> emxhive </h2>{" "}
      </a>{" "}
      <a href="."> Dashbord </a> <a href="."> Income History </a>{" "}
      <a href="."> Expenses </a> <a href="."> Settings </a>{" "}
    </div>
  );
}
