import './App.css';
import {useEffect,useState} from "react";
import AddProduct from "./Components/AddProduct/AddProduct";
import {totalCartValue} from './Reducer/totalReducer'
import TotalCart from "./Components/TotalCart/TotalCart";

function App() {
    const [addButton, setAddButtonClick] = useState(false)
    const [productData,setProductData] = useState([])
    const [allProduct, setAllProducts] = useState([])
    const [editProductData, setEditProductData] = useState('')
    const [edit, setEdit] = useState(false)
    const [totalCart, setTotalCart] = useState('')

  const getProductData = () => {
    let retrieveProductData = JSON.parse(localStorage.getItem('productData'))
    setProductData(retrieveProductData || [])
      setAllProducts(retrieveProductData)
  }

  useEffect(() => {
    getProductData()
  },[])

    const onAddProductClick = (data) => {
        let newData = [...productData];
    if(data.index === 0 || data.index) {
    let newData = [...productData]
    newData[data.index] = data
    setProductData(newData)
    localStorage.setItem('productData',JSON.stringify(newData))}
    else {
    newData.unshift(data)
    setProductData(newData)
    localStorage.setItem('productData',JSON.stringify(newData))
 }}

    const deleteProductClick = (index) => {
    const copyOfProducts = [...productData]
      copyOfProducts.splice(index,1)
      setProductData(copyOfProducts)
      localStorage.setItem('productData',JSON.stringify(copyOfProducts))
    }

    const calculateCard = (index, type) => {
        getProductData()
      let copyOfProduct = [...productData]
      copyOfProduct[index] = {
      ...copyOfProduct[index], addToCard: type === 'add' ? copyOfProduct[index]?.addToCard + 1 : type === 'remove' ? copyOfProduct[index]?.addToCard -1  : ''}
      localStorage.setItem('productData',JSON.stringify(copyOfProduct))
      getProductData()
    }

    const editProductClick = (index,editProductInfo) => {
      setAddButtonClick(true)
        setEdit(true)
        let newEditProductInfo={...editProductInfo,index}
        setEditProductData(newEditProductInfo)
    }

    const OnSearchClick = (value) => {
        if(value.length === 0) {
            setProductData(allProduct)
        } else {
            const copyData = productData;
            let newData = copyData.filter((item) => item?.name?.toLowerCase().includes(value.toLowerCase()) || item?.category?.toLowerCase().includes(value.toLowerCase()));
            setProductData(newData)
        }
    }

  return (
    <div className="App">
        <div className="searchBoxWrapper">
            <div><button className="button addbutton" onClick={() => {setAddButtonClick(true)}}>Add New Product</button></div>
            <input  placeholder="Search" className="inputBox" type="text" onChange={(e) => setTimeout(() => {OnSearchClick(e.target.value)},300)}/>
            <div><button className="button addbutton" onClick={() => {setTotalCart(true)}}>Total Cart</button></div>
        </div>
        {addButton ? <AddProduct edit={edit} editProductData={editProductData}
        onCloseClick={() => {setAddButtonClick(false);setEdit(false)}}
        onAddClick={(data) => {setAddButtonClick(false);setEdit(false);onAddProductClick(data)}}
        /> :''}
        {totalCart && <TotalCart onCloseClick={() => {setTotalCart(false)}}/>}
        <div className="productsOuterWrapper">
            <div className="products">
            {productData?.map((product,index) => (
          <div  key={index} className="productWrapper">
              <div className="imageAndButtonsWrapper">
                  <div className="imageWrapper"><img  src={product.imgUrl} alt="img" width="150px" height="150px"/></div>
                  <div className="buttonsWrapper">
                      <button className="button "  onClick={() => {calculateCard(index,'add')}} >Add to cart</button>
                      <button className="button" onClick={() => {calculateCard(index,'remove')}} >Remove from cart</button>
                      <button className="button" onClick={() => {deleteProductClick(index)}}>Delete</button>
                  </div>
              </div>
              <div className="productInfoWrapper">
                  <div><div className="gap">Name : {product?.name}</div>
                      <div className="gap">Price: &#x20b9;<span className="bold">{product.price}</span></div>
                      <div className="gap">Category: {product.category}</div>
                      <div className="gap">Add to cart count: <span className="bold">{product.addToCard || 0}</span></div>
                  </div>
                  <div className="gap"><div className='description' title={product.description}>{product.description}</div>
                      <div className="reviewWrapper">Review of this product <span className="review">{product.ratings}</span></div>
                  </div>
                  <div className="editWrapper"><button className="button editButton" onClick={() => {editProductClick(index, product)}}  >Edit Product </button></div>
              </div>
          </div>))}
        </div>
        </div>
    </div>
  );
}

export default App;
