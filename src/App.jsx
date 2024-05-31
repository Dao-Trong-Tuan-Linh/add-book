import { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { doc, setDoc} from "firebase/firestore";
import { db } from "./firebase";
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [bookName,setBookName] = useState("")
  const [author,setAuthor] = useState("")
  const [publisher,setPublisher] = useState("")
  const [newPrice,setNewPrice] = useState("")
  const [oldPrice,setOldPrice] = useState("")
  const [category,setCategory] = useState("")
  const [genre,setGenre] = useState("")
  const [description,setDescription] = useState("")
  const [image1,setImage1] = useState("")
  const [image2,setImage2] = useState("")
  const [image3,setImage3] = useState("")

  const handleSubmit = async () => {
    try {
      const bid = uuid()
      const originImages = [image1,image2,image3]
      const images = originImages.filter(img => img !== "")

      await setDoc(doc(db,"books",bid),{
        bid,
        bookName,
        author,
        publisher,
        newPrice,
        oldPrice,
        category,
        genre,
        description,
        images
      })
      toast.success('Đã thêm dữ liệu thành công')
      setBookName("")
      setAuthor("")
      setPublisher("NXB ")
      setNewPrice("")
      setOldPrice("")
      setDescription("")
      setImage1("")
      setImage2("")
      setImage3("")
    } catch (error) {
      toast.error(error)
    }
  }
  return (
   <div style={{display:'flex',flexDirection:'column',marginTop:'300px',marginBottom:'20px'}}>
    <label>Tên sách</label>
    <input style={{height:40}} placeholder="Nhập tên sách..." value={bookName} onChange={(e) => setBookName(e.target.value)}/>
    <label>Tên tác giả</label>
    <input style={{height:40}} placeholder="Nhập tên tác giả..." value={author} onChange={(e) => setAuthor(e.target.value)}/>
    <label>Tên nhà xuất bản</label>
    <input style={{height:40}} placeholder="Nhập tên nhà xuất bản..." value={publisher} onChange={(e) => setPublisher(e.target.value)}/>
    <label>Giá mới</label>
    <input style={{height:40}} placeholder="Nhập giá mới..." value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
    <label>Giá cũ</label>
    <input style={{height:40}} placeholder="Nhập giá cũ..." value={oldPrice} onChange={(e) => setOldPrice(e.target.value)}/>
    <select value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">Chọn một danh mục</option>
      <option value={"van_hoc"}>Văn học</option>
      <option value={"kinh_te"}>Kinh Tế</option>
      <option value={"ky_nang_song"}>Kỹ năng sống</option>
      <option value={"sach_thieu_nhi"}>Sách thiếu nhi</option>
    </select>
    <label>Thể loại</label>
    <input style={{height:40}} placeholder="Nhập thể loại..." value={genre} onChange={(e) => setGenre(e.target.value)}/>
    <label>Mô tả</label>
    <textarea style={{height:200,width:300}} placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)}/>
    <label>Ảnh 1</label>
    <input style={{height:40}} placeholder="Nhập ảnh..." value={image1} onChange={(e) => setImage1(e.target.value)}/>
    <label>Ảnh 2</label>
    <input style={{height:40}} placeholder="Nhập ảnh..." value={image2} onChange={(e) => setImage2(e.target.value)}/>
    <label>Ảnh 3</label>
    <input style={{height:40}} placeholder="Nhập ảnh..." value={image3} onChange={(e) => setImage3(e.target.value)}/>

    <button style={{height:50}} onClick={handleSubmit}>Thêm sách</button>
    <ToastContainer/>
   </div>
  );
}

export default App;
