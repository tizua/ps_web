import {pokemondatas} from "./data.js";
console.log(pokemondatas);




//名前のインプットの検索候補にポケモン名表示する
for(let i = 0; i < pokemondatas.length; i++){

    //datalist取得
    let namedata = document.getElementById('namedata');
    //optionタグを作る
    let option = document.createElement('option');
    //テキストを追加する
    option.textContent = pokemondatas[i].name;
    //datalist内にoptionを配置する
    namedata.appendChild(option);
}




//ポケモンの名前入力したときの関数
//色々な関数で使いたいからスコープ外に配置
let Orispeed=1;
let Oriberries=1;
let Oriingredientper=1;


//名前入力したときの関数
window.nameinput=()=>{


    let name = document.getElementById('name');
    name = String(name.value);
    
    
    for(let i = 0; i < pokemondatas.length; i++){ 
        if(pokemondatas[i].name===name){
           
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
                let ingredient1 = document.getElementById('ingredient1');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient1"][p]+"個"; //.pだとなぜかできなかったから[p]にしてみた
                //selec内にoptionを配置する
                ingredient1.appendChild(option);
            }

            //食材候補作る処理2
            for(let p in pokemondatas[i].ingredient2){
                //select取得
                let ingredient2 = document.getElementById('ingredient2');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient2"][p]+"個"; //.pだとなぜかできなかったから[p]にしてみた
                //select内にoptionを配置する
                ingredient2.appendChild(option);
            }

            //食材候補作る処理3
            for(let p in pokemondatas[i].ingredient3){
                //select取得
                let ingredient3 = document.getElementById('ingredient3');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p+" "+pokemondatas[i]["ingredient3"][p]+"個"; //.pだとなぜかできなかったから(pが変数じゃなくて"p"というキーだと認識されたっぽい)[p]にしてみた
                //select内にoptionを配置する
                ingredient3.appendChild(option);
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

        } 
       
    }   
}




//計算ボタンクリックしたときの関数

window.calculation=()=>{  //scriptタグにtype="module"がある場合、onclickの関数はconstの代わりにwindow.にしないとエラーがでて発動しない


    //値入手エリア
    let name = String(document.getElementById('name').value);
    console.log("name",name);

    let level = Number(document.getElementById('level').value);
    console.log("level",level);
    

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


    //おてつだいボーナスのどのラジオボタンが押されているかの確認
    let speedB = document.getElementsByName('speedB'); //ラジオボタンのspeedBを全部ゲット
    let speedBVar = 0; 
    
    for (let i = 0; i < speedB.length; i++){
        if (speedB.item(i).checked){ //speedBをfor文で回してチェックされてたらvalueゲット
            speedBVar = Number(speedB.item(i).value);
        }
    }
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

 
   //おてつだいスピード計算
    let levelspeed=1-(level - 1)*0.002; //レベルによる補正

    let subskillspeed=speedBVar+speedS+speedM; //サブスキルの軽減値が0.35以上なら0.35にする処理&サブスキル補正
    if(subskillspeed>0.35){
        subskillspeed=0.35
    }
    console.log("subskillspeed",subskillspeed)
    subskillspeed=1-subskillspeed;
    
    let totalspeed=Orispeed*levelspeed*speedPVar*subskillspeed; //計算結果
    totalspeed=Math.floor(totalspeed); //小数点切り捨て
    totalspeed=totalspeed/60; //秒を分に直す
    totalspeed=Math.floor(totalspeed * 10) / 10; //小数点第2位以下を切り捨てる処理
    console.log(totalspeed,Orispeed,levelspeed,speedPVar,subskillspeed);
    


    //時間を分になおす
    let time=document.getElementById("time").value
    let time1=Number(time.slice( 0, 2 )); //左側の時間の値をスライスで切り抜いてる
    let time2=Number(time.slice( 3, 5 )); //右側の分の値をスライスで切り抜いてる
    time=time1*60+time2; //時間は60をかけて分はそのまま足して分に直す
    console.log("time",time);



    //食材関連計算

    let ingredientper=Oriingredientper*(1+(ingredientS+ingredientM)); //サブスキル込みの食材確率
    ingredientper=ingredientper*ingredientPVar //性格込みの食材確率
    ingredientper= Math.floor(ingredientper * 10) / 10; //小数点第2位以下を切り捨てる処理 
    ingredientper=ingredientper/100; //食材確率を0.111みたいな形にする
  
    console.log("ingredientper",ingredientper);


    let ingredient1 = String(document.getElementById('ingredient1').value);
    ingredient1=Number(ingredient1.replace(/[^0-9]/g, '')); // 数字以外を削除する処理、/[^0-9]/gは数字以外って意味、それをreplaceで削除
    console.log("ingredient1",ingredient1);

    let ingredient2 = String(document.getElementById('ingredient2').value);
    ingredient2=Number(ingredient2.replace(/[^0-9]/g, ''));
    console.log("ingredient2",ingredient2);

    let ingredient3 = String(document.getElementById('ingredient3').value);
    ingredient3=Number(ingredient3.replace(/[^0-9]/g, ''));
    console.log("ingredient3",ingredient3);

    let ingredient=(ingredient1+ingredient2+ingredient3)/3; //食材を足して3で割って平均出してる
    ingredient  = Math.floor(ingredient * 10) / 10; //小数点第2位以下を切り捨てる処理
    console.log("ingredient",ingredient);





    //計算
    let helpingcount=time/totalspeed; //時間でおてつだいスピード割っておてつだい回数導く
    helpingcount=Math.floor(helpingcount * 10) / 10; //小数点第2位以下を切り捨てる処理

    let helpingcount2=helpingcount*berries; //おてつだい回数にきのみの数かける


    let ingredientcount=helpingcount*ingredientper; //食材確率からおてつだい回数のうち何回食材を持ってくるか導く
    ingredientcount=ingredientcount*(ingredient-1); //それに食材数かける
    ingredientcount= Math.floor(ingredientcount * 10) / 10; //小数点第2位以下を切り捨てる処理 

    let result=helpingcount2+ingredientcount
    result=Math.floor(result) //小数点切り捨てる処理 
    console.log(helpingcount,helpingcount2,ingredientcount)
    console.log("result",result)

    let resultEle=document.getElementById("result")
    resultEle.textContent=result+"個"



}
    
   