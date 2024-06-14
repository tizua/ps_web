import {pokemondatas} from "./data.js";
console.log(pokemondatas);





//名前のインプットの検索候補にポケモン名表示する
for(let i = 0; i < pokemondatas.length; i++){
    //selectt取得
    let name = document.getElementById('name');
    //optionタグを作る
    let option = document.createElement('option');
    //テキストを追加する
    option.textContent = pokemondatas[i].name;
    //select内にoptionを配置する
    name.appendChild(option);
    
}



//ポケモンの名前入力したときの関数
//色々な関数で使いたいからスコープ外に配置
let Orispeed=1;
let Oriberries=1;
let Oriingredientper=1;
let Oriingredient123=3;
let nameflag=0;


//名前入力したときの関数
window.nameinput=()=>{


    let name = document.getElementById('name');
    let nameVar = String(name.value);
    nameflag=0;

    
    
    for(let i = 0; i < pokemondatas.length; i++){ 
        if(pokemondatas[i].name===nameVar){

            nameflag=1;
            // name.setAttribute("style","width:110px;") //selectの幅元に戻す
           
            //食材候補リセット
            let ingredient1 = document.getElementById('ingredient1');
            ingredient1.innerHTML = '' //ingredient1の中のHTML表記全消ししてリセット、removeChildでoptionタグ消すパターンだと新しいoptionタグ追加できないのかうまくいかなかった

            let ingredient2 = document.getElementById('ingredient2');
            ingredient2.innerHTML = ''

            let ingredient3 = document.getElementById('ingredient3');
            ingredient3.innerHTML = ''


            //食材候補作る処理
            for(let p in pokemondatas[i].ingredient1){
                //select取得
                let Selingredient1 = document.getElementById('ingredient1');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient1"][p]+"個"; //.pだとなぜかできなかったから[p]にしてみた
                //selec内にoptionを配置する
                Selingredient1.appendChild(option);
            }

            //食材候補作る処理2
            for(let p in pokemondatas[i].ingredient2){
                //select取得
                let Selingredient2 = document.getElementById('ingredient2');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient2"][p]+"個"; //.pだとなぜかできなかったから[p]にしてみた
                //select内にoptionを配置する
                Selingredient2.appendChild(option);
            }

            //食材候補作る処理3
            for(let p in pokemondatas[i].ingredient3){
                //select取得
                let Selingredient3 = document.getElementById('ingredient3');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient3"][p]+"個"; //.pだとなぜかできなかったから(pが変数じゃなくて"p"というキーだと認識されたっぽい)[p]にしてみた
                //select内にoptionを配置する
                Selingredient3.appendChild(option);
            }
        

            //おてつだいスピード&食材確率ゲット
            Orispeed=pokemondatas[i].speed;
            Oriingredientper=pokemondatas[i].ingredientper;


            //きのみの数を設定
            if(pokemondatas[i].specialty=="きのみ"){
                Oriberries=2;
            }else if(pokemondatas[i].specialty=="食材" || pokemondatas[i].specialty=="スキル"){
                Oriberries=1;
            }
            
            // //ポケモン名が6文字以上ならinputの幅広げる
            // if(nameVar.length>6){
            // name.setAttribute("style","width:160px;") 
            // }
        } 
       
    }   
}

nameinput() //これないと初期値フシギダネだけど食材とかが表示されない


//レベルによって食材非表示にする処理
window.levelinput=()=>{
    let level=Number(document.getElementById("level").value);
    let ingredient2 = document.getElementById('ingredient2');
    let ingredient3 = document.getElementById('ingredient3');

    ingredient2.disabled=false
    ingredient3.disabled=false
    
    if(level<30){
        ingredient2.disabled=true
        ingredient3.disabled=true
        Oriingredient123=1
    }else if(level<60){
        ingredient3.disabled=true
        Oriingredient123=2
    }else{
        Oriingredient123=3
    }
}



//計算ボタンクリックしたときの関数

