import { IoIosGlobe } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import styles from "./ProfilePage.module.css";
import { useEffect, useRef } from "react";

const ProfilePage = () => {

    const Ref = useRef([]);

    const inputFullName = useRef();
    const inputImageUrl = useRef();

    const prevPage = useHistory();

    const handlerOnCancelBtn = () => {
        prevPage.push("/welcomepage");
    };


    useEffect(() => {

        const getDataAfterRefresh = async () => {
            const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
                idToken: localStorage.getItem("SaveToken"),
            })
            console.log(res.data);

            // Getting fullname back after refreshing the page;
            Ref.current.value = res.data.users[0].displayName;
            let name = document.getElementById('fullname');
            name.value = res.data.users[0].displayName;

            // Getting photoUrl back after refreshing the page;
            Ref.current.value = res.data.users[0].photoUrl;
            let photo = document.getElementById('profilephoto');
            photo.value = res.data.users[0].photoUrl;
        }
        getDataAfterRefresh();
    }, []);


    const handlerOnUpdateProfile = async (event) => {
        try {
            event.preventDefault();

            const enteredFullName = inputFullName.current.value;
            const enteredImageUrl = inputImageUrl.current.value;

            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
                idToken: localStorage.getItem("SaveToken"),
                // // Getting the token id of user from the localStorage for updating profile. To test this start from signup then login then update it will work perfectly;
                displayName: enteredFullName,
                photoUrl: enteredImageUrl,
            })
            console.log(response);
            if (!response) {
                throw new Error("Profile update failed");
            }
            //  .then((res) => {
            //      console.log(res);
            //      if (!res.ok) {
            //          throw new Error("Profile update failed");
            //      }
            //  }).catch((err) => {

            //  })
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };



    return (
        <div className={styles.profile_page}>
            <form onSubmit={handlerOnUpdateProfile} className={styles.form_profile__page}>

                <center>
                    <div className={styles.contact_details}>
                        <label htmlFor="contact"> Contact Details </label>
                        <button className={styles.cancel_btn} onClick={handlerOnCancelBtn}> Cancel </button>
                    </div>

                    <div className={styles.full_name}>
                        <FaGithub style={{ width: "30px", height: "30px" }} />
                        <label htmlFor="fullname"> Full Name </label>
                        <input type="text" id="fullname" name="fullname" required ref={inputFullName} />
                    </div>

                    <div className={styles.profile_photo}>
                        <IoIosGlobe style={{ width: "30px", height: "30px" }} />
                        <label htmlFor="profilephoto"> Profile Photo URL </label>
                        <input type="link" id="profilephoto" name="profilephoto" required ref={inputImageUrl} />
                    </div>

                    <div className={styles.update_actions}>
                        <button type="submit"> Update </button>
                    </div>
                </center>

            </form>
        </div>
    )
}

export default ProfilePage;




///////*********************************************************************************** *///////




// import { IoIosGlobe } from "react-icons/io";
// import { FaGithub } from "react-icons/fa";
// import axios from "axios";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import styles from "./ProfilePage.module.css";
// import { useEffect, useRef } from "react";

// const ProfilePage = () => {

//     const Ref = useRef(null);

//     const inputFullName = useRef();
//     const inputImageUrl = useRef();

//     const prevPage = useHistory();

//     const handlerOnCancelBtn = () => {
//         prevPage.push("/welcomepage");
//     };

//     useEffect(() => {

//         const refreshAfter = async () => {
//             const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
//                 idToken: localStorage.getItem("SaveToken"),
//             })
//             console.log(res.data);

//             Ref.current.value = res.data.users[0].displayName;
//             let name = document.getElementById('fullname');
//             name.value = res.data.users[0].displayName;
//         }
//         refreshAfter();
//     }, []);


//     const handlerOnUpdateProfile = async (event) => {

//         try {
//             event.preventDefault();
//             const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDH5JlMv2hpQuoT9E47PiPYHTdFE_P2Gs0`, {
//                 idToken: localStorage.getItem("SaveToken"),
//                 displayName: event.target.fullname.value,
//                 photourl: event.target.profilephoto.value,
//                 returnSecureToken: true,
//             })
//             console.log(response);

//         } catch (error) {
//             console.log(error);
//         }

//     };



//     return (
//         <div className={styles.profile_page}>
//             <form onSubmit={handlerOnUpdateProfile} className={styles.form_profile__page}>

//                 <center>
//                     <div className={styles.contact_details}>
//                         <label htmlFor="contact"> Contact Details </label>
//                         <button className={styles.cancel_btn} onClick={handlerOnCancelBtn}> Cancel </button>
//                     </div>

//                     <div className={styles.full_name}>
//                         <FaGithub style={{ width: "30px", height: "30px" }} />
//                         <label htmlFor="fullname"> Full Name </label>
//                         <input type="text" id="fullname" name="fullname" required ref={inputFullName} />
//                     </div>

//                     <div className={styles.profile_photo}>
//                         <IoIosGlobe style={{ width: "30px", height: "30px" }} />
//                         <label htmlFor="profilephoto"> Profile Photo URL </label>
//                         <input type="link" id="profilephoto" name="profilephoto" required ref={inputImageUrl} />
//                     </div>

//                     <div className={styles.update_actions}>
//                         <button type="submit"> Update </button>
//                     </div>
//                 </center>

//             </form>
//         </div>
//     )
// }

// export default ProfilePage;
