import { useState } from "react";
import "./App.css";
import { v4 } from "uuid";
import { doc, setDoc,getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [bookName,setBookName] = useState("")
  const [author,setAuthor] = useState("")
  const [publisher,setPublisher] = useState("")
  const [newPrice,setNewPrice] = useState("")
  const [oldPrice,setOldPrice] = useState("")
  const [category,setCategory] = useState("")
  const [genre,setGenre] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")

  const handleSubmit = async () => {
    try {
      const res = await getDoc(doc(db,"books",category))
      const bookId = v4();

      const newBookData = {
        [bookId]: {
          bookName,
          author,
          publisher,
          newPrice,
          oldPrice,
          genre,
          description,
          images: image.split(","),
        },
      };
      if(!res.exists()) {
        await setDoc(doc(db,"books",category), newBookData);
      } else {
        await updateDoc(doc(db,"books",category), newBookData);
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
   <div style={{display:'flex',flexDirection:'column',marginTop:'160px',marginBottom:'20px'}}>
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
      <option value={"Van-Hoc"}>Văn học</option>
      <option value={"Kinh-Te"}>Kinh Tế</option>
      <option value={"Ky-Nang-Song"}>Kỹ năng sống</option>
      <option value={"Sach-Thieu-Nhi"}>Sách thiếu nhi</option>
    </select>
    <label>Thể loại</label>
    <input style={{height:40}} placeholder="Nhập thể loại..." value={genre} onChange={(e) => setGenre(e.target.value)}/>
    <label>Mô tả</label>
    <textarea style={{height:200,width:300}} placeholder="Nhập mô tả" value={description} onChange={(e) => setDescription(e.target.value)}/>
    <label>Ảnh</label>
    <input style={{height:40}} placeholder="Nhập ảnh..." value={image} onChange={(e) => setImage(e.target.value)}/>
    <button style={{height:50}} onClick={handleSubmit}>Thêm sách</button>
   </div>
  );
}

export default App;
