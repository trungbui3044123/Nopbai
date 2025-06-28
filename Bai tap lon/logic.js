console.log();
class LogicUI {
  constructor() {
    this.data = thread.renderTable() || [];
    this.init();
  }
  async init() {
    this.renderPaginationBTN();
    this.renderHtml(0);
    this.searchData();
    this.addForm();

  }
  renderTbody(record) {
    this.Tbody = document.getElementById("tbody");
    const tr = document.createElement("tr");
    tr.dataset.value = record.id;
    let tagCells = "";
    for (let i in record.tags) {
      tagCells += record.tags[i] + ", ";
    }
    tr.innerHTML = `
            <td>${record.title}</td>
            <td>${tagCells}</td>
            <td>${record.views}</td>
            <td><button class="EditBtn" onclick="ui.test()">Edit</button></td>
            <td><button class="DeleteBtn" onclick="ui.deleteData('event')">Delete</button></td>    
        `;
    this.Tbody.appendChild(tr);
  }
  ///
  renderHtml(index) {
    const currentpage = this.data[index] || [];
    const table = document.getElementById("table");
    document.getElementById("tbody").innerHTML = "";
    const noResults = document.getElementById("noResults");
    try {
      if (!currentpage.length || !Array.isArray(currentpage)) {
        noResults.style.display = "block";
        table.style.display = "none";
      }
      if (currentpage.length) {
        noResults.style.display = "none";
        table.style.display = "table";

        currentpage.map((record) => {
          this.renderTbody(record);
          document.getElementById(
            "resultsCount"
          ).innerHTML = `Showing ${currentpage.length} of ${this.data.length} posts`;
        });
      }
    } catch (e) {
      console.log(`You are in renderHtml trouble: ${e.message}`);
    }
  }
  ///
  renderPaginationBTN() {
    const paginate = document.getElementById("paginate");
    paginate.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      const btn = document.createElement("button");
      btn.innerHTML = i + 1;
      btn.addEventListener("click", () => this.renderHtml(i));
      paginate.appendChild(btn);
    }
  }
  searchData() {
    const searchDOM = document.getElementById("searchKey");
    searchDOM.addEventListener("input", (e) => {
      const searchkey = e.target.value || "";

      this.data = thread.searchData(searchkey);
      this.renderPaginationBTN();
      this.renderHtml(0);
    });
  }

  addForm() {
    const toAddForm = document.getElementById("toAddForm");
    toAddForm.addEventListener("click", (e) => {
      const addPostForm = document.getElementById("addForm");
      addPostForm.style.display = "block";

     return this.submitData();
    });
  }

   submitData() {
  const addForm = document.getElementById("addForm");
  addForm.addEventListener("submit",async (e) => {
     
    const title =await document.getElementById("title");
    const tags =await document.getElementById("tags");
    const views =await document.getElementById("views");
    const newObject = new PostsObject(
      0,
      title.value,
      "",
      tags.value,
      "",
      views.value
    );
    // confirm(`You have added this ${newObject.title} successfully `);
    this.data = thread.createData(newObject);
    const addPostForm = document.getElementById("addForm");
    addPostForm.style.display = "none";
  });
}
//
 deleteData(e){
    const targetDOM = e.target;
    if(targetDOM.textContent!=="Delete"){return}
    const deleteID= targetDOM.closest("tr").dataset
    const targetRow = targetDOM.closest("tr")
    targetRow.remove()
      this.data = thread.deleteData(deleteID);
    this.renderHtml(0);
    console.log(targetRow)
 }

}

const ui = new LogicUI();

// với btn động thì add luôn cái instance. function() vào btn đó khi sinh ra. Như vậy thì ko bị bắt bất dộng bộ
//  Với 2 function trong cùng 1 class mà cái chạy trước, trả ra kết quả của cái chạy sau
// tại function chạy sau áp dụng synce và await ở đúng value cần đợi
// tại function chạy trước, thì phải return cái function chạy sau khi gọi ở đó.

// document.querySelector("EditBtn").addEventListener("click",(e)=>this.editFunction());
//
