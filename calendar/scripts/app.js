'use strict';
const DemoEvents ='DemoEvents';
// Массивы данных
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const filter = ['Personal', 'Business', 'Family', 'Holiday', 'ETC'];
// Переменные для шапки
const nowFullDate = new Date();
let nowMonth = nowFullDate.getMonth();
let nowFullYear = nowFullDate.getFullYear();
// DLC переменные
const nowDay = nowFullDate.getDay();
const nowDate = nowFullDate.getDate();
// узнаем сколько дней в текущем месяце
let howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
// узнаем сколько дней в прошлом месяце
let howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
// узнаем сколько дней в следующем месяце
let howDaysNextMonth = new Date(nowFullYear,nowMonth+2,0).getDate();
// узнаем индекс первого дня текущего месяца
let indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
// узнаем индекс последнего дня текущего месяца
let indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
// Обращения к дереву
const nowMonthDOM = document.querySelector('.activeMonth');
const nowFullYearDOM = document.querySelector('.activeYear');

const nowMonthDOMbig = document.querySelector('.activeMonthBig');
const nowFullYearDOMbig = document.querySelector('.activeYearBig');

let all=0;
// Первая отрисовка календаря
(()=>{
    DrawHeaderSmallCalendar(nowMonth,nowFullYear);
    DrawDaysSmallCalendar();
    DrawDatesSmallCalendar(indexlFirstDayNowMonth, howDaysPrevMonth, howDays,indexLastDayNowMonth);
    
    DrawHeaderBigCalendar(nowMonth,nowFullYear);
    DrawDaysBigCalendar();
    DrawDatesBigCalendar (indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);

    basicLoad();
    initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
    completionSelect();
})();

// ==========================================================================================

// Вставка шапку названия дней
function DrawDaysSmallCalendar(){ 
    for (let i=0;i<dayNames.length;i++){
        let spanCreator = document.createElement('span');
        document.querySelector('.calendar-mini-body').append(spanCreator);
        let spanArray = document.querySelector('.calendar-mini-body');
        spanArray.lastElementChild.classList.add('ShortNameDay');
        spanArray.lastElementChild.classList.add(`ShortNameDay-${dayNames[i]}`);
        spanArray.lastElementChild.textContent=dayNames[i].substring(0,3);
    }
}  
function DrawDaysBigCalendar(){
    for (let i=0;i<dayNames.length;i++){
        let spanCreator = document.createElement('span');
        document.querySelector('.right-block-main-calendar').append(spanCreator);
        let spanArray = document.querySelector('.right-block-main-calendar');
        spanArray.lastElementChild.classList.add('FullNameDay');
        spanArray.lastElementChild.classList.add(`FullNameDay-${dayNames[i]}`);
        spanArray.lastElementChild.textContent=dayNames[i];
    }
}
// отрисовка в шапке месяца и года
function DrawHeaderSmallCalendar (nowMonth, nowFullYear){
    nowMonthDOM.textContent=monthNames[nowMonth];
    nowFullYearDOM.textContent=nowFullYear;
}
function DrawHeaderBigCalendar (nowMonth, nowFullYear){
    nowMonthDOMbig.textContent=monthNames[nowMonth]+' ';
    nowFullYearDOMbig.textContent=nowFullYear;
}

// =======================================================================================

