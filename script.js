import { pokemondatas } from "./data.js";
console.log(pokemondatas);



//最初にポケモンリストを番号順にする
// 関数の戻り値が正の時　→　引数1を引数2の後ろに並べ替え。
// 関数の戻り値が負の時　→　引数1を引数2の前に並べ替え。
// 関数の戻り値が0の時　→　何もしない
pokemondatas.sort((a, b) => {
    if (a.number < b.number) {
        return -1;
    } else {
        return 1;
    }
})



//名前のインプットの検索候補にポケモン名表示する
window.namecreate = () => {

    let nameEle = document.getElementById("name");
    nameEle.innerHTML = ""; //リストリセット、これないとずっと追加されてしまう

    for (let i = 0; i < pokemondatas.length; i++) {
        //selectt取得
        let name = document.getElementById('name');
        //optionタグを作る
        let option = document.createElement('option');
        //テキストを追加する
        option.textContent = pokemondatas[i].name;
        //select内にoptionを配置する
        name.appendChild(option);
    }
}

namecreate(); //最初にポケモンリスト作る



// 並び替え
window.sortinput = () => {

    let sortEles = document.getElementsByName("sort");

    if (sortEles.item(0).checked) { //番号順の場合(sortElesの1番目の要素)

        //番号順
        // 関数の戻り値が正の時　→　引数1を引数2の後ろに並べ替え。
        // 関数の戻り値が負の時　→　引数1を引数2の前に並べ替え。
        // 関数の戻り値が0の時　→　何もしない
        pokemondatas.sort((a, b) => {
            if (a.number < b.number) {
                return -1;
            } else {
                return 1;
            }
        })

    } else if (sortEles.item(1).checked) { //名前順の場合(sortElesの2番目の要素)

        //名前順
        // 関数の戻り値が正の時　→　引数1を引数2の後ろに並べ替え。
        // 関数の戻り値が負の時　→　引数1を引数2の前に並べ替え。
        // 関数の戻り値が0の時　→　何もしない
        pokemondatas.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        })
    }

    namecreate() //並び替えてから再びポケモン名リスト作る
    nameinput() //ソートでポケモン名変わるとnameinput経由しないからここで発動しておく
}



//グローバル変数
let Orispeed = 1;
let Oriberries = 1;
let Oriingredientper = 1;
let Oriingredient123 = 3;
let Oribcl = 0;
let Orievolution = 1;
let Orievolutionlimit = 1;
let nameflag = "normal";



//名前変更されたときの関数
window.nameinput = () => {
    console.log("nameinput")
    let name = document.getElementById('name');
    let nameVar = String(name.value);
    nameflag = "change";

    for (let i = 0; i < pokemondatas.length; i++) {
        if (pokemondatas[i].name === nameVar) {


            //食材候補リセット
            let ingredient1 = document.getElementById('ingredient1');
            ingredient1.innerHTML = '' //ingredient1の中のHTML表記全消ししてリセット、removeChildでoptionタグ消すパターンだと新しいoptionタグ追加できないのかうまくいかなかった

            let ingredient2 = document.getElementById('ingredient2');
            ingredient2.innerHTML = ''

            let ingredient3 = document.getElementById('ingredient3');
            ingredient3.innerHTML = ''


            //食材候補作る処理
            for (let p in pokemondatas[i].ingredient1) {
                //select取得
                let Selingredient1 = document.getElementById('ingredient1');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p + " " + pokemondatas[i]["ingredient1"][p] + "個"; //.pだとなぜかできなかったから[p]にしてみた
                //selec内にoptionを配置する
                Selingredient1.appendChild(option);
            }


            //食材候補作る処理2
            for (let p in pokemondatas[i].ingredient2) {
                //select取得
                let Selingredient2 = document.getElementById('ingredient2');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p + " " + pokemondatas[i]["ingredient2"][p] + "個"; //.pだとなぜかできなかったから[p]にしてみた
                //select内にoptionを配置する
                Selingredient2.appendChild(option);
            }


            //食材候補作る処理3
            for (let p in pokemondatas[i].ingredient3) {
                //select取得
                let Selingredient3 = document.getElementById('ingredient3');
                //optionタグを作る
                let option = document.createElement('option');
                //テキストを追加する
                option.textContent = p + " " + pokemondatas[i]["ingredient3"][p] + "個"; //.pだとなぜかできなかったから(pが変数じゃなくて"p"というキーだと認識されたっぽい)[p]にしてみた
                //select内にoptionを配置する
                Selingredient3.appendChild(option);
            }


            //おてつだいスピード&食材確率&最大所持数&進化回数進化上限入手
            Orispeed = pokemondatas[i].speed;
            Oriingredientper = pokemondatas[i].ingredientper;
            Oribcl = pokemondatas[i].basecarrylimit;
            Orievolution = pokemondatas[i].evolution;
            Orievolutionlimit = pokemondatas[i].evolutionlimit;
            console.log("Orievolution", Orievolution, "Orievolutionlimit", Orievolutionlimit)


            //きのみの数を設定
            if (pokemondatas[i].specialty == "きのみ") {
                Oriberries = 2;
            } else if (pokemondatas[i].specialty == "食材" || pokemondatas[i].specialty == "スキル") {
                Oriberries = 1;
            }
        }
    }
}

