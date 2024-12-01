document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todo-list');
  const addTaskBtn = document.getElementById('add-task-btn');
  const datePicker = document.getElementById('date-picker');

  const todoData = {}; // 날짜별 할 일 데이터 저장

  // 새 To-Do 항목 생성
  const createTodoItem = (text = '', completed = false) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = completed;

    const textSpan = document.createElement('span');
    textSpan.className = 'todo-text';
    textSpan.contentEditable = 'true';
    textSpan.setAttribute('data-placeholder', 'Write your task here...');
    textSpan.textContent = text;

    // 삭제 버튼 (쓰레기통)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑️'; // 쓰레기통 이모지 사용
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTodoData(); // 삭제 후 데이터 저장
    });

    // 체크박스 클릭 시 빗금 효과 추가
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        textSpan.classList.add('completed');
      } else {
        textSpan.classList.remove('completed');
      }
      saveTodoData();
    });

    if (completed) {
      textSpan.classList.add('completed');
    }

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    return li;
  };

  // Add Task 버튼 클릭 시 새 항목 추가
  addTaskBtn.addEventListener('click', () => {
    const newTask = createTodoItem(); // 새 할 일 생성
    todoList.appendChild(newTask); // 할 일 목록에 추가
    saveTodoData(); // 데이터 저장
  });

  // 날짜 선택 시 할 일 불러오기
  datePicker.addEventListener('change', () => {
    loadTodoData();
  });

  // 데이터 저장 함수
  const saveTodoData = () => {
    const selectedDate = datePicker.value;
    if (!selectedDate) return;

    const todos = Array.from(todoList.children).map((item) => ({
      text: item.querySelector('.todo-text').textContent,
      completed: item.querySelector('.todo-checkbox').checked,
    }));

    todoData[selectedDate] = todos;
  };

  // 데이터 불러오기 함수
  const loadTodoData = () => {
    const selectedDate = datePicker.value;
    if (!selectedDate) return;

    todoList.innerHTML = ''; // 기존 목록 초기화

    const todos = todoData[selectedDate] || [];
    todos.forEach((todo) => {
      const task = createTodoItem(todo.text, todo.completed);
      todoList.appendChild(task);
    });
  };

  // 페이지 로드 시 초기 설정
  datePicker.value = new Date().toISOString().split('T')[0];
  loadTodoData();
});
