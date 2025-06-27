console.log();
class LogicUI {
  constructor() {
    this.data = thread.renderTable() || [];
    this.init();
  }
  init() {
    this.renderPaginationBTN();
    this.renderHtml(0);
    this.searchData();

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
            <td><button class="EditBtn">Edit</button></td>
            <td><button class="DeleteBtn">Delete</button></td>    
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



}
const ui = new LogicUI();
function resetaddForm(){

}
function    addData(){
    const toAddForm = document.getElementById("toAddForm");
    toAddForm.addEventListener("click",(e)=>{
       const addPostForm = document.getElementById("addForm");
       addPostForm.style.display="block"

         submitData();
    })
  }
  function submitData(){
    const addForm = document.getElementById("addForm");
    addForm.addEventListener("submit",(e)=>{
        e.preventDefault()
           const title = document.getElementById("title");
    const tags = document.getElementById("tags");
    const views = document.getElementById("views");
    const newObject = new PostsObject(0,title.value,"",tags.value,"",views.value);
        confirm(`You have added this ${newObject.title} successfully `)
        ui.data=thread.createData(newObject);
        ui.data
       console.log(ui.data)
        const addPostForm = document.getElementById("addForm");
        addPostForm.style.display="none"
    })
  }
addData()
// document.querySelector("EditBtn").addEventListener("click",(e)=>this.editFunction());
// document.querySelector("DeleteBtn").addEventListener("click",(e)=>this.deleteFunction());
