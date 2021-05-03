//宣告array存放BMI資料
var UserArray = JSON.parse(localStorage.getItem('userArray')) || [];
var today = new Date();

//抓今天時間
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let todayStr = (year +'-' + month +'-' + day);

//當看結果被點擊
let calculate = document.querySelector('.calculate');
calculate.addEventListener('click', BMI, false);

//初始化
UpdatePage(UserArray);  

//刪除localStorage
// localStorage.removeItem('userArray');

//計算BMI並存取資料和更新資料
function BMI() {
    deleteData();
    let height = (document.querySelector('.height').value);
    let weight = document.querySelector('.weight').value;
    let heightM = height/100;
    let BMI = weight / (heightM * heightM);
    BMI = BMI.toFixed(2);
    let status = BMIStatus(BMI);    
    saveData(status,BMI,height,weight);
    UpdatePage(UserArray);
}

//判斷BMI狀態
function BMIStatus(BMI) {
    let status = '';
    if (BMI >= 35) {
        status = '重度肥胖';
        return status;
    } else if (BMI < 35 && BMI >= 30) {
        status = '中度肥胖';
        return status;
    }
    else if (BMI < 30 && BMI >= 25) {
        status = '輕度肥胖';
        return status;
    }
    else if (BMI >= 18.5 && BMI < 25) {
        status = '理想';
        return status;
    }
    else {
        status = '體重過輕';
        return status;
    }
}

//存取資料到localStorage
function saveData(status,BMI,height,weight){
    let BMIObj = {
        "status" : status,
        "BMI"    : BMI,
        "height" : height,
        "weight" : weight
    }
    UserArray.push(BMIObj);

    localStorage.setItem('userArray',JSON.stringify(UserArray));
}

//更新資料到html
function UpdatePage(array){
    let BMITable = document.querySelector('.BMITable');
    //從localStorage抓資料
    let tmpArray = JSON.parse(localStorage.getItem('userArray'));    
    //產生html
    for(let i=0;i<tmpArray.length;i++){
        let BMIStatus = tmpArray[i].status;
        let BMI = tmpArray[i].BMI;
        let height = tmpArray[i].height;
        let weight = tmpArray[i].weight;        
        BMITable.innerHTML +=
        `
        <div class="BMIInfo BMIInfo${i}">                    
            <div class="BMIStatus">
                <div class="statusColor statusColor${i}"></div>
                <div>${BMIStatus}</div>
            </div>
            <div class="BMIData">
                <div>
                    <div class="litteTitle">BMI</div>
                    <h2>${BMI}</h2>
                </div>
                <div>
                    <div class="litteTitle">height</div>
                    <h2>${height}cm</h2>
                </div>
                <div>
                    <div class="litteTitle">weight</div>
                    <h2>${weight}Kg</h2>
                </div>
            </div>
            <div class="Date">${todayStr}</div>
        </div>
        `;        
        //改變BMI狀態顏色
        let tmpstatusColor = '.statusColor'+i;
        let statusColor =document.querySelector(tmpstatusColor);
        switch(BMIStatus){
            case '重度肥胖' :
                statusColor.style.background = '#FF1200';   
                statusColor.style['box-shadow'] = '2px 0 3px 0 rgba(255,18,0,0.29)';
            break;
            case '中度肥胖' :   
                statusColor.style.background = '#FF6C03';
                statusColor.style['box-shadow'] = '2px 0 3px 0 rgba(255,108,3,0.29)';
            break;
            case '輕度肥胖' :
                statusColor.style.background = 'pink';
                statusColor.style['box-shadow'] = '2px 0 3px 0 rgba(255,108,3,0.29)';
            break;
            case '理想' :
                statusColor.style.background = '#86D73F';
                statusColor.style['box-shadow'] = '2px 0 3px 0 rgba(134,215,63,0.29)';
            break;
            case '體重過輕' :
                statusColor.style.background = '#31BAF9';
                statusColor.style['box-shadow'] = '2px 0 3px 0 rgba(49,186,249,0.29)';
            break;
        }
    }   
}

//刪除資料準備新增
function deleteData(){
    for (let i = 0; i < UserArray.length; i++) {        
        let BMITable = document.querySelector('.BMITable');
        let tmp = ".BMIInfo" +i;
        let BMIInfo = document.querySelector(tmp);
        BMITable.removeChild(BMIInfo);
    }
}