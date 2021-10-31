import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db, collection, where ,query,getDocs} from '../configs/firebase'
import { GlobalContext } from "../context/context";
export default function CustomerHome() {
    const {dispatch} = useContext(GlobalContext);

    let history = useHistory();
    const [allRestaurant, setAllRestaurant] = useState([]);
    useEffect(async () => {
        const q = query(collection(db, "users"), where("userRole", "==", "restaurant"));

        let restRef = await getDocs(q);
        let allRestaurantClone = allRestaurant.slice(0);
        restRef.forEach((doc) => {
           let obj = doc.data();
            obj.id = doc.id;
            allRestaurantClone.push(obj)
            // console.log(obj)
        })

        setAllRestaurant(allRestaurantClone);

    }, [])

    const selectRest = (e)=>{
       let restID =  e.target.parentNode.id;
    //    dispatch({type:"SELECT_RES_ID" , payload:restID});
       localStorage.setItem('restId' , restID)
       console.log(restID)
       history.push('/rest-dish')

      



    }


    return (
        <>
        <h1>Select your Restaurant !</h1>
        {allRestaurant.map(({res_name,country,city,id},index)=>{
            return(
                <div key={index} id={id} className='border mt-5'>
                    <h3>{res_name}</h3>
                    <p>{country}</p>
                    <p>{city}</p>
                    <button className='btn btn-success' onClick={selectRest}>Explore</button>

                </div>
            )

        })
        }
        </>
        // <h1>asd</h1>
    )
}