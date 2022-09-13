let textarea = document.getElementById("myInput");

// textarea.onkeydown = keyDown;
textarea.onkeyup = keyUp;




//  Cách 1 chưa ra


// function keyDown(){
//     console.log('KeyDown');
// }

// function keyUp(){
//     let valueInput = textarea.value;
//     // console.log(valueInput);
//     let searchStates = async (searchText) => {
//         let res = await fetch(
//           `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=` +
//             valueInput
//         );
//         let states = await res.json();

//         let result = await fetch(
//           `https://en.wikipedia.org/w/api.php?
//      origin=*&action=query&prop=pageprops|pageimages&format=json&titles=` +
//             valueInput
//         );
//         let getResult = await result.json();
//         console.log(states);

//         if (searchText.length === 0) {
//           states = [];
//         }
//       };

//     //   for(let i = 0; i < 3; i++) {
//     //     console.log(states[i]);
//     //   }

//       //Show results

//       //    let outputHtml = getResult=>{
//       //            if(getResult.length>0){
//       //                let html = getResult.map(getResult=>{
//       //                    `<div class="search_list_wrapper">
//       //                    <div class="search_list">
//       //                        <div class="img"></div>
//       //                        <div class="title">
//       //                            <h3>Lion</h3>
//       //                       <p>dsahjdklsajks</p>

//       //                        </div>
//       //                    </div>
//       //                </div>`
//       //                });
//       //                console.log(html);
//       //             }}

//     searchStates(valueInput);

// };





//  Cách 2



function getData(url, fn) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };

  xhr.open("GET", url, true);
  xhr.send();
}
let container = document.getElementById("container2");
function keyUp() {
    let valueInput = textarea.value;
    
    // var imgTileLink = [];
    // var tangName = [];
    if(valueInput==''){
        container.innerHTML = ""
    }else{
        getData(
            `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${valueInput}`,
            function (resolve, reject) {
            if (resolve) {
                resolve;
                container.innerHTML = ""
            } else {
                reject;
            }
            
            // let a ;
            var nameTile = [];
            for (let i = 0; i < reject[1].length; i++) {
                nameTile.push(reject[1][i]);
                // a=reject[1]
                // console.log(reject[1][i]);
        
            }

            // let b;
            var linkTile = [];
            for (let j = 0; j < reject[3].length; j++) {
                linkTile.push(reject[3][j]);
                // b=reject[3][j]
                // console.log(reject[3][j]);
            }
            container.innerHTML = ""
            for (let k = 0; k < nameTile.length; k++) {
                // console.log(nameTile[k]);
                getData(
                `https://en.wikipedia.org/w/api.php?
                    origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${nameTile[k]}`,
                function (resolve, reject) {
                    if (resolve) {
                    resolve;
                    } else {
                    reject;

                    const findPropFromObj = (object, key) => {
                        if (object.hasOwnProperty(key)) {
                        return object[key];
                        }

                        for (const k of Object.keys(object)) {
                        if (typeof object[k] === "object") {
                            const o = findPropFromObj(object[k], key);
                            if (o !== null && typeof o !== "undefined") return o;
                        }
                        }

                        return null;
                    };
                    let tagName = findPropFromObj(reject, "wikibase-shortdesc")
                    let imgLink = findPropFromObj(reject, "source");
                    // imgTileLink.push(imgLink);
                    // tangName.push(tagName);
                    container.innerHTML += `<div class="container21">
                    <div class="wrapper">
                        <img src='${imgLink}' alt="">
                    </div>
                    <div class="wrapper1">
                        <div class="parrent">
                            <a class="a1" href="${linkTile[k]}">${nameTile[k]}</a>
                        </div>
                        <div class="parrent1">
                            <a class="a2" href="${linkTile[k]}">${tagName}</a>
                        </div>
                    </div>
                    </div>`
                    }
                });
                
            }
        });

    };
        
};

