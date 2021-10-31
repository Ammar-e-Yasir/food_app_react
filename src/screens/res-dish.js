import React,{useEffect,useState,useContext} from "react";
import { GlobalContext } from "../context/context";
import { useHistory } from "react-router";
import { db, collection, where ,query,getDocs,doc,setDoc,addDoc} from '../configs/firebase'
import Nav from "../components/navbar";
import Logout from "./logout";


export default function RestDishes(){

    const {state} = useContext(GlobalContext);
    console.log(state.authUser.uid)


    // let history = useHistory();
    const [allDishes, setAllDish] = useState([]);
    let uid = localStorage.getItem("restId");
    console.log(uid)





    useEffect(async () => {
        try{
        const q = query(collection(db, "dishes"), where("uid", "==", uid));
        // const q = query(collection(db, "dishes"), where("name", "==",));

        let dishRef = await getDocs(q);
        let allDishClone = allDishes.slice(0);
        dishRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            allDishClone.push(obj)
            // console.log(obj)
        })

        setAllDish(allDishClone);
    }

    catch(e){
        console.log(e)
    }


    }, []);


const orderItem = async(element)=>{


       await addDoc(collection(db,'orders'),{
        custID:state.authUser.uid,
        restID:uid,
        foodImg:element.children[0].src,
        foodname:element.children[1].innerText,
        category:element.children[2].innerText,
        price:element.children[3].innerText,
        delivery:element.children[4].innerText,
  })
    // });
    // let orderRef = doc(db,'orders', uid);
    // await setDoc(orderRef,{
//         custID:state.authUser.uid,
//         restID:uid,
//         foodImg:element.children[0].src,
//         foodname:element.children[1].innerText,
//         category:element.children[2].innerText,
//         price:element.children[3].innerText,
//         delivery:element.children[4].innerText,
//   })




}
    // console.log(state.restId)
    return (
        <div className='mt-5'>
        <h1>Our Food</h1>
        {allDishes.map(({foodname,foodImg,category,delivery,price,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p>{delivery}</p>
                    <button className='btn btn-success' onClick={(e)=>{orderItem(e.target.parentNode)}}>Order</button>

                </div>
            )
            
        })
    }
    {/* <Logout/>  */}
        </div>
    )
}