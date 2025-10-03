function addTodo() {
    const input = document.getElementById("input");
    const value = input.value.trim();
    if (value === "") {
        alert("Vui lòng nhập todo!");
        return;
    }
    let texts = getAllTodosText();
    console.log(texts);
     // Kiểm tra trùng
    if (texts.some(t => t.toLowerCase() === value.toLowerCase())) {
        alert("Không được phép trùng!");
        return;
    }
    const newTodo = createTodoItem(value);
    document.getElementById("main__footer").prepend(newTodo);
    var count = document.getElementsByClassName('main__footer--list').length;
    var text = "You have "+count+" pending tasks"
    document.getElementById("text").textContent = text;
    input.value = "";
}

function getAllTodosText() {
    const todoItems = document.querySelectorAll(".main__footer--list p");
    const texts = Array.from(todoItems).map(item => item.textContent);
    return texts;
}

function createTodoItem(text) {
    const listDiv = document.createElement("div");
    listDiv.classList.add("main__footer--list", "fade-in");  // thêm fade-in
    listDiv.setAttribute("draggable", "true"); // cho phép kéo
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("main__footer--item");
    const p = document.createElement("p");
    p.textContent = text;
    p.style.padding = "0 0 0 10px";
    itemDiv.appendChild(p);
    const removeDiv = document.createElement("div");
    removeDiv.classList.add("delete");
    removeDiv.style.margin = "0 10px 0 0";
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // icon thùng rác
    //removeBtn.style.margin = "0 10px 0 0";
    removeDiv.addEventListener("click", function () {
        listDiv.classList.remove("fade-in");
        listDiv.classList.add("fade-out"); // chạy animation

        listDiv.addEventListener("animationend", function () {
            listDiv.remove(); // xóa sau khi animation kết thúc
            var count = document.getElementsByClassName('main__footer--list').length;
            var text = "You have " + count + " pending tasks";
            document.getElementById("text").textContent = text;
        });
        // listDiv.remove();
        var count = document.getElementsByClassName('main__footer--list').length;
        var text = "You have "+count+" pending tasks"
        document.getElementById("text").textContent = text;
        if(count==0) {
            var note = document.getElementById("main__footer--note");
            note.style.display = "block";
        }
    });
    removeDiv.appendChild(removeBtn);
    listDiv.appendChild(itemDiv);
    listDiv.appendChild(removeDiv);
    return listDiv;
}

// Thêm sự kiện
document.getElementById("plus").addEventListener("click", function() {
    addTodo();
    // Ẩn dòng thông báo "Không có bản ghi chú nào!"
    var note = document.getElementById("main__footer--note");
    note.style.display = "none";
});

document.getElementById("clearAll").addEventListener("click", function () {
    const footer = document.getElementById("main__footer");
    const items = footer.querySelectorAll(".main__footer--list"); 
    items.forEach(function(item) {
        item.classList.remove("fade-in");
        item.classList.add("fade-out"); // chạy animation

        item.addEventListener("animationend", function () {
            item.remove(); // xóa sau khi animation kết thúc
        });
    });// xóa từng cái
    var text = "You have 0 pending tasks"
    document.getElementById("text").textContent = text;
    // Ẩn dòng thông báo "Không có bản ghi chú nào!"
    var note = document.getElementById("main__footer--note");
    note.style.display = "block";
});

// Hàm tìm kiếm
function searchTodos() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
    const todoItems = document.querySelectorAll(".main__footer--list");
    let visibleCount = 0; // đếm số todo hiển thị
    todoItems.forEach(item => {
        const text = item.querySelector("p").textContent.toLowerCase();
        // Nếu keyword rỗng hoặc chứa text thì hiển thị
        if (keyword === "" || text.startsWith(keyword)) {
            item.style.display = "flex";
            visibleCount++;
        } else {
            item.style.display = "none";
        }
    });
     // Hiển thị thông báo "Không có bản ghi nào" nếu visibleCount = 0
    const note = document.getElementById("main__footer--note");
    if (visibleCount === 0) {
        note.style.display = "block";
    } else {
        note.style.display = "none";
    }
}

let draggedItem = null;

// Khi bắt đầu kéo
document.addEventListener("dragstart", function(e) {
    if (e.target.classList.contains("main__footer--list")) {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = "move";
        e.target.classList.add("dragging"); // hiệu ứng
    }
});

// Khi kết thúc kéo
document.addEventListener("dragend", function(e) {
    if (e.target.classList.contains("main__footer--list")) {
        e.target.classList.remove("dragging");
        draggedItem = null;
    }
});

// Cho phép thả lên item khác
document.addEventListener("dragover", function(e) {
    e.preventDefault(); // bắt buộc để drop hoạt động
    const target = e.target.closest(".main__footer--list");
    if (!target || target === draggedItem) return;

    const container = target.parentNode;
    const rect = target.getBoundingClientRect();
    const next = (e.clientY - rect.top) / rect.height > 0.5;
    container.insertBefore(draggedItem, next ? target.nextSibling : target);
});


// Bắt sự kiện input
document.getElementById("searchInput").addEventListener("input", searchTodos);

// Bắt sự kiện click nút search
document.getElementById("searchBtn").addEventListener("click", searchTodos);
