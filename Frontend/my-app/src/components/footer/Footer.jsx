import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import './footer.sass'

const Footer = () => {
  return (
    <footer className="footer">
      <span>
        Copyright &copy; Laos Technology
      </span>
      <ul>
        <li className="nav-item"><a href="#">Privacy Policy</a></li>
        <li className="nav-item"><a href="#">Terms of use</a></li>
      </ul>
    </footer>
  )
}

export default Footer