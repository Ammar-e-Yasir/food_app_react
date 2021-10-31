import React, { useContext, useEffect,  } from "react";
import { db, collection, where ,query,getDocs,addDoc,deleteDoc,doc} from '../configs/firebase';
import { GlobalContext } from "../context/context";

export default function PendingOrders(){
    let uid =  localStorage.getItem('restId');

    const {state,dispatch } = useContext(GlobalContext);
    // console.log(state.authUser.uid)


    useEffect(async () => {
        try{
         const q = query(collection(db, "orders"),where("restID", "==", state.authUser.uid));
        let orderRef = await getDocs(q);
        orderRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            dispatch({type:"PENDING_ORDERS", payload:obj})
            // console.log(obj)
        })
    }
    catch(e){
        console.log(e)
    }

    }, [])
  

    const acceptedOrder = async(element)=>{
        try{
        let docDel = doc(db, "orders", element.id);
        await deleteDoc(docDel);


        let orderAccRef = collection(db,'ordersAccepted');
        await addDoc(orderAccRef,{
            // orderId:element.id,
            restID:uid,

            foodImg:element.children[0].src,
            foodname:element.children[1].innerText,
            category:element.children[2].innerText,
            price:element.children[3].innerText,
            custId:element.children[4].innerText
      })


    }
    catch(e){
        console.log(e)
    }

   
   
   
    }





    

    return(
    <div>
        <h1>Pending Orders</h1>
        {state.pendingOrders.map(({foodname,foodImg,category,price,custID,id},index)=>{
            return(
                <div key={index}  className='border mt-5 h-50 w-50' id={id}>
                    <img src={foodImg} className='h-50 w-50' />
                    <h2>{foodname}</h2>
                    <h3>{category}</h3>
                    <p>{price}</p>
                    <p style={{display:'none'}}>{custID}</p>
                    <button className='btn btn-success' onClick={(e)=>{acceptedOrder(e.target.parentNode)}}>Accept</button>

                </div>
            )
            
        })
    }


        </div>
    )
}