nameinput() //これないと初期値フシギダネの食材が表示されない



//レベルによって食材非表示にする処理
window.levelinput = () => {

    let level = Number(document.getElementById("level").value);
    let ingredient2 = document.getElementById('ingredient2');
    let ingredient3 = document.getElementById('ingredient3');
    let ingredient2h3 = document.getElementById('ingredient2h3');
    let ingredient3h3 = document.getElementById('ingredient3h3');

    ingredient2.disabled = false //リセット
    ingredient3.disabled = false
    ingredient2.classList.remove("disabled");//クラス消す
    ingredient3.classList.remove("disabled");
    ingredient2h3.classList.remove("disabledh3");//クラス消す
    ingredient3h3.classList.remove("disabledh3");


    if (level < 30) {
        ingredient2.disabled = true
        ingredient2.setAttribute("class", "disabled") //hoverオフにしたりするcss適用するためににclass名つける
        ingredient2h3.setAttribute("class", "disabledh3")
        ingredient3.disabled = true
        ingredient3.setAttribute("class", "disabled")
        ingredient3h3.setAttribute("class", "disabledh3")
        Oriingredient123 = 1

    } else if (level < 60) {
        ingredient3.disabled = true
        ingredient3.setAttribute("class", "disabled")
        ingredient3h3.setAttribute("class", "disabledh3")
        Oriingredient123 = 2

    } else {
        Oriingredient123 = 3
    }
}


//クリアボタンクリックしたときの関数
window.clearbtn = () => {
    document.inputform.reset(); //フォームをリセット、getbyNameしなくてもできる場合がある、非推奨

    // let result = document.getElementById("result"); //アウトプット初期値に戻してる
    // result.innerHTML = "<p> </p>"
    // let details = document.getElementById("details");
    // details.style.display = "none"
    // let detailsbcl = document.getElementById("detailsbcl")
    // detailsbcl.style.display = "none"


    //ポケモンによって結果の進化回数の初期チェックを変えたり非活性にする処理
    let evbclzero = document.getElementById("evbclzero");
    let evbcl1 = document.getElementById("evbcl1");
    let evbcl2 = document.getElementById("evbcl2");


    // 最大所持数のサブスキルのチェックリセット
    let subskillbclS = document.getElementById("subskillbclS");
    let subskillbclM = document.getElementById("subskillbclM");
    let subskillbclL = document.getElementById("subskillbclL");

    subskillbclS.checked = false
    subskillbclM.checked = false
    subskillbclL.checked = false


    //進化回数の初期チェック変える
    evbclzero.checked = true; //初期チェックリセット

    if (Orievolution === 1) {
        evbclzero.checked = true;
    } else if (Orievolution === 2) {
        evbcl1.checked = true;
    } else if (Orievolution === 3) {
        evbcl2.checked = true;
    }


    //進化回数非活性にする
    evbcl1.disabled = false; //リセット
    evbcl2.disabled = false;

    if (Orievolution === 1) {
        evbcl1.disabled = true;
        evbcl2.disabled = true;
    }
    if (Orievolution === 2) {
        evbcl2.disabled = true;
    }

    bclinput(); //最大所持数の関数発動 

    console.log("clear")
}



