/**
 * @param {array} pages - ThreadChanel.returnListData()  tra ra array cac pages,
 */
class UI{
  constructor(pages){
    this.pages= pages;
    this.init();
  }
  init(){
   this.renderTable(0);
   this.renderPaginateBtn();
   this.event()


  }
  event(){
     this.searchBTN.addEventListener("click", (e) => this.searchFunction(e));

  }
  catchDOM(){
    this.addBtn= document.getElementById("addbtn");
    this.deletebtn= document.getElementById("deletebtn");
    this.searchInput= document.getElementById("searchInput");
    this.searchBTN= document.getElementById("searchBTN");

    this.tagFilter= document.getElementById("tagFilter");

    this.sortBy= document.getElementById("sortBy");
    // Filters
    this.searchInput= document.getElementById("searchInput");
    // Results Info 
    this.resultsCount= document.getElementById("resultsCount");
    // Posts Grid **
    this.table= document.getElementById("table");
    this.tbody= document.getElementById("tbody");
    this.paginate= document.getElementById("paginate");
    // <!-- No Results -->
    this.noResults= document.getElementById("noResults");
  }
  renderTbody(record){
    this.catchDOM();
    const tr= document.createElement("tr");

    tr.innerHTML=`

      <td>${record.title}</td>
      <td>${record.body }</td>
      <td>${record.tags}</td>

      <th><button onclick="">Edit </button></th>
      <th><button class="deleteBtn">Delete </button></th>
    `;
    tr.dataset.value=record.id;
    this.tbody.appendChild(tr);    
    const deleteBtn = tr.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", (e) => {
      const targetBtn= e.target.innerHTML.trim()
      if(targetBtn==="Delete"){
        const targetRow= e.target.closest("tr").dataset
        this.deleteRecord(targetRow)

      }
      else{return}});
  }
  renderPaginateBtn(){
    this.catchDOM();
    this.paginate.innerHTML="";
    const pageNumber=Array.isArray(this.pages)?this.pages.length:0;
    for(let i=0;i<pageNumber;i++){
      const btn= document.createElement("button");
      btn.innerHTML=i+1;
      btn.addEventListener("click",()=> this.renderDataTable(i));
      this.paginate.appendChild(btn);
    }
  }
  renderTable(pagesindex){
    this.catchDOM();
    this.tbody.innerHTML="";
    const data= this.pages;
    const currentpage= data[pagesindex]||[];
    if(currentpage.length===0 || !Array.isArray(currentpage)){
      this.noResults.style.display="block";
      this.table.style.display="none";
      return
    }
    if(currentpage.length!==0){
      this.noResults.style.display="none";
      this.table.style.display="table";
         currentpage.map(record=>{
        this.renderTbody(record);
      })
  }
  }
  searchFunction(e){
    e.preventDefault();
    this.catchDOM();
    const value = this.searchInput.value||"";
    const searchValue= thread.searchData(value) ;

    this.pages=searchValue;
    this.renderTable(0);
    this.paginate.innerHTML = "";
    this.renderPaginateBtn();

  }
  deleteRecord(objectID){
  // Xóa bản ghi và lấy danh sách mới sau khi xóa
  const updatedData = thread.deleteData(objectID);

  // Xóa tbody cũ
  this.tbody.innerHTML = "";

  // Hiển thị lại bảng với dữ liệu mới
  updatedData.forEach(record => {
    this.renderTbody(record);
  });

  // Cập nhật phân trang nếu cần
  this.renderPaginateBtn();

  }

}
    const pages= thread.getDataLocal()























