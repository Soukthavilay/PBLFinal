import {Link} from 'react-router-dom';
import '../scss/band.scss'
const Band = () => {
  return (
    <>
        <div className="band-list">
            <ul>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302329/final/4321_orbvvy.jpg" alt="apple" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302790/final/2947_xtltf3.jpg" alt="samsung" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302804/final/574_uy933c.jpg" alt="sony" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302849/final/2065_omqj2h.jpg" alt="philip" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302864/final/4477_djy2xi.jpg" alt="bosch" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302876/final/2696_drzxqk.jpg" alt="xiaomi" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302915/final/4382_i3kebc.jpg" alt="asus" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302931/final/4445_zziefk.jpg" alt="seagate" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302944/final/4326_rpevno.jpg" alt="hp" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302961/final/4374_l5luwy.jpg" alt="epson" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302973/final/3179_dnaqjd.jpg" alt="cannon" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683302987/final/3059_jx1tug.jpg" alt="toshiba" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683303004/final/4365_nfeldk.jpg" alt="logitech" /></Link>
                </li>
                <li className="band-list-li">
                    <Link to="#"><img src="https://res.cloudinary.com/dkiofoako/image/upload/v1683303018/final/3686_uy3grs.jpg" alt="ninetendo" /></Link>
                </li>
            </ul>
        </div>
    </>
  )
}

export default Band