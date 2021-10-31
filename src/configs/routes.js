import React, { useEffect, useContext,useHistory } from "react";
import { GlobalContext } from "../context/context";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SignIn from '../screens/signin';
import { auth, onAuthStateChanged, db, doc, getDoc, collection, getDocs } from './firebase';
// import UserHome from "../screens/user-home";
import Nav from "../components/navbar"
import CustomerReg from "../screens/cust-register";
import RestaurantReg from "../screens/rest-reg";
import Home from "../screens/home";
import ResDashboard from "../screens/rest-dashboard";
import CustomerHome from "../screens/cust-home";
import AddDish from "../screens/add-dish";
import RestDishes from "../screens/res-dish";
import Logout from "../screens/logout";
import RestDashboard from "../screens/rest-dashboard";
import PendingOrders from "../screens/pending-orders";
import AcceptedOrders from "../screens/accepted-orders";
import DeliveredOrders from "../screens/delivered-orders";
export default function App() {
    const { state, dispatch } = useContext(GlobalContext);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // fetchUserInfo(user.uid);
                dispatch({type:"AUTH_USER" , payload : user.uid})
                console.log('user found !')

            }
            else {
                console.log('user not found');
                // fetchAllUserInfo();
                // dispatch({ type: "AUTH_USER", payload: null });

            }
        })
    }, []);

    // const fetchUserInfo = async (uid) => {
    //     let userRef = doc(db, 'users', uid);
    //     let userInfo = await getDoc(userRef);
    //     userInfo = userInfo.data();
    //     // console.log(userInfo);
    //     dispatch({ type: "AUTH_USER", payload: userInfo });

    // }

    // const fetchAllUserInfo = async () => {

    //     let userRef = collection(db, 'users');
    //     let allUsersInfo = await getDocs(userRef);

    //     allUsersInfo.forEach((doc) => {
    //         dispatch({ type: "ALL_USERS", payload: doc.data() });
    //     });

    // }




    return (
        <Router>
            <div>
                <Nav/>
                <Switch>




                    
                    {/* {
                        state.authUser ?
                            null : <>

                                <Route  path="/signup">
                                    <SignUp />
                                </Route>
                                <Route exact path="/">
                                    <SignIn />
                                </Route>

                            </>
                    } */}

                    <Route path='/rest-reg' component={RestaurantReg} />
                    <Route exact path='/' component={SignIn} />
                    <Route path='/cust-reg' component={CustomerReg} />
                    <Route path='/home' component={Home} />
                    <Route path='/cust-home' component={CustomerHome} />
                    <Route path='/add-dish' component={AddDish} />
                    <Route path='/rest-dish' component={RestDishes} />
                    <Route path='/rest-dashboard' component={RestDashboard} />
                    <Route path='/pending-orders' component={PendingOrders} />
                    <Route path='/accepted-orders' component={AcceptedOrders} />
                    <Route path='/delivered-orders' component={DeliveredOrders} />
                    <Logout/>




{/* 
                    {
                        state.authUser ?
                            <>


                               

                            </> : null
                    } */}

{/* 
                    <Route exact path='/' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/user-home' component={UserHome} />
                    <Route path='/user-tweet' component={MyTweet} />
                    <Route path='/user-profile' component={MyProfile} />
                    <Route path='/write' component={MyComponent} /> */}



                </Switch>
            </div>
        </Router>
    );
}