window.calculation=()=>{  //scriptタグにtype="module"がある場合、onclickの関数はconstの代わりにwindow.にしないとエラーがでて発動しない


    //値入手エリア
    let name = String(document.getElementById('name').value);
    console.log("name",name);

    let level = Number(document.getElementById('level').value);
    console.log("level",level);

    let energy = Number(document.getElementById('energy').value);
    console.log("energy",energy);

    
    


    //計算詳細非表示
    
    let details=document.getElementById("details");
    details.style.display="none"
    

    //ポケモン名が入力されていなかった時の処理

    if(nameflag===0){ //名前入力したときポケモンの名前を入力しなかったためnameflag===1になっていない状態
        let resultEle=document.getElementById("result");
        resultEle.setAttribute("class","error"); //css変えるためにクラス変えてる
        resultEle.innerHTML="<p>ポケモン名を入力してください</p>";
        console.log("文字なし");
        return //関数終了させる
    }

    

    

    //きのみの数Sがチェックされてるかの確認&きのみの数確定
    let berrieS=document.getElementById("berrieS")
    let berrieSVar=0

    if(berrieS.checked){
        berrieSVar=1
    }
    let berries=Oriberries+berrieSVar

    console.log("oberries",Oriberries);
    console.log("berrieSV",berrieSVar);
    console.log("berries",berries);




    //おてつだいスピードSMがチェックされてるかの確認
    let speedSM=document.getElementsByName("speedSM")
    let speedS=0;  //for文の中はスコープあるから外で変数宣言しないといけない
    let speedM=0;
    

        for(let i=0;i<speedSM.length;i++){ // speedSとMが入った配列回している
            if(speedSM.item(0).checked)( //item(0)がS、item(1)がM、チェックされてたら変数変える
                speedS=Number(speedSM.item(0).value)
            )
            if(speedSM.item(1).checked)( 
                speedM=Number(speedSM.item(1).value)
            )
        }
    
        console.log("speedS",speedS)
        console.log("speedM",speedM)



    // //おてつだいボーナスのどのラジオボタンが押されているかの確認
    // let speedB = document.getElementsByName('speedB'); //ラジオボタンのspeedBを全部ゲット
    // let speedBVar = 0; 
    
    // for (let i = 0; i < speedB.length; i++){
    //     if (speedB.item(i).checked){ //speedBをfor文で回してチェックされてたらvalueゲット
    //         speedBVar = Number(speedB.item(i).value);
    //     }
    // }
    // console.log("speedBVar",speedBVar)

    let speedB = document.getElementById('speedB'); //ラジオボタンのspeedBを全部ゲット
    let speedBVar = speedB.value;
    console.log("speedBVar",speedBVar)




    //食材確率アップSMがチェックされてるかの確認
    let ingredientSM=document.getElementsByName("ingredientSM")
    let ingredientS=0;  //for文の中はスコープあるから外で変数宣言しないといけない
    let ingredientM=0;
   

        for(let i=0;i<ingredientSM.length;i++){ // ingredientSとMが入った配列回している
            if(ingredientSM.item(0).checked)( //item(0)がS、item(1)がM、チェックされてたら変数変える
            ingredientS=Number(ingredientSM.item(0).value)
            )
            if(ingredientSM.item(1).checked)( 
                ingredientM=Number(ingredientSM.item(1).value)
            )
        }
        
        console.log("ingredientS",ingredientS)
        console.log("ingredientM",ingredientM)
    
   


    //おてつだいスピード性格補正のどのラジオボタンが押されているかの確認
    let speedP = document.getElementsByName('speedP'); //ラジオボタンのspeedPを全部ゲット
    let speedPVar = 0; 
    
    for (let i = 0; i < speedP.length; i++){
        if (speedP.item(i).checked){ //speedPをfor文で回してチェックされてたらvalueゲット
            speedPVar = Number(speedP.item(i).value);
        }
    }
    console.log("speedPVar",speedPVar)



    //食材確率性格補正のどのラジオボタンが押されているかの確認
    let ingredientP = document.getElementsByName('ingredientP'); //ラジオボタンのspeedPを全部ゲット
    let ingredientPVar = 0; 
    
    for (let i = 0; i < ingredientP.length; i++){
        if (ingredientP.item(i).checked){ //speedPをfor文で回してチェックされてたらvalueゲット
            ingredientPVar = Number(ingredientP.item(i).value);
        }
    }
    console.log("ingredientPVar",ingredientPVar)



    //時間を分になおす
    let time=Number(document.getElementById("time").value)
    console.log("time",time);

    

    //げんき計算
    let downenergy = time/10; //減少するげんき
    let energyave=0 //げんき補正
    let e=energy //睡眠開始時のげんき

    //for文で睡眠時のげんきの数だけ回す、その時のげんきの量のげんき補正の倍率足していき最後に睡眠時のげんきの数で割って平均出す
    for(let i=1;i<=downenergy;i++){ 

     
        if(e>=81 && e<=150){
            energyave=0.45+energyave
        }else if(e>=61 && e<=80){
            energyave=0.52+energyave

        }else if(e>=41 && e<=60){
            energyave=0.62+energyave

        }else if(e>=21 && e<=40){
            energyave=0.71+energyave

        }else if(e<=20){
            energyave=1+energyave
        }
        
        e=e-1
        console.log("e"+e)
        
    }

    console.log("downenergy"+downenergy)
    console.log("energyave"+energyave)

    energyave=energyave/downenergy 
    console.log("energyave/downenergy"+energyave)
    energyave= Math.round(energyave * 100) / 100; //小数点第3位以下を四捨五入する処理
    console.log("energyave/downenergy"+energyave)

 
    //おてつだいスピード計算
    let levelspeed=1-(level - 1)*0.002; //レベルによる補正

    let subskillspeed=speedBVar+speedS+speedM; //サブスキルの軽減値が0.35以上なら0.35にする処理&サブスキル補正
    if(subskillspeed>0.35){
        subskillspeed=0.35
    }
    console.log("subskillspeed",subskillspeed)
    subskillspeed=1-subskillspeed;
    
    let totalspeed=Orispeed*levelspeed*speedPVar*subskillspeed; //計算結果
    console.log("元気補正前totalspeed"+totalspeed)
    totalspeed=totalspeed*energyave //元気補正追加
    console.log("元気補正後totalspeed"+totalspeed)
    totalspeed=Math.round(totalspeed); //小数点四捨五入
    console.log("totalspeed",totalspeed);
    let totalspeed2=totalspeed/60; //秒を分に直す
    totalspeed2=Math.round(totalspeed2 * 10) / 10; //小数点第2位以下を四捨五入処理
    console.log(totalspeed2,Orispeed,levelspeed,speedPVar,subskillspeed);
    


    

    

    //食材関連計算

    let ingredientper=Oriingredientper*(1+(ingredientS+ingredientM)); //サブスキル込みの食材確率
    ingredientper=ingredientper*ingredientPVar //性格込みの食材確率
    ingredientper= Math.round(ingredientper * 10) / 10; //小数点第2位以下を四捨五入する処理 
    let ingredientper2=ingredientper/100; //食材確率を0.111みたいな形にする
    ingredientper2= Math.round(ingredientper2 * 1000) / 1000; //小数点第4位以下を四捨五入する処理 

    console.log("ingredientper2",ingredientper2);


    let ingredient1 = String(document.getElementById('ingredient1').value);
    ingredient1=Number(ingredient1.replace(/[^0-9]/g, '')); // 数字以外を削除する処理、/[^0-9]/gは数字以外って意味、それをreplaceで削除
    console.log("ingredient1",ingredient1);


    let ingredient2 = document.getElementById('ingredient2');
    if(ingredient2.disabled){
        ingredient2=0
    }else{
        ingredient2 = String(ingredient2.value);
        ingredient2=Number(ingredient2.replace(/[^0-9]/g, ''));     
    }
    console.log("ingredient2",ingredient2);


    
    let ingredient3 = document.getElementById('ingredient3');
    if(ingredient3.disabled){
        ingredient3=0
    }else{
        ingredient3 = String(ingredient3.value);
        ingredient3=Number(ingredient3.replace(/[^0-9]/g, ''));     
    }
    console.log("ingredient3",ingredient3);



    let ingredient=(ingredient1+ingredient2+ingredient3)/Oriingredient123; //食材を足して3(レベルによっては1とか2)で割って平均出してる
    ingredient  = Math.round(ingredient * 10) / 10; //小数点第2位以下を四捨五入する処理
    console.log("ingredient",ingredient);
    console.log("Oriingredient123",Oriingredient123);



    //計算
    let helpingcount=time/totalspeed2; //時間でおてつだいスピード割っておてつだい回数導く
    helpingcount=Math.floor(helpingcount) //小数点を切り捨てる処理


    let ingredientcount=helpingcount*ingredientper2; //食材確率からおてつだい回数のうち何回食材を持ってくるか導く
    ingredientcount=Math.round(ingredientcount) ////四捨五入する処理 
    let ingredientcount2=ingredientcount*ingredient; //それに食材数かける
    ingredientcount2= Math.round(ingredientcount2); //四捨五入する処理
    
    
    let helpingcount2=helpingcount-ingredientcount //おてつだい回数から食材の分引く
    helpingcount2=helpingcount2*berries; //おてつだい回数にきのみの数かける


    let result=helpingcount2+ingredientcount2 //きのみ数と食材数を足す
    console.log(helpingcount,helpingcount2,ingredientcount,ingredientcount2)
    console.log("result",result)


    let resultEle=document.getElementById("result"); //resultに結果表示する
    resultEle.setAttribute("class","result")
    resultEle.innerHTML=`<p>${result}個 <span class="string">(きのみ${helpingcount2}個 食材${ingredientcount2}個)</span></p>`
    



    //計算詳細

    let detailslist=document.getElementById("detailslist") //詳細リセット
    detailslist.innerHTML=""

    //タグ作成
    let counth3=document.createElement("h3");
    let countp=document.createElement("p");
    let speedh3=document.createElement("h3");
    let speedp=document.createElement("p");
    let ingredientperh3=document.createElement("h3");
    let ingredientperp=document.createElement("p");
    let ingredienth3=document.createElement("h3");
    let ingredientp=document.createElement("p");
    let berriesh3=document.createElement("h3");
    let berriesp=document.createElement("p");
    let resulth3=document.createElement("h3");
    let resultp=document.createElement("p");
    

    //作ったタグに文入れる
    speedh3.textContent=`おてつだいスピード ${totalspeed}秒`
    speedp.innerHTML=`基準おてつだい時間:${Orispeed}秒×レベル補正:${levelspeed}×性格補正:${speedPVar}×サブスキル補正:${subskillspeed}×げんき補正:${energyave}`

    counth3.textContent=`おてつだい回数 ${helpingcount}回`
    countp.innerHTML=`睡眠時間:${time}分÷おてつだいスピード:${totalspeed2}分`

    ingredientperh3.textContent=`食材確率 ${ingredientper}%`
    ingredientperp.innerHTML=`基準食材確率:${Oriingredientper}%×性格補正:${ingredientPVar}×サブスキル補正:${1+(ingredientS+ingredientM)}`

    
    berriesh3.textContent=`入手きのみ数 ${helpingcount2}個`
    berriesp.innerHTML=`おてつだい回数:${helpingcount}回-食材入手おてつだい回数:${ingredientcount}回×きのみ数:${berries}個`

    ingredienth3.textContent=`入手食材数 ${ingredientcount2}個`
    ingredientp.innerHTML=`おてつだい回数:${helpingcount}回×食材確率:${ingredientper2}%×平均食材入手数:${ingredient}個`

    resulth3.textContent=`結果 ${result}個`
    resultp.innerHTML=`入手きのみ数:${helpingcount2}個+入手食材数:${ingredientcount2}個`

    //配置する
    detailslist.appendChild(speedh3); 
    detailslist.appendChild(speedp);
    detailslist.appendChild(counth3); 
    detailslist.appendChild(countp);  
    detailslist.appendChild(ingredientperh3); 
    detailslist.appendChild(ingredientperp);
    detailslist.appendChild(berriesh3); 
    detailslist.appendChild(berriesp); 
    detailslist.appendChild(ingredienth3); 
    detailslist.appendChild(ingredientp);
    detailslist.appendChild(resulth3); 
    detailslist.appendChild(resultp);
    

    details.style.display="block" //詳細を表示する
                    
                    
                    
                
    
                    



}
    
   