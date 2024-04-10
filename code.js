// const { json } = require("express");

(function() {
  let arr =[];

  function clearInputValue() {
    let container1 = document.getElementById('input1');
    let container2 = document.getElementById('input2');
    let container3 = document.getElementById('input3');
    let container4 = document.getElementById('input4');
    let container5 = document.getElementById('input5');
    let container6 = document.getElementById('input6');

    container1.value = '';
    container2.value = '';
    container3.value = '';
    container4.value = '';
    container5.value = '';
    container6.value = '';
  }

  function getInputsValue() {
    let obj ={
      name: null,
      surname: null,
      lastName: null,
      birth: null,
      sufferingStart: null,
      facultet: null,
    };

    let container1 = document.getElementById('input1');
    let container2 = document.getElementById('input2');
    let container3 = document.getElementById('input3');
    let container4 = document.getElementById('input4');
    let container5 = document.getElementById('input5');
    let container6 = document.getElementById('input6');

    obj.name = container1.value;
    obj.surname = container2.value;
    obj.lastName = container3.value;
    obj.birth = container4.value;
    obj.sufferingStart = container5.value;
    obj.facultet = container6.value;

    return obj;
  }

  function getFilterValue() {
    let obj ={
      name: '1',
      sufferingStart: 0,
      sufferingEnd: 0,
      facultet: 0,
    };

    let container1 = document.getElementById('filter-input1');
    let container2 = document.getElementById('filter-input2');
    let container3 = document.getElementById('filter-input3');
    let container4 = document.getElementById('filter-input4');

    obj.name = container1.value;
    obj.sufferingStart = container2.value;
    obj.sufferingEnd = container3.value;
    obj.facultet = container4.value;

    return obj;
  }

  function filter(obj) {
    obj = getFilterValue();
    curarr = []; //Array of Objects from LocalStorage
    result = [];

    //Оставляем только уникальные значения в массиве(result)
    const getUnique = (arr) => {
      return arr.filter((el, ind) => ind === arr.indexOf(el));
    };

    //Парсим из Локал Сторэдж в curarr
    if (localStorage.getItem("student")) {
      curarr = JSON.parse(localStorage.getItem("student"));
    } else {
      curarr = [];
      localStorage.setItem(JSON.stringify(curarr));
    }

    if (Object.keys(obj).length > 0) {
      curarr.forEach(el => {
         if (((`${el.name} ${el.surname} ${el.lastName}`.includes(obj.name)) || obj.name == "") && ((el.sufferingStart).includes((obj.sufferingStart)) || obj.sufferingStart == "") && (((Number(el.sufferingStart)+4).toString()).includes(obj.sufferingEnd) || obj.sufferingEnd == "") && ((el.facultet).includes(obj.facultet) || obj.facultet == "")) {
          result.push(el)
        }
      })
    }
    
    //Далее Добавляем элементы в DOM
    let container = document.getElementById('content');
    let studentsList = document.getElementById("main-list");

    studentsList.innerHTML = '';

    for(let item of getUnique(result)) {
      let studentsItem = createStudentsItem(item);
      studentsList.append(studentsItem);
    }

    container.append(studentsList);
  }

  function sortStudents(prop, dir = false) {
    let sortArr = []; //Array of Objects from LocalStorage
    let copyArr = []; //Objects from LocalStorage (copy)

    if (localStorage.getItem("student")) {
      sortArr = JSON.parse(localStorage.getItem("student"));
    } else {
      sortArr = [];
      localStorage.setItem(JSON.stringify(sortArr));
    }

    copyArr = JSON.parse(JSON.stringify( sortArr )); // первая копия на sortArr

    let copySortArr = JSON.parse(JSON.stringify( sortArr ));// вторая копия на sortArr

    if (prop === "name") {
      for (let item of copyArr) {
        item.name = `${item.name} ${item.surname} ${item.lastName} `;
        // console.log(item.name)
      }
      let resultName = copyArr.sort(function(a,b){
        if (a['name'] < b['name']) return -1;
      })

      let copyResultName = JSON.parse(JSON.stringify( resultName ));

      for (let i=0; i < copyResultName.length; i++) {
        for (let j=0; j < copyResultName.length; j++) {
          if(copyResultName[i].surname === copySortArr[j].surname && copyResultName[i].birth === copySortArr[j].birth) {
            copyResultName[i].name = copySortArr[j].name;
          }
        }
      }
      console.log(copyResultName)//!!!!!!!!!!!-работает
      return copyResultName;
    } else {
      let result = sortArr.sort(function(a,b){
      let dirCondition = a[prop] < b[prop];

      if (dir == true) dirCondition = a[prop] > b[prop];
      if (dirCondition == true) return -1;
      })
      return result;
    }
  }

  function titleListClickSort(prop) {
    clickArr = [];
    let container = document.getElementById('content');
    let studentsList = document.getElementById("main-list");

    studentsList.innerHTML = '';
    clickArr = sortStudents(prop);//!!!!!
    localStorage.clear();

    for (item of clickArr) {
      let studentItem = createStudentsItem(item);
      studentsList.append(studentItem);
    }
    saveList(clickArr, 'student');
    container.append(studentsList);
  }

  function createTitleList() {
    let title = document.createElement('div');
    title.classList.add('main__title');

    let titleItem1 = document.createElement('div');
    let titleItem2 = document.createElement('div');
    let titleItem3 = document.createElement('div');
    let titleItem4 = document.createElement('div');
    let titleItem5 = document.createElement('div');
    let titleItem6 = document.createElement('div');

    titleItem1.classList.add('main__titleItem');
    titleItem2.classList.add('main__titleItem');
    titleItem3.classList.add('main__titleItem');
    titleItem4.classList.add('main__titleItem');
    titleItem5.classList.add('main__titleItem');
    titleItem6.classList.add('main__titleItem');

    titleItem1.textContent = 'Имя';
    titleItem2.textContent = 'Фамилия';
    titleItem3.textContent = 'Отчество';
    titleItem4.textContent = 'Дата Рождения';
    titleItem5.textContent = 'Год начала учёбы';
    titleItem6.textContent = 'Факультет';

    titleItem1.addEventListener('click', function(){
      titleListClickSort('name');
    });
    titleItem2.addEventListener('click', function() {
      titleListClickSort('name');
    });
    titleItem3.addEventListener('click', function() {
      titleListClickSort('name');
    });
    titleItem4.addEventListener('click', function() {
      titleListClickSort('birth');
    });
    titleItem5.addEventListener('click', function() {
      titleListClickSort('sufferingStart');
    });
    titleItem6.addEventListener('click', function() {
      titleListClickSort('facultet');
    });

    title.append(titleItem1);
    title.append(titleItem2);
    title.append(titleItem3);
    title.append(titleItem4);
    title.append(titleItem5);
    title.append(titleItem6);

    return title;
  }

  function createStudentsList() {
    let studentsList = document.createElement('ul');
    studentsList.classList.add('main__list');
    studentsList.setAttribute('id', 'main-list')
    return studentsList;
  }

  function calculateAge(birth) {
    var birthDate = new Date(birth);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  function createStudentsItem(obj) {
    let studentItems = document.createElement('li');
    studentItems.classList.add('main__items')

    let studentItem1 = document.createElement('div')
    let studentItem2 = document.createElement('div')
    let studentItem3 = document.createElement('div')
    let studentItem4 = document.createElement('div')
    let studentItem5 = document.createElement('div')
    let studentItem6 = document.createElement('div')

    studentItem1.classList.add('main__item');
    studentItem2.classList.add('main__item');
    studentItem3.classList.add('main__item');
    studentItem4.classList.add('main__item');
    studentItem5.classList.add('main__item');
    studentItem6.classList.add('main__item');

    let age =calculateAge(obj.birth);
    let year = parseInt(obj.sufferingStart)+4;

    let course = 2024;
    if (course - obj.sufferingStart > 4) {
      course = 'Закончил';
    } else {
      course = 2024 - obj.sufferingStart;
    }

    studentItem1.textContent = obj.name;
    studentItem2.textContent = obj.surname;
    studentItem3.textContent = obj.lastName;
    studentItem4.textContent = `${obj.birth} (${age} лет)`;
    if (course === 'Закончил') {
      studentItem5.textContent = `${obj.sufferingStart}-${year} Закончил`;
    } else {
      studentItem5.textContent = `${obj.sufferingStart}-${year} (${course} курс)`;
    }

    studentItem6.textContent = obj.facultet;

    studentItems.append(studentItem1);
    studentItems.append(studentItem2);
    studentItems.append(studentItem3);
    studentItems.append(studentItem4);
    studentItems.append(studentItem5);
    studentItems.append(studentItem6);

    return studentItems;
  }

  function feetback(string) {
    let cont = document.createElement('div');
    let textCont = document.createElement('p');
    let textButton = document.createElement('button');

    cont.classList.add('main__warning');
    textButton.classList.add('main__warning-btn')

    textButton.textContent = 'Закрыть окно';
    textCont.textContent= string;

    cont.append(textCont);
    cont.append(textButton);

    textButton.addEventListener('click', function() {
      cont.remove();
    });

    return cont;
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr))
}

  //обработчик кнопки отправки формы
  function createListApp() {
    let container = document.getElementById('content');
    let submitButton = document.getElementById('form-btn');
    let filterButton = document.getElementById('main-btn');
    let filterField = document.getElementById('filter__list');
    let listName = 'student';
    let titleList = createTitleList();
    let studentsList = createStudentsList();
    let localData = localStorage.getItem(listName)

    container.append(titleList);
    container.append(studentsList);

    //Вызываем элементы из Local Storage
    if (localData !== null && localData !== '') arr = JSON.parse(localData);
    for (item of arr) {
      let studentItem = createStudentsItem(item);
      studentsList.append(studentItem);
    }

    //Обработчик на фильтр-кнопку
    // filterButton.addEventListener('click', function() {
    //   filter();
    // })
    //Обработчик на поле ввода
    filterField.addEventListener('keyup', function() {
      filter();
    })

    

    //Обработчик на кнопку отправки
    submitButton.addEventListener('click', function() {
      let inputInformation = getInputsValue();
      //console.log(inputInformation)
      let studentsItem = createStudentsItem(inputInformation);

      //Игнорируем если поле ввода пустое и помогаем дозаполнить
      if (!inputInformation.name || !inputInformation.surname || !inputInformation.lastName || !inputInformation.facultet || !inputInformation.sufferingStart || !inputInformation.birth) {
        container.append(feetback('Здравствуйте! Вам необходимо дозаполнить оставшиеся поля'));
        return;
      }
      if (inputInformation.birth<= '1900-01-01') {
        container.append(feetback('Вы слишком стары)'));
        return;
      }
      if (inputInformation.sufferingStart< 2000) {
        container.append(feetback('Минимальный год начала обучения 2000'));
        return;
      }

      studentsList.append(studentsItem);

      arr.push(inputInformation)
      saveList(arr, listName);

      clearInputValue();
    })
  }

  createListApp();

})();
