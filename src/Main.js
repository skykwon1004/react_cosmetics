import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";



const DetailItm = ({ shopData }) => {
  const { id } = useParams();
  const itm = shopData.find(it => it.id == id);
  // id는 스트링임 === x 

  return (
    <>
      {
        itm &&
        // && 쓰는 이유 밑에 데이터가 오는중에 뿌려버려서 itm이 있으면 실행하라는 명령
        <div>
          <h2>{itm.id}</h2>
          <p>{itm.description}</p>
          <img src={itm.image_link} alt={itm.name} />
        </div>
      }
    </>
  )
}


const ListShop = ({ shopData }) => {
  // shopData에서 category = { pencil } 카데고리와 같은 상품들을 찾아서 배열로 만들기
  // const cd = shopData.filter(it => it.category == 'pencil')
  return (
    <>
    </>
  )
}


const Main = () => {
  const [shopData, setShopData] = useState([]);

  const getShopData = async () => {
    const r = await axios.get('https://desipossa.github.io/shop_cra/assets/data.json');
    setShopData(r.data.slice(85, 195));
    console.log(r.data)
  }

  useEffect(() => {
    getShopData();
  }, [])




  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<>main</>} />
        <Route path="/detail/:id" element={<DetailItm shopData={shopData} />} />
      </Routes>


      {
        shopData.map((it, idx) => {
          return (
            <li>
              {it.category}
              <Link to={`/detail/${it.id}`}>
                <img src={it.image_link} alt={it.name} />
              </Link>
            </li>
          )
        })
      }
    </div>
  )
}

export default Main;