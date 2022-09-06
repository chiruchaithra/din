import './AddProduct.css'
import {useEffect, useState} from "react";
const AddProduct = ({onCloseClick,onAddClick,editProductData,edit}) => {
    const [productInfo, setProductInfo] = useState({})
    const categoryArray = [{name:'Electronics',id:'ele'},{name:'Cloths',id:'cloth'},{name:'Mobile',id:'mobile'},{name:'Laptop',id:'laptop'},{name:'Jewelry',id:'jewelry'}]
    let ratingArray = ['Good','Very Good','Excellent','Bad','Very Bad','Okay','Can Give a Try']

    useEffect(() => {
        setProductInfo(editProductData)
    },[])


    const onFileSelect = (e) => {
        let imgUrl;
        //Creating url for the image
        var reader = new FileReader();
        // convert image file to base64 string
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = function () {imgUrl =  reader.result;setProductInfo((prev) => ({...prev,imgUrl}))}
    }

    const productUpdate = (e,key) => {setProductInfo((prev) => ({...prev, [key]:e.target.value}))}
    const AddClick = () => {
        let productInfoCopy =  {...productInfo}
        productInfoCopy = {...productInfo, addToCard:0}
        setProductInfo(productInfoCopy)
        onAddClick(productInfo)
    }
    return (
        <div className="backDrop">
            <div className="addProductWrapper">
            <div><div className="flex">
                    <div><p>Product Name</p><input className="inputBox" type="text" defaultValue={productInfo.name}  placeholder="Enter Product Name" onChange={(e) => setTimeout(() => {{productUpdate(e,'name')}},2000)}  /></div>
                    <div><div><p>Product Image</p><input  className="file" id="inputTag" type="file" name="image_file" id="image_file" accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" onChange={(e) => {onFileSelect(e)}} /></div>
                    </div>
                </div>
                <div className="flex">
                    <div><p>Description</p><input type="text" className="inputBox" defaultValue={productInfo?.description} placeholder="Enter Description" onChange={(e) => setTimeout(() => {{productUpdate(e,'description')}},2000)} /></div>
                    <div><p>Price</p><input type="number" className="inputBox" step="100" defaultValue={productInfo?.price} placeholder="Enter Price" onChange={(e) => setTimeout(() => {{productUpdate(e,'price')}},2000)} /></div>
                </div>
                <div className="flex">
                    <div><p>Category</p>
                    <select value={productInfo?.category} onChange={(e) => {productUpdate(e,'category')}}>
                        <option>Select Category</option>
                        {categoryArray.map((category,index) => (
                            <option key={index} value={category.name} onSelect={(e) => {console.log('click',e)}}>{category.name}</option>
                        ))}
                    </select>
                    </div>
                    <div><p>Ratings</p>
                    <select value={productInfo?.ratings} onChange={(e) => {productUpdate(e,'ratings')}}>
                        <option>Select</option>
                        {ratingArray.map((item,index) => (
                            <option  key={index} value={item} onSelect={(e) => {console.log('click',e)}}>{item}</option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="buttons">
                    <button className="addProductButton add close" onClick={ () => {AddClick()}}>{edit ? 'Edit' : 'Add'}</button>
                    <button  className="addProductButton close" onClick={onCloseClick}>Close</button>
                </div>
            </div>
        </div>
        </div>
    )
}
export default AddProduct;