function addTodo() {
    const input = document.getElementById("input");
    const value = input.value.trim();
    if (value === "") {
        alert("Vui lòng nhập todo!");
        return;
    }
    const newTodo = createTodoItem(value);
    document.getElementById("main__footer").prepend(newTodo);
    var count = document.getElementsByClassName('main__footer--list').length;
    var text = "You have "+count+" pending tasks"
    document.getElementById("text").textContent = text;
    input.value = "";
}

function createTodoItem(text) {
    const listDiv = document.createElement("div");
    listDiv.classList.add("main__footer--list", "fade-in");  // thêm fade-in
    listDiv.style.display = "flex";
    listDiv.style.flexDirection = "row";
    listDiv.style.justifyContent = "space-between";
    listDiv.style.alignItems = "center";
    listDiv.style.margin = "10px 0";
    listDiv.style.backgroundColor = "aqua";
    listDiv.style.padding = "10px 0";
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("main__footer--item");
    itemDiv.style.width = "540px";
    itemDiv.style.maxWidth = "90%";
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
