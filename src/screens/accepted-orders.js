import React, { useContext, useEffect,  } from "react";
import { db, collection, where ,query,getDocs,addDoc,doc,deleteDoc} from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function AccedtedOrders(){
    let uid =  localStorage.getItem('restId');

    const {state,dispatch } = useContext(GlobalContext);


    useEffect(async () => {
        try{
         const q = query(collection(db, "ordersAccepted"),where("restID", "==", uid));
        let orderRef = await getDocs(q);
        orderRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            dispatch({type:"ACCEPTED_ORDERS", payload:obj})
            // console.log(obj)
        })
    }
    catch(e){
        console.log(e)
    }

    }, [])
  

    const deliveredOrder = async(element)=>{
        let docDel = doc(db, "ordersAccepted", element.id);
        await deleteDoc(docDel);

        let orderAccRef = collection(db,'ordersDelivered');
        await addDoc(orderAccRef,{
            orderId:element.id,
            restID:uid,
            foodImg:element.children[0].src,
            foodname:element.children[1].innerText,
            category:element.children[2].innerText,
            price:element.children[3].innerText,
            custId:element.children[4].innerText

      })
    }

    return(
    <div>
        <h1>Accepted Orders</h1>
        {state.acceptedOrders.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>

                    <button className='btn btn-success' onClick={(e)=>{deliveredOrder(e.target.parentNode)}}>Delivered</button>

                </div>
            )
            
        })
    }


        </div>
    )
}