// функция отрисовки дат
function DrawDatesSmallCalendar (indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth) {
    let normalizeInit = 0
    // Заполняем предыдущие дни
    for (let j=0;j<indexlFirstDayNowMonth;j++){
        let spanCreator = document.createElement('span');
        document.querySelector('.calendar-mini-body').append(spanCreator);
        let spanArray = document.querySelector('.calendar-mini-body');
        spanArray.lastElementChild.classList.add(`Date-mini-calendar-prev`);
        spanArray.lastElementChild.classList.add(`Date-mini-calendar`);
        spanArray.lastElementChild.textContent=howDaysPrevMonth-indexlFirstDayNowMonth+1+j; 
        normalizeInit+=1
    }
    // Заполняем текущие дни
    for (let j=0;j<howDays;j++){
        let spanCreator = document.createElement('span');
        document.querySelector('.calendar-mini-body').append(spanCreator);
        let spanArray = document.querySelector('.calendar-mini-body');
        spanArray.lastElementChild.classList.add(`Date-mini-calendar-now`);
        spanArray.lastElementChild.classList.add(`Date-mini-calendar`);
        if (nowFullDate.getDate()==j+1 && nowFullDate.getMonth()==monthNames.indexOf (nowMonthDOM.textContent) && nowFullDate.getFullYear()==Number(nowFullYearDOM.textContent)){
            spanArray.lastElementChild.classList.add(`Date-mini-calendar-today`);
        }
        spanArray.lastElementChild.textContent=j+1; 
        normalizeInit+=1
    }
    // Заполняем следующие дни
    let HelpDay=0
    if (normalizeInit<=35){
        for (let j=13;j>indexLastDayNowMonth;j--){
            let spanCreator = document.createElement('span');
            document.querySelector('.calendar-mini-body').append(spanCreator);
            let spanArray = document.querySelector('.calendar-mini-body');
            spanArray.lastElementChild.classList.add(`Date-mini-calendar-next`);
            spanArray.lastElementChild.classList.add(`Date-mini-calendar`);
            HelpDay+=1
            spanArray.lastElementChild.textContent=HelpDay; 
        }
    } else {
        for (let j=6;j>indexLastDayNowMonth;j--){
            let spanCreator = document.createElement('span');
            document.querySelector('.calendar-mini-body').append(spanCreator);
            let spanArray = document.querySelector('.calendar-mini-body');
            spanArray.lastElementChild.classList.add(`Date-mini-calendar-next`);
            spanArray.lastElementChild.classList.add(`Date-mini-calendar`);
            HelpDay+=1
            spanArray.lastElementChild.textContent=HelpDay; 
        }
    }
    PrevMonthSmall();
    NextMonthSmall();
    document.querySelectorAll('.Date-mini-calendar').forEach(el=>{
        el.addEventListener('click',()=>{
            document.querySelectorAll('.Date-mini-calendar').forEach(elem=>{
                elem.classList.remove('Date-mini-calendar-active');
            });
            el.classList.toggle('Date-mini-calendar-active');

            const monthActiveFromSmall = monthNames.findIndex(el=>{
                return el==document.querySelector('.activeMonth').textContent
            });
            howDays = (new Date(document.querySelector('.activeYear').textContent,monthActiveFromSmall+1,0)).getDate();
            howDaysPrevMonth = new Date(document.querySelector('.activeYear').textContent,monthActiveFromSmall,0).getDate();
            indexlFirstDayNowMonth = new Date(document.querySelector('.activeYear').textContent,monthActiveFromSmall,1).getDay();
            indexLastDayNowMonth = new Date(document.querySelector('.activeYear').textContent,monthActiveFromSmall,howDays).getDay();

            document.querySelector('.activeMonthBig').textContent=document.querySelector('.activeMonth').textContent+' ';
            document.querySelector('.activeYearBig').textContent=document.querySelector('.activeYear').textContent;

            document.querySelector('.right-block-main-calendar').innerHTML='';
            document.querySelectorAll('.calendar-left-checkbox').forEach(element=>{
                element.checked=true;
            });
            const nowFullYear = document.querySelector('.activeYearBig').textContent;
            const nowMonth = monthActiveFromSmall;
            initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
        });
    });
    
}
function DrawDatesBigCalendar (indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth) {
    let normalizeInit = 0
    // Заполняем предыдущие дни
    for (let j=0;j<indexlFirstDayNowMonth;j++){
        let spanCreator = document.createElement('span');
        document.querySelector('.right-block-main-calendar').append(spanCreator);
        let spanArray = document.querySelector('.right-block-main-calendar');
        spanArray.lastElementChild.classList.add(`Date-big-calendar-prev`);
        spanArray.lastElementChild.classList.add(`Dates-big-calendar`);
        spanArray.lastElementChild.textContent=howDaysPrevMonth-indexlFirstDayNowMonth+1+j; 
        normalizeInit+=1
    }
    // Заполняем текущие дни
    for (let j=0;j<howDays;j++){
        let spanCreator = document.createElement('span');
        document.querySelector('.right-block-main-calendar').append(spanCreator);
        let spanArray = document.querySelector('.right-block-main-calendar');
        spanArray.lastElementChild.classList.add(`Date-big-calendar-now`);
        spanArray.lastElementChild.classList.add(`Dates-big-calendar`);
        spanArray.lastElementChild.innerHTML=`<span>${j+1}</span>`; 
        normalizeInit+=1
    }
    // Заполняем следующие дни
    let HelpDay=0
    if (normalizeInit<=35){
        for (let j=13;j>indexLastDayNowMonth;j--){
            let spanCreator = document.createElement('span');
            document.querySelector('.right-block-main-calendar').append(spanCreator);
            let spanArray = document.querySelector('.right-block-main-calendar');
            spanArray.lastElementChild.classList.add(`Date-big-calendar-next`);
            spanArray.lastElementChild.classList.add(`Dates-big-calendar`);
            HelpDay+=1
            spanArray.lastElementChild.textContent=HelpDay; 
        }
    } else {
        for (let j=6;j>indexLastDayNowMonth;j--){
            let spanCreator = document.createElement('span');
            document.querySelector('.right-block-main-calendar').append(spanCreator);
            let spanArray = document.querySelector('.right-block-main-calendar');;
            spanArray.lastElementChild.classList.add(`Date-big-calendar-next`);
            spanArray.lastElementChild.classList.add(`Dates-big-calendar`);
            HelpDay+=1
            spanArray.lastElementChild.textContent=HelpDay; 
        }
    }
}
// ==============================================================================
// функция стрелочки вперед
function DrawNextMonth(nowMonth ,nowFullYear){
    document.querySelector('.calendar-mini-body').innerHTML=``;
    DrawDaysSmallCalendar();
    if (nowMonth!=11){
        nowMonth+=1
        nowMonthDOM.textContent=monthNames[nowMonth];
        nowFullYearDOM.textContent=nowFullYear; 
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    } else {
        nowFullYear=Number(nowFullYear)+1;
        nowMonth=0;
        nowMonthDOM.textContent=monthNames[nowMonth];
        nowFullYearDOM.textContent=nowFullYear; 
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    } 
    DrawDatesSmallCalendar(indexlFirstDayNowMonth, howDaysPrevMonth, howDays,indexLastDayNowMonth);
}
// функция стрелочки назад
function DrawPrevMonth(nowMonth ,nowFullYear){
    document.querySelector('.calendar-mini-body').innerHTML=``;
    DrawDaysSmallCalendar();
    if (nowMonth!=0){
        nowMonth-=1
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
        nowMonthDOM.textContent=monthNames[nowMonth];
        nowFullYearDOM.textContent=nowFullYear; 
    } else {
        nowFullYear-=1
        nowMonth=11;
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
        nowMonthDOM.textContent=monthNames[nowMonth];
        nowFullYearDOM.textContent=nowFullYear; 
    }
    DrawDatesSmallCalendar(indexlFirstDayNowMonth, howDaysPrevMonth, howDays,indexLastDayNowMonth);
}
// функция стрелочки вперед
function DrawNextMonthBig(nowMonth ,nowFullYear){
    document.querySelector('.right-block-main-calendar').innerHTML=``;
    DrawDaysBigCalendar();
    if (nowMonth!=11){
        nowMonth+=1
        nowMonthDOMbig.textContent=monthNames[nowMonth]+' ';
        nowFullYearDOMbig.textContent=nowFullYear; 
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    } else {
        nowFullYear+=1
        nowMonth=0;
        nowMonthDOMbig.textContent=monthNames[nowMonth]+' ';
        nowFullYearDOMbig.textContent=nowFullYear; 
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    } 
    DrawDatesBigCalendar(indexlFirstDayNowMonth, howDaysPrevMonth, howDays,indexLastDayNowMonth);
    initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
}
// функция стрелочки назад
function DrawPrevMonthBig(nowMonth ,nowFullYear){
    document.querySelector('.right-block-main-calendar').innerHTML=``;
    DrawDaysBigCalendar();
    if (nowMonth!=0){
        nowMonth-=1
        nowMonthDOMbig.textContent=monthNames[nowMonth]+' ';
        nowFullYearDOMbig.textContent=nowFullYear;
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    } else {
        nowFullYear-=1
        nowMonth=11;
        nowMonthDOMbig.textContent=monthNames[nowMonth]+' ';
        nowFullYearDOMbig.textContent=nowFullYear; 
        indexlFirstDayNowMonth = new Date(nowFullYear,nowMonth,1).getDay();
        howDaysPrevMonth = new Date(nowFullYear,nowMonth,0).getDate();
        howDays = (new Date(nowFullYear,nowMonth+1,0)).getDate();
        indexLastDayNowMonth = new Date(nowFullYear,nowMonth,howDays).getDay();
    }
    DrawDatesBigCalendar(indexlFirstDayNowMonth, howDaysPrevMonth, howDays,indexLastDayNowMonth);
    initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
}
// ===============================================================================

function initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth){
    document.querySelector('.right-block-main-calendar').innerHTML=``;
    DrawHeaderBigCalendar(nowMonth,nowFullYear);
    DrawDaysBigCalendar();
    DrawDatesBigCalendar (indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
    let EventsArray = JSON.parse(localStorage.getItem(DemoEvents));
    for (let elem of EventsArray){
        let year = (elem.StartDate.substring(0,4));
        let month = (elem.StartDate.substring(5,7));
        let date = (elem.StartDate.substring(8,10));
        let dateEnd =(elem.EndDate.substring(8,10));
        let monthEnd = (elem.EndDate.substring(5,7));
        let yearEnd = (elem.EndDate.substring(0,4));

        date[0]=="0"?date=date[1]:date;
        dateEnd[0]=="0"?dateEnd=dateEnd[1]:date;

        // console.log(year+'-'+month+'-'+date+'===='+yearEnd+'-'+monthEnd+'-'+dateEnd);
        console.log(monthEnd-month);

// !!!
        if (month==monthEnd && year==yearEnd){
            if(year == nowFullYearDOMbig.textContent && month=='0'+ Number(monthNames.indexOf(nowMonthDOMbig.textContent.substring(0, nowMonthDOMbig.textContent.length - 1))+1)){
                for (let u=0;u<document.querySelectorAll('.Date-big-calendar-now').length;u++){
                    let help = document.querySelectorAll('.Date-big-calendar-now')[u].textContent.substring(0,2);
                    if(help.trim()==date){                  
                        for(let j=0;j<dateEnd-date+1;j++){
                            document.querySelectorAll('.Date-big-calendar-now ')[u+j].classList.add(`label`);    
                            document.querySelectorAll('.Date-big-calendar-now ')[u+j].innerHTML+=`<span class="label label-${elem.label}">${elem.title}</span>`;  
                        }
                    } 
                }
            }
        } else {

        }
    }
}






// ивенты кликов
document.querySelector('.nextMonth').addEventListener('click',()=>{
    nowFullYear= Number(nowFullYearDOM.textContent);
    nowMonth = monthNames.indexOf(nowMonthDOM.textContent);
    DrawNextMonth(nowMonth ,nowFullYear);
});
document.querySelector('.prevMonth').addEventListener('click',()=>{
    nowFullYear= Number(nowFullYearDOM.textContent);
    nowMonth = monthNames.indexOf(nowMonthDOM.textContent);
    DrawPrevMonth(nowMonth ,nowFullYear);
});
document.querySelector('.nextMonth-big').addEventListener('click', ()=>{
    nowFullYear= Number(nowFullYearDOMbig.textContent);
    nowMonth = nowMonthDOMbig.textContent;
    nowMonth = nowMonth.substring(0, nowMonth.length - 1);
    nowMonth = monthNames.indexOf(nowMonth);
    DrawNextMonthBig(nowMonth ,nowFullYear)
});
document.querySelector('.prevMonth-big').addEventListener('click', ()=>{
    nowFullYear= nowFullYearDOMbig.textContent;
    nowMonth = nowMonthDOMbig.textContent;
    nowMonth = nowMonth.substring(0, nowMonth.length - 1);;
    nowMonth = monthNames.indexOf(nowMonth);
    DrawPrevMonthBig(nowMonth ,nowFullYear);
});





document.querySelectorAll('.calendar-left-checkbox').forEach(elem=>{
    elem.addEventListener('click',()=>{
        const filt = elem.getAttribute('filter');
        if (filt=="ViewAll"){
            if(true==document.querySelector(`.calendar-left-checkbox-${filt}`).checked){
                document.querySelectorAll('.calendar-left-checkbox').forEach(element=>{
                    element.checked=true;
                    for (let j=0; j<filter.length;j++){
                        document.querySelectorAll(`.label-${filter[j]}`).forEach(el=>{
                            el.style.display='block';
                        }); 
                    }
                });
            } else {
                document.querySelectorAll('.calendar-left-checkbox').forEach(element=>{
                    element.checked=false;
                    for (let j=0; j<filter.length;j++){
                        document.querySelectorAll(`.label-${filter[j]}`).forEach(el=>{
                            el.style.display='none';
                        }); 
                    }
                });
            }
        }
        if(true===document.querySelector(`.calendar-left-checkbox-${filt}`).checked){
            document.querySelectorAll(`.label-${filt}`).forEach(el=>{
                el.style.display='block';
                all+=1;
                if(all==0){
                    document.querySelector('.calendar-left-checkbox-ViewAll').checked=true;
                }
            });   
        } else {
            document.querySelectorAll(`.label-${filt}`).forEach(el=>{
                el.style.display='none';
                all-=1;
                document.querySelector('.calendar-left-checkbox-ViewAll').checked=false;
            });
        }
       
    });
});


// ======================================================================
// функция добавления в локал стораге нового ивента
function addNewEvent(){
    let titleAddNew = document.querySelector('.addEventMenu__body-title').value;
    let labeleAddNew = document.querySelector('.addEventMenu__body-label').value;
    let StartDateAddNew = document.querySelector('.addEventMenu__body-StartDate').value;
    let EndDateAddNew = document.querySelector('.addEventMenu__body-EndDate').value;
    let EventUrlAddNew = document.querySelector('.addEventMenu__body-EventURL').value;
    let LocationAddNew = document.querySelector('.addEventMenu__body-Location').value;
    let DescAddNew = document.querySelector('.addEventMenu__body-desc').value;
    let OldData = localStorage.getItem(DemoEvents);
    OldData=JSON.parse(OldData);
    OldData.push(
        {
            "title": titleAddNew,
            "label": labeleAddNew,
            "StartDate": StartDateAddNew,
            "EndDate": EndDateAddNew,
            "EventURL": EventUrlAddNew,
            "Location": LocationAddNew,
            "Description": DescAddNew
        }
    );
    localStorage.setItem(DemoEvents,JSON.stringify(OldData));
    initData(nowMonth,nowFullYear,indexlFirstDayNowMonth, howDaysPrevMonth, howDays, indexLastDayNowMonth);
    document.querySelector('.addEventMenu__body-title').value='';
    document.querySelector('.addEventMenu__body-label').value='';
    document.querySelector('.addEventMenu__body-StartDate').value='';
    document.querySelector('.addEventMenu__body-EndDate').value='';
    document.querySelector('.addEventMenu__body-EventURL').value='';
    document.querySelector('.addEventMenu__body-Location').value='';
    document.querySelector('.addEventMenu__body-desc').value='';
}
// ивент нажатия на кноки Send
document.querySelector('.addEventMenu__body-send').addEventListener('click', ()=>{
    addNewEvent();
});

// ==========================================================================================

// функция стартовой загрузки
function basicLoad(){
    if (localStorage.getItem(DemoEvents)===null){
        localStorage.setItem(DemoEvents, JSON.stringify(datass));
    }
}

// ==========================================================================================

// ивент отъежания лейбла инпута
document.querySelectorAll(".InputForLabel").forEach(el=>{
    el.addEventListener("input", function() {
        if( el.value=='') {
          el.classList.remove('labelAndPlaceholder-active');
        } else {
          el.classList.add('labelAndPlaceholder-active');
        }
      });
})
// функиця заполнения селекта
function completionSelect(){
    for (let j=0; j<filter.length;j++){
        const optionCreator = document.createElement('option');
        document.querySelector('.addEventMenu__body-label').append(optionCreator);
        document.querySelectorAll('.addEventMenu__body-label>option')[j].value=filter[j];
        document.querySelectorAll('.addEventMenu__body-label>option')[j].textContent=filter[j];
    }
    document.querySelector('.addEventMenu__body-label').innerHTML+=`<option selected disabled hidden> </option>`;
}

// ==========================================================================================

// Функция открытия окна добавления
document.querySelector('.addNewEvent-btn').addEventListener('click',()=>{
    document.querySelector('.addEventMenu').classList.toggle('addEventMenu-active');
    setTimeout(() => document.querySelector('.stillOpacity').style.display="block", 300);
})

// ==========================================================================================

// Функция закрытия окна добавления
function CloseAddMneu(){
    document.querySelector('.stillOpacity').style.display="none";
    document.querySelector('.addEventMenu').classList.toggle('addEventMenu-active');
}
// Все возможные ивенты закрытия окна добавления
document.querySelector('.addEventMenu__body-close').addEventListener('click',()=>{
    CloseAddMneu();
});
document.querySelector('.stillOpacity').addEventListener('click', ()=>{
    CloseAddMneu();
});
document.querySelector('.closeBtn').addEventListener('click',()=>{
    CloseAddMneu();
});

// ==========================================================================================
// функция для клика в маленьком календарике по серой дате вперед
function NextMonthSmall(){
    document.querySelectorAll('.Date-mini-calendar-next').forEach(elik=>{
        elik.addEventListener('click',()=>{
            nowMonth=monthNames.indexOf(document.querySelector('.activeMonth').textContent);
            nowFullYear=document.querySelector('.activeYear').textContent;
            DrawNextMonth(nowMonth ,nowFullYear);
        });
    })
}
// функция для клика в маленьком календарике по серой дате назад
function PrevMonthSmall(){
    document.querySelectorAll('.Date-mini-calendar-prev').forEach(elik=>{
        elik.addEventListener('click',()=>{
            nowMonth=monthNames.indexOf(document.querySelector('.activeMonth').textContent);
            nowFullYear=document.querySelector('.activeYear').textContent;
            DrawPrevMonth(nowMonth ,nowFullYear);
        });
    })
}