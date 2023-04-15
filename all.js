const url="https://hexschool.github.io/js-filter-data/data.json";
const productsList = document.querySelector('.showList');
let data=[];

//撈取資料

function getData(){
    axios.get(url)
    .then(res=>{
        data=res.data;
        renderData(data);
    })
    .catch(err=>console.log(err))
}

getData();

function renderData(d){
    let str='';
    d.forEach(item=>{
      str += `<tr>
          <td>${item.作物名稱}</td>
          <td>${item.市場名稱}</td>
          <td>${item.上價}</td>
          <td>${item.中價}</td>
          <td>${item.下價}</td>
          <td>${item.平均價}</td>
          <td>${item.交易量}</td>
          </tr>`
    });
    productsList.innerHTML=str;
}

//篩選資料、切換tab

const buttonGroup = document.querySelector(".button-group");

buttonGroup.addEventListener('click',function(e){
    e.preventDefault;
    if (e.target.nodeName=='BUTTON'){
        //btn按鈕樣式全消除
        let tabs=document.querySelectorAll('.button-group button');
        tabs.forEach(item=>item.classList.remove('active'));

        //篩選顯示
        let type=e.target.dataset.type;
        console.log(type);
        let filterData=[];
        if (type==='N04'){
            filterData=data.filter(item=>
                item.種類代碼==='N04'
            )
        }else if(type==='N05'){
            filterData=data.filter(item=>
                item.種類代碼==='N05'
            )
        }else{
            filterData=data.filter(item=>
                item.種類代碼==='N06'
            )
        }
        renderData(filterData);
        //按鈕樣式
        e.target.classList.add('active');
    }
})

//搜尋作物

const crop=document.getElementById('crop');
const searchBtn = document.querySelector('.search');

searchBtn.addEventListener('click',function(e){
    e.preventDefault;
    if (crop.value===''){
        alert('請輸入作物名稱');
        return
    }

    // let filterMatch = [];
    // filterMatch = data.filter(item => {
    //     item.作物名稱.match(crop.value.trim());
    // });
    // match無法使用，顯示Cannot read properties of null (reading 'match')

    filterMatch = data.filter(item => {
        item.作物名稱===crop.value.trim();
    });
    
    if (filterMatch.length===0){
        productsList.innerHTML='<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>'
    }else{
        renderData(filterMatch);
    }
    crop.value='';
})

//select排序資料

const select = document.querySelector('.sort-select');

select.addEventListener('change',function(e){
    // console.log(e.target.value)
    e.preventDefault;
    switch (e.target.value) {
        case '依上價排序'||'上價': //網頁縮小後select選單無法執行，如附圖。
            selectChange('上價')
            break;
        case '依中價排序'||'中價':
            selectChange('中價')
            break;
        case '依下價排序'||'下價':
            selectChange('下價')
            break;
        case '依平均價排序'||'平均價':
            selectChange('平均價')
            break;
        case '依交易量排序'||'交易量':
            selectChange('交易量')
            break;
    }
})

function selectChange(value){
    // console.log('執行')
    sortData = data.sort((a,b)=>b[value] - a[value]);
    renderData(sortData);
}

//icon排序資料

const thead = document.querySelector('.js-sort-advanced');
thead.addEventListener('click',function(e){
    e.preventDefault;
    if (e.target.nodeName==="I"){
        let sortData=[];
        let price = e.target.dataset.price;

        if(e.target.dataset.sort==='up'){
            sortData = data.sort((a,b)=>b[price] - a[price]);
        }else if(e.target.dataset.sort==='down'){
            sortData = data.sort((a,b)=>a[price] - b[price]);
        }

        renderData(sortData);
    }
})