//計算ボタンクリックしたときの関数
window.calculationbtn = () => {  //scriptタグにtype="module"がある場合、onclickの関数はconstの代わりにwindow.にしないとエラーがでて発動しない



    //値入手エリア
    let name = String(document.getElementById('name').value);
    console.log("name", name);
    let level = Number(document.getElementById('level').value);
    console.log("level", level);
    let energy = Number(document.getElementById('energy').value);
    console.log("energy", energy);



    //計算詳細非表示
    let details = document.getElementById("details");
    details.style.display = "none"

    let detailsbcl = document.getElementById("detailsbcl")
    detailsbcl.style.display = "none"




    //きのみの数Sがチェックされてるかの確認&きのみの数確定
    let berrieS = document.getElementById("berrieS")
    let berrieSVar = 0

    if (berrieS.checked) {
        berrieSVar = 1
    }
    let berries = Oriberries + berrieSVar

    console.log("oberries", Oriberries);
    console.log("berrieSV", berrieSVar);
    console.log("berries", berries);



    //おてつだいスピードSMがチェックされてるかの確認
    let speedSM = document.getElementsByName("speedSM")
    let speedS = 0;  //for文の中はスコープあるから外で変数宣言しないといけない
    let speedM = 0;


    for (let i = 0; i < speedSM.length; i++) { // speedSとMが入った配列回している
        if (speedSM.item(0).checked) ( //item(0)がS、item(1)がM、チェックされてたら変数変える
            speedS = Number(speedSM.item(0).value)
        )
        if (speedSM.item(1).checked) (
            speedM = Number(speedSM.item(1).value)
        )
    }

    console.log("speedS", speedS)
    console.log("speedM", speedM)



    // //おてつだいボーナスのどのラジオボタンが押されているかの確認
    let speedB = document.getElementById('speedB'); //セレクトのspeedBゲット
    let speedBVar = Number(speedB.value);
    console.log("speedBVar", speedBVar)



    //食材確率アップSMがチェックされてるかの確認
    let ingredientSM = document.getElementsByName("ingredientSM")
    let ingredientS = 0;  //for文の中はスコープあるから外で変数宣言しないといけない
    let ingredientM = 0;


    for (let i = 0; i < ingredientSM.length; i++) { // ingredientSとMが入った配列回している
        if (ingredientSM.item(0).checked) ( //item(0)がS、item(1)がM、チェックされてたら変数変える
            ingredientS = Number(ingredientSM.item(0).value)
        )
        if (ingredientSM.item(1).checked) (
            ingredientM = Number(ingredientSM.item(1).value)
        )
    }

    console.log("ingredientS", ingredientS)
    console.log("ingredientM", ingredientM)
    let ingredientSMVar = ingredientS + ingredientM;



    //おてつだいスピード性格補正のどのラジオボタンが押されているかの確認
    let speedP = document.getElementsByName('speedP'); //ラジオボタンのspeedPを全部ゲット
    let speedPVar = 0;

    for (let i = 0; i < speedP.length; i++) {
        if (speedP[i].checked) { //speedPをfor文で回してチェックされてたらvalueゲット speedP.item(i).checkedでもspeedP[i].checkedでも可
            speedPVar = Number(speedP[i].value);
        }
    }
    console.log("speedPVar", speedPVar)



    //食材確率性格補正のどのラジオボタンが押されているかの確認
    let ingredientP = document.getElementsByName('ingredientP'); //ラジオボタンのspeedPを全部ゲット
    let ingredientPVar = 0;

    for (let i = 0; i < ingredientP.length; i++) {
        if (ingredientP[i].checked) { //speedPをfor文で回してチェックされてたらvalueゲット
            ingredientPVar = Number(ingredientP[i].value);
        }
    }
    console.log("ingredientPVar", ingredientPVar)



    //時間を分になおす
    let time = Number(document.getElementById("time").value)
    console.log("time", time);



    //げんき計算
    let downenergy = time / 10; //減少するげんき
    let energyave = 0 //げんき補正
    let e = energy //睡眠開始時のげんき



    //for文で睡眠時のげんきの数だけ回す、その時のげんきの量のげんき補正の倍率足していき最後に睡眠時のげんきの数で割って平均出す
    for (let i = 1; i <= downenergy; i++) {

        if (e >= 81 && e <= 150) {
            energyave = 0.45 + energyave
        } else if (e >= 61 && e <= 80) {
            energyave = 0.52 + energyave

        } else if (e >= 41 && e <= 60) {
            energyave = 0.62 + energyave

        } else if (e >= 21 && e <= 40) {
            energyave = 0.71 + energyave

        } else if (e <= 20) {
            energyave = 1 + energyave
        }

        e = e - 1
        console.log("e" + e)
    }

    console.log("downenergy" + downenergy)
    console.log("energyave" + energyave)

    energyave = energyave / downenergy
    console.log("energyave/downenergy" + energyave)
    energyave = Math.round(energyave * 100) / 100; //小数点第3位以下を四捨五入する処理
    console.log("energyave/downenergy" + energyave)



    //おてつだいスピード計算
    let levelspeed = 1 - (level - 1) * 0.002; //レベルによる補正

    let subskillspeed = speedS + speedM + speedBVar; //サブスキルの軽減値が0.35以上なら0.35にする処理&サブスキル補正
    if (subskillspeed > 0.35) {
        subskillspeed = 0.35
    }
    console.log("subskillspeed", subskillspeed)
    subskillspeed = 1 - subskillspeed;

    let totalspeed = Orispeed * levelspeed * speedPVar * subskillspeed; //計算結果
    console.log("元気補正前totalspeed" + totalspeed)
    totalspeed = totalspeed * energyave //元気補正追加
    console.log("元気補正後totalspeed" + totalspeed)
    totalspeed = Math.round(totalspeed); //小数点四捨五入
    console.log("totalspeed", totalspeed);
    let totalspeed2 = totalspeed / 60; //秒を分に直す
    totalspeed2 = Math.round(totalspeed2 * 10) / 10; //小数点第2位以下を四捨五入処理
    console.log(totalspeed2, Orispeed, levelspeed, speedPVar, subskillspeed);



    //食材関連計算
    let ingredientper = Oriingredientper * (1 + (ingredientS + ingredientM)); //サブスキル込みの食材確率
    ingredientper = ingredientper * ingredientPVar //性格込みの食材確率
    ingredientper = Math.round(ingredientper * 10) / 10; //小数点第2位以下を四捨五入する処理 
    let ingredientper2 = ingredientper / 100; //食材確率を0.111みたいな形にする
    ingredientper2 = Math.round(ingredientper2 * 1000) / 1000; //小数点第4位以下を四捨五入する処理 

    console.log("ingredientper2", ingredientper2);


    let ingredient1 = String(document.getElementById('ingredient1').value);
    ingredient1 = Number(ingredient1.replace(/[^0-9]/g, '')); // 数字以外を削除する処理、/[^0-9]/gは数字以外って意味、それをreplaceで削除
    console.log("ingredient1", ingredient1);


    let ingredient2 = document.getElementById('ingredient2');
    if (ingredient2.disabled) {
        ingredient2 = 0
    } else {
        ingredient2 = String(ingredient2.value);
        ingredient2 = Number(ingredient2.replace(/[^0-9]/g, ''));
    }
    console.log("ingredient2", ingredient2);


    let ingredient3 = document.getElementById('ingredient3');
    if (ingredient3.disabled) {
        ingredient3 = 0
    } else {
        ingredient3 = String(ingredient3.value);
        ingredient3 = Number(ingredient3.replace(/[^0-9]/g, ''));
    }
    console.log("ingredient3", ingredient3);


    let ingredient = (ingredient1 + ingredient2 + ingredient3) / Oriingredient123; //食材を足して3(レベルによっては1とか2)で割って平均出してる
    ingredient = Math.round(ingredient * 10) / 10; //小数点第2位以下を四捨五入する処理
    console.log("ingredient", ingredient);
    console.log("Oriingredient123", Oriingredient123);



    //計算
    let helpingcount = time / totalspeed2; //時間でおてつだいスピード割っておてつだい回数導く
    helpingcount = Math.floor(helpingcount) //小数点を切り捨てる処理

    let ingredientcount = helpingcount * ingredientper2; //食材確率からおてつだい回数のうち何回食材を持ってくるか導く
    ingredientcount = Math.round(ingredientcount) ////四捨五入する処理 
    let ingredientcount2 = ingredientcount * ingredient; //それに食材数かける
    ingredientcount2 = Math.round(ingredientcount2); //四捨五入する処理

    let helpingcount2 = helpingcount - ingredientcount //おてつだい回数から食材の分引く
    helpingcount2 = helpingcount2 * berries; //おてつだい回数にきのみの数かける

    let result = helpingcount2 + ingredientcount2 //きのみ数と食材数を足す
    console.log(helpingcount, helpingcount2, ingredientcount, ingredientcount2)
    console.log("result", result)

    let resultEle = document.getElementById("result"); //resultに結果表示する
    resultEle.setAttribute("class", "result")
    resultEle.innerHTML = `<p>${result}個</p>`  //<span class="string">(きのみ${helpingcount2}個 食材${ingredientcount2}個)</span>



    //最大所持数

    //summary文字変える
    let summarybcl = document.getElementById("summarybcl")
    summarybcl.textContent = `${name}の最大所持数は？`

    //h3文字変える
    let bclh3 = document.getElementById("bclh3")
    bclh3.textContent = `${Oribcl}個`

    detailsbcl.style.display = "block" //詳細を表示する



    //計算詳細
    let detailslist = document.getElementById("detailslist")
    detailslist.innerHTML = "" //詳細リセット

    //タグ作成
    let counth3 = document.createElement("h3");
    let countp = document.createElement("p");
    let speedh3 = document.createElement("h3");
    let speedp = document.createElement("p");
    let ingredientperh3 = document.createElement("h3");
    let ingredientperp = document.createElement("p");
    let ingredienth3 = document.createElement("h3");
    let ingredientp = document.createElement("p");
    let berriesh3 = document.createElement("h3");
    let berriesp = document.createElement("p");
    let resulth3 = document.createElement("h3");
    let resultp = document.createElement("p");

    //作ったタグに文入れる
    speedh3.textContent = `おてつだいスピード ${totalspeed}秒`
    speedp.innerHTML = `基準おてつだい時間:${Orispeed}秒×レベル補正:${Math.round(levelspeed * 1000) / 1000}×性格補正:${speedPVar}×サブスキル補正:${Math.round(subskillspeed * 100) / 100}×げんき補正:${energyave}`

    counth3.textContent = `おてつだい回数 ${helpingcount}回`
    countp.innerHTML = `睡眠時間:${time}分÷おてつだいスピード:${totalspeed2}分`

    ingredientperh3.textContent = `食材確率 ${ingredientper}%`
    ingredientperp.innerHTML = `基準食材確率:${Oriingredientper}%×性格補正:${ingredientPVar}×サブスキル補正:${Math.round((1 + ingredientSMVar) * 100) / 100}` //小数点第3位以下を四捨五入する処理

    berriesh3.textContent = `入手きのみ数 ${helpingcount2}個`
    berriesp.innerHTML = `きのみ入手おてつだい回数:${helpingcount - ingredientcount}回×きのみ数:${berries}個`

    ingredienth3.textContent = `入手食材数 ${ingredientcount2}個`
    ingredientp.innerHTML = `食材入手おてつだい回数:${ingredientcount}回×平均食材入手数:${ingredient}個`

    resulth3.textContent = `結果 ${result}個`
    resultp.innerHTML = `入手きのみ数:${helpingcount2}個+入手食材数:${ingredientcount2}個`

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

    details.style.display = "block" //詳細を表示する



    //最大所持数関連

    if (nameflag === "change") { //名前変わってた場合のみポケモンによって結果の進化回数の初期チェックを変えたり非活性にする処理する


        let evbclzero = document.getElementById("evbclzero");
        let evbcl1 = document.getElementById("evbcl1");
        let evbcl2 = document.getElementById("evbcl2");


        //進化回数の初期チェック変える
        evbclzero.checked = true; //初期チェックリセット

        if (Orievolution === 1) {
            evbclzero.checked = true;
        } else if (Orievolution === 2) {
            evbcl1.checked = true;
        } else if (Orievolution === 3) {
            evbcl2.checked = true;
        }


        //進化回数非活性にする
        evbcl1.disabled = false; //リセット
        evbcl2.disabled = false;

        if (Orievolution === 1) {
            evbcl1.disabled = true;
            evbcl2.disabled = true;
        }
        if (Orievolution === 2) {
            evbcl2.disabled = true;
        }
    }
    bclinput(); //最大所持数の関数発動 

    nameflag = "normal"; //nameflagリセット

}


//最大所持数変える関数
window.bclinput = () => {

    //進化状況
    let evbcls = document.getElementsByName("evbcl");
    let evbclVar = 0;

    for (let i = 0; i < evbcls.length; i++) {
        if (evbcls.item(i).checked) {
            evbclVar = Number(evbcls.item(i).value);
        }
    }
    console.log(`evbclVar${evbclVar}`)


    //サブスキル
    let subskillbcls = document.getElementsByName("subskillbcl");
    let S = 0;
    let M = 0;
    let L = 0;

    for (let i = 0; i < subskillbcls.length; i++) {
        if (subskillbcls.item(0).checked) {
            S = 6;
        }
        if (subskillbcls.item(1).checked) {
            M = 12;
        }
        if (subskillbcls.item(2).checked) {
            L = 18;
        }
    }
    console.log(`S${S}M${M}L${L}`)

    let bclh3 = document.getElementById("bclh3")
    bclh3.textContent = `${Oribcl + evbclVar + S + M + L}個`
}