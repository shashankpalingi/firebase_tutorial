import { db  } from './firebase.js'; 
import{ doc, collection, getDocs, addDoc,deleteDoc,query, where, orderBy, onSnapshot }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const cafeList=document.querySelector('#cafe-list');
const form=document.querySelector("#add-cafe-form");

// create element  and render cafe
function renderCafe(cafeDoc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');
    let cross=document.createElement('div');

    li.setAttribute('data-id',cafeDoc.id); 
    name.textContent=cafeDoc.data().name;
    city.textContent=cafeDoc.data().city; 
    cross.textContent= 'x'; 

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click',async (e)=>{
        const id =e.target.parentElement.getAttribute('data-id');
        try {
            await deleteDoc(doc(db, "cafes", id));
            console.log("Document deleted");
        } catch (error) {
            console.log(error.message);
        }
    })
}
// getting data from firestore
// getDocs(collection(db, "cafes"))
//   .then((querySnapshot) => {
//       querySnapshot.forEach((document) => {
//             console.log(document.id);
//             console.log(document.data());
//           renderCafe(document);
//       });
//   })
//   .catch((error) => {
//       console.log(error.message);
//   });

// saving data from UI
 form.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    addDoc(collection(db,"cafes"),{
        name:form.name.value,
        city:form.city.value
    })
    .then(() => {
        console.log("Document added");
        form.reset();
    })
    .catch((error) => {
        console.log(error.message);
    });
        
 });


// real time listener
const q = query(
    collection(db, "cafes"),
    orderBy("city")
);
onSnapshot(q, (snapshot) => {

    snapshot.docChanges().forEach((change) => {

        if(change.type === "added") {

            renderCafe(change.doc);

        }
        else if(change.type === "removed") {

            const li = cafeList.querySelector(
                `[data-id="${change.doc.id}"]`
            );

            if(li){
                cafeList.removeChild(li);
            }
        }

    });

});