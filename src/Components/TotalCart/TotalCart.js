import './TotalCart.css'
import cart from '../../Images/cart.webp'
import  thanku from '../../Images/Thank_you.webp'
import {useEffect, useState} from "react";

const TotalCart = ({onCloseClick}) => {
    const [total,setTotal] = useState(0)
    useEffect(() => {
        let retrieveProductData = JSON.parse(localStorage.getItem('productData'))
        const sum = retrieveProductData?.reduce((acc,cv) => {return  acc + cv.addToCard},0)
        setTotal(sum)
    })
    return (
        <div className="backDrop">
        <div className="addProductWrapper">
            <div className="image"><img src={cart} className="img" width="150px" height="100px"/><h1>Your total cart is {total || 0}</h1></div>
            <div className="image"><img src={thanku} className="img" width="150px" height="100px"/></div>
            <button  className="addProductButton close" onClick={onCloseClick}>Close</button>
        </div>
        </div>
    )
}
export default TotalCart